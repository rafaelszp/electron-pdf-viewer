const { app, BrowserWindow } = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain;
const {createPDFWindow} = require('./PDFWindow')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

    const indexFile = `file://${path.join(__dirname, '..', 'renderer/index.html')}`
  // and load the index.html of the app.
  win.loadURL(indexFile)



}

app.whenReady().then(()=>{
    createWindow();
    ipc.on('open-pdf-viewer',(event,pdf)=>{
        const reportFile=path.join(__dirname,'..','..','cheatsheet.pdf');
        createPDFWindow({ url: `file://${reportFile}`, show: true, title: 'PDF Viewer Example' });
    });
})