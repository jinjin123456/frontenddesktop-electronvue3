import { createI18n } from 'vue-i18n'
import en from './packages/en.json'
import zh from './packages/zh.json'

export default createI18n({
  legacy: false, // 解决Not available in legacy mode报错
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: 'zh',
  // locale: 'en', // TODO - 设置locale变量，允许用户侧切换
  messages: {
    en,
    zh
  }
})
