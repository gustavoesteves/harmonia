const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  /*******
   * CRUD
   ******/
  readData: (filePath) => ipcRenderer.invoke('read-data', filePath),
  writeData: (filePath, data) => ipcRenderer.invoke('write-data', filePath, data),
});