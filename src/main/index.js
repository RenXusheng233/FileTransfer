import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import DataStore from './utils/fetchFolderPaths'
import Client from './utils/connectRemoteService'

// 初始值: 文件名
const myStore = new DataStore({ name: 'Folder Data' })

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
let folderSelectionWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/`
    : `file://${__dirname}/index.html`

const folderSelectionURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#folder-selection`
    : `file://${__dirname}/index.html#folder-selection`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 863,
    show: false,
    useContentSize: true,
  })

  // console.log(mainWindow.webContents.id) // 1

  mainWindow.loadURL(winURL)

  // Open dev tools initially when in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus()
      })
      // 默认关闭devtools
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  // 首次打开弹出模态窗口 [提示选择需要上传文件的文件夹]
  mainWindow.webContents.on('did-finish-load', () => {
    // 模态窗口 - 禁用父窗口的子窗口
    folderSelectionWindow = new BrowserWindow({
      modal: true,
      width: 600,
      height: 400,
      resizable: false,
      parent: mainWindow,
      show: false,
    })

    // console.log(folderSelectionWindow.webContents.id) // 3

    folderSelectionWindow.loadURL(folderSelectionURL)

    folderSelectionWindow.once('ready-to-show', () => {
      folderSelectionWindow.show()
    })
  })

  // 处理获取本地路径的请求
  ipcMain.on('get-stored-folder', (event) => {
    event.sender.send('stored-folder', myStore.getFolders())
  })

  // 处理请求 [弹出选择文件夹dialog]
  ipcMain.on('select-permission-folder', (event) => {
    dialog.showOpenDialog(
      {
        properties: [
          'openDirectory',
          'multiSelections',
          'createDirectory',
          'treatPackageAsDirectory',
        ],
      },
      (folders) => {
        if (folders) {
          event.sender.send('selected-folder', folders)
        }
      }
    )
  })

  // 处理传回的路径信息保存至本地文件中
  ipcMain.on('save-permission-folder', (event, folders) => {
    // 存储至本地文件
    myStore.addFolders(folders)
  })

  // 处理传回的参数连接远程服务器
  ipcMain.on('remote-service-params', (event, params) => {
    Client.connect(params)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
