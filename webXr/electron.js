// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const isDev = require('electron-is-dev');
import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { fileURLToPath } from 'url';

// Create a __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {

      nodeIntegration: true,
      contextIsolation: false,
      
    },
  });





  if(isDev) { 
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools();  


  }else {
     mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});