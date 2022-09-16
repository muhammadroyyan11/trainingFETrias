require('dotenv').config()
const path = require('path')
const fs = require('fs');
const inquirer = require('inquirer');

const directoryPath = path.join(__dirname);

// ! CLI Prompt
// * 1. env name
// * 2. env Type
// * 3. env Location
// * 4. env Username
// * 5. env Password
// * 6. is using CDN

function getTypes(){
    return ["DEV", "PRD"]
}

function appendENV(param){
    let { name, type, location, username, password, cdn } = param

    let envFile = fs.readFileSync(path.join(directoryPath, ".env"), {encoding: "utf-8", flag: "r"})
    // Double Enter
    envFile = envFile                  + "\r\n" + "\r\n" +
    `${name}_PUB=${location}`          + "\r\n" +
    `${name}_USERNAME_SMB=${username}` + "\r\n" +
    `${name}_PASSWORD=${password}`     + "\r\n" +
    `${name}_CDN=${cdn}`

    fs.writeFileSync(path.join(directoryPath, ".env"), envFile, "utf-8", function(){
        if (err) console.log(err);
    })
}

function appendPackageJson(param){
    let { name, type, location, username, password, cdn } = param
    let packageJSONFile = fs.readFileSync(path.join(directoryPath, "package.json"), {encoding: "utf-8", flag: "r"})
    
    let packageJSONObj = JSON.parse(packageJSONFile)
    packageJSONObj.scripts[`publish:${type.toLowerCase()}:${name}`] = `env NODE_ENV=${name} npm run script-publish`

    packageJSONFile = JSON.stringify(packageJSONObj, null, 2)

    fs.writeFileSync(path.join(directoryPath, "package.json"), packageJSONFile, "utf-8", function(){
        if (err) console.log(err);
    })
}

(async function main() {
    let types = await getTypes()

    console.log("Welcome to env Generator")
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your env name?',
                validate: function (value) {
                    let pass = value != ''
                    if (pass) return true
                    return 'Please insert a value'
                },
            },
            {
                type: 'list',
                name: 'type',
                message: 'env type?',
                choices: types,
                validate: function (value) {
                    let pass = value != ''
                    if (pass) return true
                    return 'Please insert a value'
                },
            },
            {
                type: 'input',
                name: 'location',
                message: "Where the location?",
                validate: function (value) {
                    let pass = value != ''
                    if (pass) return true
                    return 'Please insert a value'
                },
            },
            {
                type: 'input',
                name: 'username',
                message: "What is the username?",
                validate: function (value) {
                    let pass = value != ''
                    if (pass) return true
                    return 'Please insert a value'
                },
            },
            {
                type: 'password',
                name: 'password',
                message: "What is the password?"
            },
            {
                type: 'confirm',
                name: 'cdn',
                message: "Using CDN?",
                default: false
            },
        ])
        .then(answers => {
            console.log("Generating...")

            // Debugging Purpose
            // console.log(name)
            // console.log(type)
            // console.log(location)
            // console.log(username)
            // console.log(password)
            // console.log(cdn)

            appendENV(answers)
            appendPackageJson(answers)

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