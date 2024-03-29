import { ipcMain } from 'electron'

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
