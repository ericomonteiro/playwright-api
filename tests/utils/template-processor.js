const fs = require('fs');
const path = require('path');
const {loadDefaultExport} = require("./modules");

function randomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function randomNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * 10);
        result += randomIndex;
    }
    return parseInt(result);
}

function oneOfList(listFileName) {
    let listsFolder = '../lists/';
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

module.exports = { randomString, randomNumber, oneOfList };