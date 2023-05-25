const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path')
 
app.commandLine.appendSwitch('disable-site-isolation-trials');

// Create the browser window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    try {
        // Load the index.html of the app
        win.loadFile('index.html')
        win.webContents.openDevTools() // Open the DevTools
        
    } catch (err) {
        console.log(err)
    }

}





// When the app is ready, call the createWindow function
app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed ( Linux & Windows )
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('getWebContents', (event) => {
    event.returnValue = mainWindow.webContents;
  });



  