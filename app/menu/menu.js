"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuApp = void 0;
const isMac = process.platform === 'darwin';
exports.menuApp = [
    ...(isMac ? [{
            label: 'Harmonia',
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                {
                    label: 'Configuração', click: () => {
                        const { ipcMain } = require('electron');
                        ipcMain.emit('navigate-to', null, 'config');
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }] : []),
    {
        label: 'Tonalidade',
        submenu: [
            {
                label: 'C', click: () => {
                    const { ipcMain } = require('electron');
                    ipcMain.emit('tone', null, 'C');
                }
            },
            {
                label: 'C#', click: () => {
                    const { ipcMain } = require('electron');
                    ipcMain.emit('tone', null, 'C#');
                }
            },
            {
                label: 'Db', click: () => {
                    const { ipcMain } = require('electron');
                    ipcMain.emit('tone', null, 'Db');
                }
            },
            {
                label: 'D', click: () => {
                    const { ipcMain } = require('electron');
                    ipcMain.emit('tone', null, 'D');
                }
            },
            {
                label: 'D#'
            },
            {
                label: 'Eb'
            },
            {
                label: 'E'
            },
            {
                label: 'F'
            },
            {
                label: 'F#'
            },
            {
                label: 'Gb'
            },
            {
                label: 'G'
            },
            {
                label: 'G#'
            },
            {
                label: 'Ab'
            },
            {
                label: 'A'
            },
            {
                label: 'A#'
            },
            {
                label: 'A#'
            },
            {
                label: 'B'
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
                            const { ipcMain } = require('electron');
                            ipcMain.emit('navigate-to', null, 'funcional-maior');
                        }
                    },
                    { label: 'O modo menor', click: () => { console.log('O modo menor'); } },
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