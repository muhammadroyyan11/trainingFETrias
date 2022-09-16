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
        klaw(path.join(directoryPath, PROJECTNAME))
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
                    jsPath.push(path.join(directoryPath, "web.config"))
                    jsPath.push(path.join(directoryPath, "index.html"))
                }
                resolve(jsPath)
            })
    })
}

function getCustomizedPath(location) {
    var jsPath = []
    return new Promise(function (resolve, reject) {
        klaw(path.join(directoryPath, location))
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

// Copy source code files
function copySrc(arrOfPath) {
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
                switch (true) {
                    case file.includes("ConfigWeb.js"):
                        console.log(`Injecting ENV`)
                    
                        // Replace Server 1
                        result = data.replace(/LOCALIIS;/g, `${ENV}_DEPLOYURL;`);
                        result = result.replace(/LOCALURL;/g, `${ENV}_DEPLOYURL;`);

                        // Replace Server 2
                        result = result.replace(/LOCALURL2;/g, `DEPLOYURL2;`);
                        
                        filename = path.join(directoryPath, "publish", "asset", "js", "ConfigWeb.js")
                        dirName = path.dirname(filename)
                        break;
                    case file.includes("worker.js"):
                        console.log(`Inject env to worker file`)
                    
                        result = data.replace(/DEV_WSOCKET;/g, `PRD_WSOCKET;`);
                        
                        filename = path.join(directoryPath, "publish", "asset", "js", "worker.js")
                        dirName = path.dirname(filename) 
                        break;
                    case file.includes(PROJECTNAME):
                        result = data
                        filename = file.replace(PROJECTNAME, `publish\\${PROJECTNAME}`)
                        dirName = path.dirname(filename)
                        break;
                    case file.includes("asset"):
                        result = data
                        filename = file.replace('asset', `publish\\asset`)
                        dirName = path.dirname(filename)
                        break;
                    case file.includes("index.html"):
                        if(useCDN){
                            data = data.replace(`script src="resources/sap-ui-core.js"`, 
                            `script src="https://openui5.hana.ondemand.com/${OPENUI_VERSION}/resources/sap-ui-core.js"`)
                        }

                        result = data
                        filename = file.replace('index.html', `publish\\index.html`)
                        dirName = path.dirname(filename)

                        console.log("using CDN")
                        break;    
                    default:
                        result = data
                        
                        let dirNameBefore = path.dirname(file)
                        let basename = path.basename(file)

                        filename = `${dirNameBefore}\\publish\\${basename}`
                        dirName = path.dirname(filename)
                        break;
                }

                mkdirp.sync(dirName);
                
                let basename = path.basename(file)//Basename is filename
                let ownLibs = [
                    "route.js",
                    "GlobalVariable.js",
                    "library.js",
                    "ConfigWeb.js",
                    "bootstrapper.js"
                ]
                
                if(file.includes(".js") && (file.includes(PROJECTNAME) || ownLibs.includes(basename)) && !file.includes(".json")){
                    if(ENV.includes("PRD")){
                        fs.writeFile(filename, result, 'utf8', function (err) {
                            if (err) return console.log(err);
                            resolve(console.log(`Replace ${filename} done!`))
                        });
                    }else{
                        fs.writeFile(filename, result, 'utf8', function (err) {
                            if (err) return console.log(err);
                            resolve(console.log(`Replace ${filename} done!`))
                        });
                    }
                }else{
                    fs.writeFile(filename, result, 'utf8', function (err) {
                        if (err) return console.log(err);
                        resolve(console.log(`Replace ${filename} done!`))
                    });
                }
            })
        }
    })
}

// Copy all asset files (images, icon, etc)
function copyAsset() {
    fs.mkdir(path.join(directoryPath, "publish", "asset"), { recursive: true }, (err) => {
        if (err) throw err;
    });
    return new Promise((resolve, reject) => {
        ncp.limit = 16;

        ncp(path.join(directoryPath, "asset", "image"),
            path.join(directoryPath, "publish", "asset", "image"), {
            // filter: /^((?!ConfigWeb)(?!worker).)*$/ //Skip ConfigWeb & Worker File
        }, function (err) {
            if (err) {
                reject(console.error(err))
            }
            ncp(path.join(directoryPath, "asset", "icon"),
            path.join(directoryPath, "publish", "asset", "icon"), {
            // filter: /^((?!ConfigWeb)(?!worker).)*$/ //Skip ConfigWeb & Worker File
            }, function (err) {
                if (err) {
                    reject(console.error(err))
                }
                ncp(path.join(directoryPath, "favicon.ico"),
                path.join(directoryPath, "publish", "favicon.ico"), {
                // filter: /^((?!ConfigWeb)(?!worker).)*$/ //Skip ConfigWeb & Worker File
                }, function (err) {
                    if (err) {
                        reject(console.error(err))
                    }
                    resolve(console.info('copying asset done!'))
                });
            });
        });
    })
}

