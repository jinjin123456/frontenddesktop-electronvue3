import { registerWindowOperation } from './winOperation'

// 主进程挂载相关工具方法
const initUtils = (mainWindow) => {
  registerWindowOperation(mainWindow)
}

export default initUtils
