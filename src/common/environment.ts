// 这里区分环境，提供统一调用，无需单独区分环境使用
/**
 * 运行环境
 * @returns
 */
export function detectEnvironment() {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    return 'browser'
  }
  // Node.js 环境
  return 'node'
}
/**
 * 记录socket事件日志
 * @param action 日志动作
 * @param args 日志参数
 */
export function eventLogger(action: string, ...args: any[]) {
  const isBrowser = detectEnvironment() === 'browser'
  if (isBrowser) {
    const { ipcRenderer } = window.require('electron')
    ipcRenderer.send('socketEvent', action, {
      hash: window.location.hash,
      ...args
    })
  } else {
    const EventEmitterBus = require('@/main/nodeFn/nodeEventEmitter')
    EventEmitterBus.emit('socket-event', action, {
      ...args
    })
  }
}

let ENV_PATH: string
let CONFIG_PATH: string
let ENV_DATA: any
let CONFIG_DATA: any
/**
 * 获取配置文件数据
 */
export function getConfigData() {
  // 避免多次读文件
  if (ENV_PATH && CONFIG_PATH && ENV_DATA && CONFIG_DATA) {
    return {
      ENV_DATA,
      CONFIG_DATA,
      ENV_PATH,
      CONFIG_PATH
    }
  }
  const isBrowser = detectEnvironment() === 'browser'
  const { app } = isBrowser ? window.require('@electron/remote') : require('electron')
  const fs = isBrowser ? window.require('fs') : require('fs')
  const path = app.getAppPath()
  const pathArr = path.split('resources')

  if (process.env.NODE_ENV === 'development') {
    ENV_PATH = `${pathArr[0]}\\bundled\\config\\env.json`
    CONFIG_PATH = `${pathArr[0]}\\bundled\\config\\conf.json`
  } else {
    ENV_PATH = `${pathArr[0]}config\\env.json`
    CONFIG_PATH = `${pathArr[0]}\\config\\conf.json`
  }
  ENV_DATA = JSON.parse(fs.readFileSync(ENV_PATH, 'utf8') || '{}')
  CONFIG_DATA = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8') || '{}')
  return { ENV_DATA, CONFIG_DATA, ENV_PATH, CONFIG_PATH }
}