// Replace HTML File
function replaceHTML() {
    return new Promise(function (resolve, reject) {
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            console.log("HTML File", files.filter(file => file.includes(".html")).length)
            files.filter(file => file.includes(".html")).forEach(file => {
                fs.readFile(file, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    var result = data
                    // console.log(result)
                    fs.writeFile(path.join(directoryPath, "publish", file), result, 'utf8', function (err) {
                        if (err) return console.log(err);
                        resolve(console.info(`Copying ${file} Done!`))
                    });
                });
            })
        });
    })
}

function isPublishEmpty() {
    var jsPath = []
    return new Promise(function (resolve, reject) {
        klaw(path.join(directoryPath, "publish"))
            .on('readable', function () {
                let item
                while ((item = this.read())) {
                    jsPath.push(item.path)
                }
            })
            .on('error', (err, item) => {
                console.log(err.message)
                console.log(item.path) // the file the error occurred on
                reject(err)
            })
            .on('end', () => {
                resolve(jsPath.length === 1)
            })
    })
}

function cleanup(){
    // Delete publish content
    console.log("Emptying folder publish...")
    del.sync(['publish/**']);
    console.info("Deleting done!")
}

function copyToServer(){
    console.log(`Publishing to ${LOCATION}...`)

    // Delete Current Connection
    const netDelAll = spawn('net',['use', "*", "/del", "/y"]);
    netDelAll.stdout.on('data', data => {
        console.log(`${data}`)
    });
    netDelAll.stderr.on('data', data => console.log(`Error net use delete all connection: ${data}`));
    netDelAll.on('close', code => console.log(`net use delete all connection exited with code ${code}`));

    // Mapping Remote Machine Address
    const net = spawn('net', ['use', LOCATION, PASSWD, `/user:${USER}`]);
    net.stdout.on('data', data => {
        console.log(`${data}`)
    });
    net.stderr.on('data', data => console.log(`Error net use : ${data}`));
    net.on('close', code => console.log(`net use child process exited with code ${code}`));

    // Copy File to Remote Machine
    const xcopy = spawn('xcopy', [`/E`, `/Y`, `publish\\*`, LOCATION])
    xcopy.stdout.on('data', data => {
        console.log(`${data}`)
    })
    xcopy.stderr.on('data', data => {
        console.log(`Error xcopy: ${data}`)
    })
    xcopy.on('close', code => {
        console.log(`xcopy child process exited with code ${code}`)
        cleanup()
    })
}
function mkdirVarian(timeFolder){
    console.log(`Publishing to ${LOCATION}...`)

    // Delete Current Connection
    const netDelAll = spawn('net',['use', "*", "/del", "/y"]);
    netDelAll.stdout.on('data', data => {
        console.log(`${data}`)
    });
    netDelAll.stderr.on('data', data => console.log(`Error net use delete all connection: ${data}`));
    netDelAll.on('close', code => console.log(`net use delete all connection exited with code ${code}`));

    // Mapping Remote Machine Address
    const net = spawn('net', ['use', LOCATION, PASSWD, `/user:${USER}`]);
    net.stdout.on('data', data => {
        console.log(`${data}`)
    });
    net.stderr.on('data', data => console.log(`Error net use : ${data}`));
    net.on('close', code => console.log(`net use child process exited with code ${code}`));

    var path = LOCATION+ "\\Ver_"+timeFolder
    console.log("dir nafi"+path)
    const mkdir = spawn('mkdir', [path])
    mkdir.stdout.on('data', data => {
        console.log(`${data}`)
    })
    mkdir.stderr.on('data', data => {
        console.log(`Error mkdir: ${data}`)
    })
    mkdir.on('close', code => {
        console.log(`mkdir child process exited with code ${code}`)
        // cleanup()
    })
}
function copyVersion(timeFolder){
    console.log(`Publishing to ${LOCATION}...`)

    // Delete Current Connection
    const netDelAll = spawn('net',['use', "*", "/del", "/y"]);
    netDelAll.stdout.on('data', data => {
        console.log(`${data}`)
    });
    netDelAll.stderr.on('data', data => console.log(`Error net use delete all connection: ${data}`));
    netDelAll.on('close', code => console.log(`net use delete all connection exited with code ${code}`));

    // Mapping Remote Machine Address
    const net = spawn('net', ['use', LOCATION, PASSWD, `/user:${USER}`]);
    net.stdout.on('data', data => {
        console.log(`${data}`)
    });
    net.stderr.on('data', data => console.log(`Error net use : ${data}`));
    net.on('close', code => console.log(`net use child process exited with code ${code}`));

    var pathlink = LOCATION+ "\\Ver_"+timeFolder
    const xcopy = spawn('xcopy', [`/E`, `/Y`, LOCATION+"\\"+PROJECTNAME+"\\*",pathlink])
    xcopy.stdout.on('data', data => {
        console.log(`${data}`)
    })
    xcopy.stderr.on('data', data => {
        console.log(`Error xcopy: ${data}`)
    })
    xcopy.on('close', code => {
        console.log(`xcopy child process exited with code ${code}`)
    })
    const xcopy2 = spawn('xcopy', [`/E`, `/Y`, LOCATION+"\\asset\\*",pathlink])
    xcopy2.stdout.on('data', data => {
        console.log(`${data}`)
    })
    xcopy2.stderr.on('data', data => {
        console.log(`Error xcopy: ${data}`)
    })
    xcopy2.on('close', code => {
        console.log(`xcopy child process exited with code ${code}`)
    })

    const xcopy3 = spawn('cp', [LOCATION+`\\version.txt`,pathlink+`\\version.txt`])
    xcopy3.stdout.on('data', data => {
        console.log(`${data}`)
    })
    xcopy3.stderr.on('data', data => {
        console.log(`Error copy: ${data}`)
    })
    xcopy3.on('close', code => {
        console.log(`copy child process exited with code ${code}`)
    })

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
function  createVersionTxt(strMessage){
    return new Promise(function (resolve, reject) {
        fs.writeFile(LOCATION+"\\version.txt", strMessage, 'utf8', function (err) {
            if (err) return console.log(err);
            resolve(console.log(`Replace ${LOCATION} done!`))
        });
    })
}
(async function start() {
    if(ENV){
        const argvs = process.argv
        let arrOfPath        
        
        cleanup()
        console.log("Welcome to Publish using Node!")
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'content',
                message: 'Input Log Versioning dari Apps ini!',
                validate: function (value) {
                    var pass = value != ''
                    if (pass) return true
                    return 'Please insert a value'
                },
            },
        ])
        .then(async answers => {
            console.log("Generating...")
            var { content } = answers
            
            switch (true) {
                case argvs.includes("assetonly"):
                    await copyAsset()
                    break;
                case argvs.includes("noasset"):
                    arrOfPath = await getAllFilesPath()
                    await copySrc(arrOfPath)
                    break;
                default:
                    if(argvs.length > 2){
                        arrOfPath = await getCustomizedPath(argvs[2])
                        await copySrc(arrOfPath)
                    }else{
                        // If user doesn't supply path or argument, assume publish all code & asset
                        arrOfPath = await getAllFilesPath()
                        await copySrc(arrOfPath)
                        await copyAsset()
                    }
                    break;
            }
            
            const isEmpty = await isPublishEmpty()
        
            if (isEmpty) {
                console.info("Yahh folder publishnya kosong bro😅, \nulangi lagi bro!👍")
            } else {
                var time = new Date()
                var strTime = time.getDate()+""+(time.getMonth()+1)+""+time.getFullYear()+""+time.getHours()+""+time.getMinutes()+""+time.getSeconds()
                
                var pathList = arrOfPath.toString().replace(/,/g, "\n");
                
                mkdirVarian(strTime)
                
                await sleep(1000);
                
                copyVersion(strTime)
                
                await sleep(1000);
                
                await createVersionTxt( content+"\n"+pathList)
    
                await sleep(3000);
                
                copyToServer()
            }
            
        })
        .catch(error => {
            console.error(error)
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });

    }else{
        throw "Unknown ENV, please define it"
    }

}().catch(err => console.error(err)))