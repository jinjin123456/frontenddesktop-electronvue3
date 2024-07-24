import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/scss/app.scss'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'

//ElementPlus完整引入方式,此方式适合对打包后的文件大小不是很在乎的情况
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 设置为中文语言

import i18n from '../locales/index'

// createApp(App).mount('#app')
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(i18n)

app.mount('#app') //.mount() 方法应该始终在整个应用配置和资源注册完成后被调用
