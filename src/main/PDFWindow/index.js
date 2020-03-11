const { BrowserWindow, Menu, Notification } = require('electron');
const path = require('path');
var ipc = require('electron').ipcMain;
const ptp = require("pdf-to-printer");


const createPDFWindow = (options) => {
    let { url, width, height, title, webContents, show } = options;
    let win = new BrowserWindow({
        width: width,
        height: height,
        frame: true,
        titleBarStyle: 'hidden',
        title,
        webContents,
        show,
        webPreferences: {
            plugins: true,
            enableRemoteModule: true,
            webviewTag: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            nativeWindowOpen: true,
            preload: path.join(__dirname, 'framePreload.js'),
        }
    });
    win.setMenu(Menu.buildFromTemplate([]));

    const frameURL = path.join(`file://${__dirname}`, 'frame.html');
    win.loadURL(frameURL)
    ipc.once('get-frame-url', (event, data) => {
        event.sender.send('get-frame-url-reply', url);
    });
    ipc.on('print-pdf', (e, pdf) => {
        if(!win.isDestroyed() && pdf.windowID===win.id){
            printPDF(pdf)
        };
    });
    win.on('closed', () => {
        if(!win.isDestroyed()) win.destroy();
    });

    return win;
}

const printPDF = (pdf) => {

    ptp.print(pdf.filename)
        .then((body) => {
            const notif = new Notification({
                title: 'Impressão realizada com sucesso!',
                body,
                icon: '../../assets/img/success.png'
            });
            notif.show();
        })
        .catch((e) => {
            const notif = new Notification({
                title: 'Erro ao imprimir',
                e,
                silent: false,
                icon: '../../assets/img/delete-icon.png'
            });
            notif.show();
        });
}

module.exports = {
    createPDFWindow
}