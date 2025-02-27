"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuApp = void 0;
const isMac = process.platform === 'darwin';
const electron_1 = require("electron");
exports.menuApp = [
    {
        label: 'Harmonia',
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            {
                label: 'Configuração', click: () => {
                    electron_1.ipcMain.emit('navigate-to', null, 'config');
                }
            },
            { type: 'separator' },
            { role: 'quit' }
        ]
    },
    {
        label: 'Tonalidade',
        submenu: [
            {
                label: 'C', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'C');
                }
            },
            {
                label: 'C#', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'C#');
                }
            },
            {
                label: 'Db', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'Db');
                }
            },
            {
                label: 'D', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'D');
                }
            },
            {
                label: 'D#', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'D#');
                }
            },
            {
                label: 'Eb', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'Eb');
                }
            },
            {
                label: 'E', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'E');
                }
            },
            {
                label: 'F', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'F');
                }
            },
            {
                label: 'F#', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'F#');
                }
            },
            {
                label: 'Gb', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'Gb');
                }
            },
            {
                label: 'G', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'G');
                }
            },
            {
                label: 'G#', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'G#');
                }
            },
            {
                label: 'Ab', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'Ab');
                }
            },
            {
                label: 'A', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'A');
                }
            },
            {
                label: 'A#', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'A#');
                }
            },
            {
                label: 'Bb', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'Bb');
                }
            },
            {
                label: 'B', click: () => {
                    electron_1.ipcMain.emit('tone', null, 'B');
                }
            },
        ]
    },
    {
        label: 'Teoria musical',
        submenu: [
            {
                label: 'Harmonia Funcional',
                submenu: [
                    {
                        label: 'O modo maior', click: () => {
                            electron_1.ipcMain.emit('navigate-to', null, 'funcional-maior');
                        }
                    },
                    {
                        label: 'O modo menor', click: () => {
                            electron_1.ipcMain.emit('navigate-to', null, 'funcional-menor');
                        }
                    },
                    { label: 'Abordagem Modal', click: () => { console.log('Abordagem Modal'); } }
                ]
            },
            {
                label: 'Teoria Clássica',
                submenu: [
                    { label: 'O modo menor', click: () => { console.log('O modo menor'); } }
                ]
            },
            {
                label: 'Contraponto',
                click: () => { console.log('Contraponto'); }
            },
            {
                label: 'Arranjo',
                click: () => { console.log('Arranjo'); }
            },
            {
                label: 'Orquestração',
                click: () => { console.log('Orquestração'); }
            }
        ]
    },
    {
        label: 'Ferramentas',
        submenu: [
            {
                label: 'Emprestimo Modal'
            },
            {
                label: 'Frases aleatórias'
            },
            {
                label: 'Construtor de acorde'
            },
            {
                label: 'Contrutor de escala'
            }
        ]
    },
    {
        label: 'Harmonia Aplicada',
        submenu: [
            {
                label: 'Choro'
            },
            {
                label: 'Samba'
            },
            {
                label: 'Forró'
            },
            {
                label: 'Frevo'
            },
            {
                label: 'Valsa mineira'
            },
            {
                label: 'Jazz'
            },
            {
                label: 'Blues'
            }
        ]
    }
];
//# sourceMappingURL=menu.js.map