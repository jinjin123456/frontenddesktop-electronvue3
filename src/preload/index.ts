import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// const path = require('path')
const { env } = import.meta

// console.log("env", loadEnv(env.MODE, process.cwd() + '/env'))

// Custom APIs for renderer
const api = {
  // ENV_CONFIG: require('dotenv').config({
  //   path: path.join(__dirname, `../../env/${process.env.ENV_CONFIG || 'dev'}.env`)
  // })
}
// 验证环境变量是否生效
console.log('env', env)
// @ts-ignore (define in dts) TODO - ts类型智能提示
console.log('env.PRELOAD_VITE_API_URL', env.PRELOAD_VITE_API_URL)
// @ts-ignore (define in dts)
console.log('env.VITE_KEY', env.VITE_KEY)
// console.log("loadEnv", loadEnv(env.MODE, process.cwd() + '/env'))
console.log('process.env', process.env)
// console.log("ENV_CONFIG_PATH", path.join(__dirname, `../../env/${process.env.ENV_CONFIG || 'dev'}.env`))
// console.log("ENV_CONFIG", api.ENV_CONFIG)

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
