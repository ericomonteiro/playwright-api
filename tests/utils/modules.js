export function loadDefaultExport(filePath) {
    const module = require(filePath);
    return module.default || module;
}