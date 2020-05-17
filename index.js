const electron = require('electron');
const path = require('path');
const url = require('url');

    // Module to control application life.
const { app, BrowserWindow, Menu, ipcMain, shell} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let portWindow;

function createWindow() {
  // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        title:'Dynamic Shaker',
        icon:'icon.png',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname + '/js', 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname+'/view', 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Quit app when closed
    mainWindow.on('closed',()=>{
      app.quit()
    })

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // create main maenu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

//  Handle Add Port
function addPort(){
  // Create the browser window.
    portWindow = new BrowserWindow({
        width: 750,
        height:200,
        title:'addPort',
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    portWindow.loadURL(url.format({
        pathname: path.join(__dirname + '/view', 'addPort.html'),
        protocol: 'file:',
        slashes: true
    }))
}

// catch port
ipcMain.on('item:add',(e,item)=>{
  mainWindow.webContents.send('item:add',item);
  portWindow.close();
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    app.quit();
})
app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

const mainMenuTemplate = [
  {
    label:'File',
    submenu:[
      {
        label:"Help",
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+H',
        click(){
          shell.openExternal('')
        }
      },
      {
        label:'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit()
        }
      },
      {
        role:'reload'
      }
    ]
  },
  // {
  //   label:'Add Port',
  //   click(){
  //     addPort()
  //   }
  // },
  {
    label:'Toogle DevTools',
    accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
    click(item,focusedWindow){
      focusedWindow.toggleDevTools();
    }
  },
  {
    label:"Modules",
    submenu:[
      {
        label:"Node.js",
        click(){
          shell.openExternal('https://nodejs.org/en/docs/')
        }
      },
      {
        label:"Electron",
        click(){
          shell.openExternal('https://www.electronjs.org/docs')
        }
      },
      {
        label:"serialport",
        click(){
          shell.openExternal('https://github.com/serialport/node-serialport')
        }
      },
      {
        label:"dotenv",
        click(){
          shell.openExternal('https://github.com/motdotla/dotenv')
        }
      },
      {
        label:"chart.js",
        click(){
          shell.openExternal('https://www.chartjs.org/docs/latest/')
        }
      },
      {
        label:"Plotly.js",
        click(){
          shell.openExternal('https://plotly.com/javascript/')
        }
      },
      {
        label:"electron-rebuild",
        click(){
          shell.openExternal('https://github.com/electron/electron-rebuild')
        }
      },
    ]
  }
]

//  If mac add empty object
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({})
}
