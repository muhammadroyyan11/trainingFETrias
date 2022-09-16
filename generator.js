require('dotenv').config()
const path = require('path')
const klaw = require('klaw')
const fs = require('fs');
const mkdirp = require('mkdirp')
const inquirer = require('inquirer');

const project = process.env.PROJECTNAME
const template = process.env.TEMPLATEPATH

const directoryPath = path.join(__dirname);
const assetJsPath = path.join(directoryPath, "asset", "js")

// ! CLI Prompt
// * 1. Type tcode
// * 2. Select Type
// * 3. How many screen number

// ! CLI Pseudocode
// * 1. Hold all user input
// * 2. Find template folder
// * 3. Copying and rename filename
// * 4. Move file to destination
// * 5. Adding new route to route.js

function getFilesTemplate() {
    var jsPath = []
    return new Promise(function (resolve, reject) {
        klaw(path.join(directoryPath, template))
            .on('readable', function () {
                let item
                while ((item = this.read())) {
                    if (item.path.includes(".js")) {
                        jsPath.push(item.path)
                    }
                }
            })
            .on('error', (err, item) => {
                console.log(err.message)
                console.log(item.path) // the file the error occurred on
                reject(err)
            })
            .on('end', () => {
                resolve(jsPath)
            })
    })
}

function getRouteFile() {
    var jsPath = []
    return new Promise(function (resolve, reject) {
        klaw(assetJsPath)
            .on('readable', function () {
                let item
                while ((item = this.read())) {
                    if (item.path.includes("route.js")) {
                        jsPath.push(item.path)
                    }
                }
            })
            .on('error', (err, item) => {
                console.log(err.message)
                console.log(item.path) // the file the error occurred on
                reject(err)
            })
            .on('end', () => {
                resolve(jsPath)
            })
    })
}

function getTypes(){
    var jsPath = []
    return new Promise(function (resolve, reject) {
        klaw(path.join(directoryPath, project),{depthLimit: 0})
            .on('readable', function () {
                let item
                while ((item = this.read())) {
                    // if (item.path.includes(".js")) {
                        var itemPath = item.path
                        var splitPath = itemPath.split(path.sep)
                        var lengthPath = splitPath.length
                        var realType = splitPath[lengthPath-1]

                        if(realType !== project){
                            jsPath.push(realType)
                        }

                    // }
                }
            })
            .on('error', (err, item) => {
                console.log(err.message)
                console.log(item.path) // the file the error occurred on
                reject(err)
            })
            .on('end', () => {
                resolve(jsPath)
            })
    })
}

/**
 * @param  {} files An array of file
 * @param  {} number A Screen number
 * @param  {} type of screen (Transaction, Report etc)
 * @param  {} tcode a screen name
 */
function writeFile(param) {
    const { files, number, type, tcode } = param
    var fileNames = []
    var routes = {}

    for (file of files) {
        var data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })

        var result = data
        var filename = ''
        var dirName = ''
        var numbering = number < 10 ? "0" + number.toString() : number.toString()
        var screenNaming = `${tcode}_${numbering}`
        var naming = `${project}.${type}.${tcode}.${screenNaming}`

        if (file.includes("controller")) {
            // * 1. Replace Project
            result = result.replace(/project/g, project)
            // * 2. Replace Type
            result = result.replace(/type/g, type)
            // * 3. Replace Tcode Name
            result = result.replace(/tcode/g, tcode)
            // * 4. Replace Screen Number
            result = result.replace(/screen_number/g, tcode + "_" + numbering)

            filename = path.join(directoryPath, project, type, tcode, tcode + "_" + numbering + ".controller.js")
            dirName = path.dirname(filename)

            routes = {
                pattern: screenNaming,
                name: screenNaming,
                view: naming
            }
        }

        if (file.includes("view")) {
            // * 1. Replace Project
            result = data.replace(/project/g, project)
            // * 2. Replace Type
            result = result.replace(/type/g, type)
            // * 3. Replace Tcode Name
            result = result.replace(/tcode/g, tcode)
            // * 4. Replace Screen Number
            result = result.replace(/screen_number/g, tcode + "_" + numbering)

            filename = path.join(directoryPath, project, type, tcode, tcode + "_" + numbering + ".view.js")
            dirName = path.dirname(filename)
        }

        if (!fs.existsSync(dirName)) {
            mkdirp.sync(dirName)
        }
        if(!fs.existsSync(filename)){
            fs.writeFileSync(filename, result, 'utf8', function (err) {
                if (err) console.log(err);
            });
        }

        fileNames.push(filename)
    }
    return { fileNames, routes }
}

function addRoute(param){
    const {routes, routeFile} = param

    var codeString = ''
    var data = fs.readFileSync(routeFile[0], { encoding: 'utf8', flag: 'r' })
    var filename = routeFile[0]

    for(let i = 0; i < routes.length; i++){
        if(i != 0){
            codeString = codeString + "\n"
        }
        codeString = codeString + 
`    {
        pattern: ["${routes[i]["pattern"]}"],
        name: "${routes[i]["name"]}",
        view: "${routes[i]["view"]}",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },`

    }

    var searchString = `var myroutes = [`
    codeString = searchString + "\n" + codeString
    var data = data.replace(searchString, codeString)

    fs.writeFileSync(filename, data, 'utf8', function (err) {
        if (err) console.log(err);
    });
}

(async function start() {
    var files     = await getFilesTemplate()
    var routeFile = await getRouteFile()
    var types     = await getTypes()

    console.log("Welcome to SAPUI Screen Generator")
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'tcode',
                message: 'What is your tcode name?',
                validate: function (value) {
                    var pass = value != ''
                    if (pass) return true
                    return 'Please insert a value'
                },
            },
            {
                type: 'list',
                name: 'type',
                message: 'Tcode type?',
                choices: types,
                validate: function (value) {
                    var pass = value != ''
                    if (pass) return true
                    return 'Please insert a value'
                },
            },
            {
                type: 'input',
                name: 'screenNumber',
                message: `What screen number do you want? (You can use '-' separator or single number instead)`,
                validate: function (value) {
                    var pass = value != ''
                    if (pass) {
                        if(value.match(/^[0-9-]+$/)) return true
                        return 'Please insert as given format'
                    }
                    return 'Please insert a value'
                },
            },
        ])
        .then(answers => {
            console.log("Generating...")
            var { tcode, type, screenNumber } = answers
            var routes = []
            if (screenNumber.includes('-')) {
                var screenNumber = screenNumber.split("-")
                let first = screenNumber[0] < screenNumber[1] ? screenNumber[0] : screenNumber[1]
                let last = screenNumber[0] > screenNumber[1] ? screenNumber[0] : screenNumber[1]

                first = Number(first)
                last = Number(last)
                
                // Descending order 
                for (let index = last; index >= first; index--) {
                    routes.push(writeFile({ files, number: index, type, tcode }).routes)
                }

            } else {
                var screenNumber = Number(screenNumber)
                if(!isNaN(screenNumber)) routes.push(writeFile({ files, number: screenNumber, type, tcode }).routes)
            }
            console.log("Adding Route...")
            addRoute({routeFile, routes})
            console.log("Done!")
        })
        .catch(error => {
            console.error(error)
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}().catch(err => console.log(err)))