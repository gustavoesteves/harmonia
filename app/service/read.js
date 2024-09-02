"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = void 0;
const fs_1 = require("fs");
const path = require("path");
function readData(filePath) {
    const data = (0, fs_1.readFileSync)(path.join(__dirname, '../db/' + filePath), 'utf8');
    return JSON.parse(data);
}
exports.readData = readData;
//# sourceMappingURL=read.js.map