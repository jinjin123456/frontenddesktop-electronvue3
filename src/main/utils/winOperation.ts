import { ipcMain, Tray, app, Menu } from 'electron'

import trayIcon from '../../../resources/trayIcon.png?asset'

export function registerWindowOperation(mainWindow) {
  ipcMain.on('window-min', () => {
    !mainWindow.isMinimized() && mainWindow.minimize()
  })
  ipcMain.on('window-max', () => {
    !mainWindow.isMaximized() && mainWindow.maximize()
  })
  ipcMain.on('window-restore', () => {
    mainWindow.restore()
  })
  ipcMain.on('window-close', () => {
    mainWindow.close()
  })
}

export function createTray(mainWindow) {
  console.log('------------创建托盘------------')
  const trayTemplate = [
    {
      label: '显示',
      click: () => {
        if (!mainWindow) return
        if (mainWindow.isMinimized()) mainWindow.restore()
      }
    },
    // {
    //   type: 'separator'
    // },
    {
      label: '退出',
      click: () => {
        if (!mainWindow) return
        app.quit()
      }
    }
  ]
  const contextMenu = Menu.buildFromTemplate(trayTemplate)
  const tray = new Tray(trayIcon)
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    // 双击通知区图标实现应用的显示或隐藏
    if (!mainWindow) return
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })
  tray.setToolTip(app.name)
}
