"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
const menu_1 = require("./menu/menu");
const read_1 = require("./service/read");
const write_1 = require("./service/write");
let win = null;
const args = process.argv.slice(1), serve = args.some(val => val === '--serve');
const menu = electron_1.Menu.buildFromTemplate(menu_1.menuApp);
electron_1.Menu.setApplicationMenu(menu);
function createWindow() {
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: 1980,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            allowRunningInsecureContent: (serve),
            contextIsolation: true,
            nodeIntegration: false
        },
    });
    // Open the DevTools programmatically
    win.webContents.openDevTools();
    if (serve) {
        const debug = require('electron-debug');
        debug();
        //require('electron-reloader')(module);
        win.loadURL('http://localhost:4200');
    }
    else {
        // Path when running electron executable
        let pathIndex = './index.html';
        if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
            // Path when running electron in local folder
            pathIndex = '../dist/index.html';
        }
        const url = new URL(path.join('file:', __dirname, pathIndex));
        win.loadURL(url.href);
    }
    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });
    return win;
}
// #region MenuToAngular
electron_1.ipcMain.on('navigate-to', (event, route) => {
    if (win) {
        win.webContents.send('navigate-to', route);
    }
});
electron_1.ipcMain.on('tone', (event, note) => {
    if (win) {
        win.webContents.send('tone', note);
    }
});
// #endregion
// #region CRUDAngularToNode
electron_1.ipcMain.handle('read-data', (event, filePath) => {
    return (0, read_1.readData)(filePath);
});
electron_1.ipcMain.handle('write-data', (event, filePath, data) => {
    return (0, write_1.writeData)(filePath, data);
});
// #endregion
try {
    // This method will be called when Electron has finished
    electron_1.app.on('ready', () => setTimeout(createWindow, 400));
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map