import { registerWindowOperation, createTray } from './winOperation'

// 主进程挂载相关工具方法
const initUtils = (mainWindow) => {
  registerWindowOperation(mainWindow)
  createTray(mainWindow)
}

export default initUtils
