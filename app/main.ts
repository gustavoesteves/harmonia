import { app, BrowserWindow, screen, Menu, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { menuApp } from './menu/menu';
import { readData } from "./service/read";
import { writeData } from './service/write';

console.log('Iniciando Electron a partir do main.ts compilado!');

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

const menu = Menu.buildFromTemplate(menuApp);
Menu.setApplicationMenu(menu);

function createWindow(): BrowserWindow {
  // Create the browser window.
  win = new BrowserWindow({
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
    win.loadURL('http://localhost:4200');
  } else {
    // Caminho correto para o Angular compilado
    const distPath = path.join(__dirname, '../dist/harmonia/index.html');
    if (fs.existsSync(distPath)) {
      const url = new URL('file://' + distPath);
      win.loadURL(url.href);
    } else {
      console.error('Arquivo index.html não encontrado em', distPath);
      win.loadURL('file://' + path.join(__dirname, '../src/index.html')); // Fallback, opcional
    }
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
  });

  return win;
}

// #region MenuToAngular
ipcMain.on('navigate-to', (event, route) => {
  if (win) {
    win.webContents.send('navigate-to', route);
  }
});

ipcMain.on('tone', (event, note) => {
  if (win) {
    win.webContents.send('tone', note);
  }
});

// #endregion

// #region CRUDAngularToNode
ipcMain.handle('read-data', (event, filePath) => {
  return readData(filePath);
});

ipcMain.handle('write-data', (event, filePath: string, data: any[]) => {
  return writeData(filePath, data);
});
// #endregion

try {
  // This method will be called when Electron has finished
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
