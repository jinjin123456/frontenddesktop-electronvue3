import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const path = require('path')

// Custom APIs for renderer
const api = {
  ENV_CONFIG: require('dotenv').config({
    path: path.join(__dirname, `../../env/${process.env.ENV_CONFIG || 'dev'}.env`)
  })
}

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
