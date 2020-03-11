const ipc = require('electron').ipcRenderer;


ipc.once('get-frame-url-reply', function(event, response){
    let iframe  = document.querySelector('iframe');
    const frameSrc = `../../renderer/Util/ViewerJS/index.html#${response}`;
    console.log(frameSrc)
    iframe.src = frameSrc;
})

const onFrameLoad = (e) =>{
    document.openTempFolder = openTempFolder;
    ipc.send('get-frame-url', '');
}

document.addEventListener('DOMContentLoaded', () => onFrameLoad());
