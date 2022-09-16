'use strict';
require('dotenv').config()
const { spawn }          = require('child_process');
const path               = require('path');
const del                = require('del')
const inquirer = require('inquirer');
// const directoryPath = path.join(__dirname);
const directoryPath = path.join(process.cwd());
const klaw               = require('klaw')
const fs                 = require('fs');
var mkdirp               = require('mkdirp')
var ncp                  = require('ncp').ncp;
const { basename }       = require('path');
var JavaScriptObfuscator = require('javascript-obfuscator');

const PROJECTNAME    = process.env.PROJECTNAME
const ENV            = process.env.NODE_ENV
const USER           = process.env[ENV + "_USERNAME_SMB"]
const PASSWD         = process.env[ENV + "_PASSWORD"]
const LOCATION       = process.env[ENV + "_PUB"]
const useCDN         = process.env[ENV + "_CDN"] == "TRUE"
const OPENUI_VERSION = process.env["OPENUI_VERSION"]

function getAllFilesPath(asset = true) {
    var jsPath = []
    return new Promise(async function (resolve, reject) {
        klaw(path.join(LOCATION, PROJECTNAME))
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
            .on('end', async () => {
                if(asset){
                    let assetPath = await getCustomizedPath("asset")
                    assetPath.forEach(filePath => {
                        jsPath.push(filePath)
                    })

                    // jsPath.push(path.join(directoryPath, "manifest.json"))
                    // jsPath.push(path.join(directoryPath, "web.config"))
                    // jsPath.push(path.join(directoryPath, "index.html"))
                }
                resolve(jsPath)
            })
    })
}

function getCustomizedPath(location) {
    var jsPath = []
    return new Promise(function (resolve, reject) {
        klaw(path.join(LOCATION,location))
            .on('readable', function () {
                let item
                while ((item = this.read())) {
                    if(!(item.path.includes("cypress")) && !(item.path.includes("resources")) && !(item.path.includes("node_modules"))){
                        if ((item.path.includes(PROJECTNAME) || item.path.includes("asset"))) {
                            if(item.path.includes(".js") || item.path.includes(".css")){
                                jsPath.push(item.path)
                            }
                        }else if(item.path.includes("manifest.json")){
                            jsPath.push(item.path)
                        }else if(item.path.includes("index.html")){
                            jsPath.push(item.path)
                        }
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

function getCustomizedPathParam(location) {
    var jsPath = []
    return new Promise(function (resolve, reject) {
        klaw(path.join(location))
            .on('readable', function () {
                let item
                while ((item = this.read())) {                   
                    if(item.path.includes(".js")){
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

function cleanup(){
    // Delete publish content
    console.log("Emptying folder publish...")
    del.sync(['publish/**']);
    console.info("Deleting done!")
}

// Copy source code files
function obfuscateTheFile(arrOfPath) {
    return new Promise(function (resolve, reject) {
        for (const file of arrOfPath) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err)
                }
                let result = ''
                let filename = ''
                let dirName = ''

                // Inject ENV

                result = data
                
                let dirNameBefore = path.dirname(file)
                let basename = path.basename(file)

                filename = `${dirNameBefore}\\${basename}`
                dirName = path.dirname(filename)
  
                mkdirp.sync(dirName);
                
                let basenameTwo = path.basename(file)//Basename is filename
                let ownLibs = [
                    "route.js",
                    "GlobalVariable.js",
                    "library.js",
                    "ConfigWeb.js",
                    "bootstrapper.js"
                ]
                
                if(file.includes(".js")){
                    result = JavaScriptObfuscator.obfuscate(result.toString())
                    // console.log(result.toString())
                    fs.writeFile(filename, result.toString(), 'utf8', function (err) {
                        if (err) return console.log(err);
                        resolve(console.log(`Replace ${filename} done!`))
                    });
                }   
            })
        }
    })
}

(async function start() {
    if(ENV){
        const argvs = process.argv
        let arrOfPath        
        cleanup()

        console.log("Welcome to Obfuscate Generator")
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'path',
                message: 'input path file / folder that you want to obfuscate? example "\\\\192.168.1.92\\node_tms_dev\\asset\\css\\cssLogin\\iofrm-theme5.css"',
                validate: function (value) {
                    var pass = value != ''
                    if (pass) return true
                    return 'Please insert a value'
                },
            },
        ])
        .then(async answers => {
            console.log("Generating...")
            var { path } = answers
            console.log("Get Data From Route..."+path)
            let assetPath = await getCustomizedPathParam(path)
            console.log(assetPath)
            await obfuscateTheFile(assetPath)
            
        })
        .catch(error => {
            console.error(error)
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
        
    // If user doesn't supply path or argument, assume publish all code & asset
        // arrOfPath = await getAllFilesPath()
        // console.log(arrOfPath)
        // await obfuscateTheFile(arrOfPath)
        // await copyAsset()
    }else{
        throw "Unknown ENV, please define it"
    }

}().catch(err => console.error(err)))