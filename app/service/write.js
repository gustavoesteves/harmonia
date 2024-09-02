"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeData = void 0;
const fs_1 = require("fs");
const path = require("path");
function writeData(filePath, data) {
    (0, fs_1.writeFileSync)(path.join(__dirname, '../db/' + filePath), JSON.stringify(data, null, 2), 'utf8');
}
exports.writeData = writeData;
//# sourceMappingURL=write.js.map