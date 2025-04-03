import { ElectronAPI } from '@electron-toolkit/preload'

interface ImportMetaEnv {
  readonly MAIN_VITE_KEY: string
  readonly PRELOAD_VITE_API_URL: string
  readonly RENDERER_VITE_KEY: string
  readonly VITE_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: any
  }
}
