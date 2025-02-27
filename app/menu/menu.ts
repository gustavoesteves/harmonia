import { MenuItemConstructorOptions } from 'electron';

const isMac = process.platform === 'darwin';
import { ipcMain } from 'electron';

export const menuApp: MenuItemConstructorOptions[] = [
    {
        label: 'Harmonia',
        submenu: [
            { role: 'about' as const },
            { type: 'separator' as const },
            {
                label: 'Configuração', click: () => {
                    ipcMain.emit('navigate-to', null, 'config');
                }
            },
            { type: 'separator' as const },
            { role: 'quit' as const }
        ]
    },
    {
        label: 'Tonalidade',
        submenu: [
            {
                label: 'C', click: () => {
                    ipcMain.emit('tone', null, 'C');
                }
            },
            {
                label: 'C#', click: () => {
                    ipcMain.emit('tone', null, 'C#');
                }
            },
            {
                label: 'Db', click: () => {
                    ipcMain.emit('tone', null, 'Db');
                }
            },
            {
                label: 'D', click: () => {
                    ipcMain.emit('tone', null, 'D');
                }
            },
            {
                label: 'D#', click: () => {
                    ipcMain.emit('tone', null, 'D#');
                }
            },
            {
                label: 'Eb', click: () => {
                    ipcMain.emit('tone', null, 'Eb');
                }
            },
            {
                label: 'E', click: () => {
                    ipcMain.emit('tone', null, 'E');
                }
            },
            {
                label: 'F', click: () => {
                    ipcMain.emit('tone', null, 'F');
                }
            },
            {
                label: 'F#', click: () => {
                    ipcMain.emit('tone', null, 'F#');
                }
            },
            {
                label: 'Gb', click: () => {
                    ipcMain.emit('tone', null, 'Gb');
                }
            },
            {
                label: 'G', click: () => {
                    ipcMain.emit('tone', null, 'G');
                }
            },
            {
                label: 'G#', click: () => {
                    ipcMain.emit('tone', null, 'G#');
                }
            },
            {
                label: 'Ab', click: () => {
                    ipcMain.emit('tone', null, 'Ab');
                }
            },
            {
                label: 'A', click: () => {
                    ipcMain.emit('tone', null, 'A');
                }
            },
            {
                label: 'A#', click: () => {
                    ipcMain.emit('tone', null, 'A#');
                }
            },
            {
                label: 'Bb', click: () => {
                    ipcMain.emit('tone', null, 'Bb');
                }
            },
            {
                label: 'B', click: () => {
                    ipcMain.emit('tone', null, 'B');
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
                            ipcMain.emit('navigate-to', null, 'funcional-maior');
                        }
                    },
                    {
                        label: 'O modo menor', click: () => {
                            ipcMain.emit('navigate-to', null, 'funcional-menor');
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