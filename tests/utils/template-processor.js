
const mapFunctions = {
    "randomString": randomString,
    "randomNumber": randomNumber,
}

function printTemplateValues(obj, path = '') {
    for (const key in obj) {
        const value = obj[key];
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            printTemplateValues(value, currentPath);
        } else {
            if (typeof value === 'string' && value[0] === '$') {
                const match = value.match(/^\$(\w+)\(/);
                let functionName = match ? match[1] : null;
                if (functionName && mapFunctions[functionName]) {
                    let func = mapFunctions[functionName];
                    obj[key] = func(value);
                }
            }
        }
    }

    return obj;
}

function processTemplate(template) {
    let result = printTemplateValues(template);
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

module.exports = { processTemplate };