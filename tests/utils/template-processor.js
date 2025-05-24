
const mapFunctions = {
    "randomString": randomString,
    "randomNumber": randomNumber,
    "oneOfList": oneOfList,
    "generateUUID": generateUUID,
}

const fs = require('fs');
const path = require('path');
const {randomUUID} = require("node:crypto");
const {loadDefaultExport} = require("./modules");


function templateReplacer(obj, path = '') {
    for (const key in obj) {
        const value = obj[key];
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            templateReplacer(value, currentPath);
        } else {
            if (typeof value === 'string' && value[0] === '$') {
                const match = value.match(/^\$(\w+)\(/);
                let functionName = match ? match[1] : null;
                if (functionName && mapFunctions[functionName]) {
                    let func = mapFunctions[functionName];
                    obj[key] = func(value);
                } else {
                    throw new Error(`Function not found: ${functionName}`);
                }
            }
        }
    }

    return obj;
}

function processTemplate(template) {
    let result = templateReplacer(template);
    console.log(JSON.stringify(result, null, 2));
    return template
}

function extractParams(stringParams) {
    const match = stringParams.match(/\(([^)]*)\)/);
    return match ? match[1] : null;
}

function randomString(params) {
    let length = parseInt(extractParams(params));
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function randomNumber(params) {
    let length = parseInt(extractParams(params));
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * 10);
        result += randomIndex;
    }
    return parseInt(result);
}

function oneOfList(params) {
    let listsFolder = '../lists/';
    let listFileName = extractParams(params).replaceAll("'", "");
    let filePath = path.join(__dirname, listsFolder, listFileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    let list = loadDefaultExport(filePath)

    if (!Array.isArray(list)) {
        throw new Error(`File content is not a JSON array: ${filePath}`);
    }

    let randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function generateUUID() {
    return randomUUID()
}

module.exports = { processTemplate };