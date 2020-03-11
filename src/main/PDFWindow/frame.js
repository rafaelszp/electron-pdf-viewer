const { shell } = require('electron') // deconstructing assignment
const path = require('path');
var ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;

const retrieveTempDir = () => { }
const openTempFolder = (file) => {
    const reportFile = path.resolve(file);
    shell.openItem(`${reportFile}`)
}

const printPDF = (pdf) => {
    const id = remote.getCurrentWindow().id;
    pdf.windowID=id;
    ipc.send('print-pdf',pdf);    
};

window.openTempFolder = openTempFolder;
window.printPDF = printPDF;