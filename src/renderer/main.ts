import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 设置为中文语言

// createApp(App).mount('#app')
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
