import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@renderer': resolve('src/renderer')
      }
    },
    plugins: [vue(), vueJsx()],
    css: {
      preprocessorOptions: {
        scss: {
          // 注入样式变量（根据自己需求注入其他）
          additionalData: `@import "./src/renderer/assets/scss/variables.scss";
          @import "./src/renderer/assets/scss/var-class.scss";`
        }
      }
    },
    build: {
      rollupOptions: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        output: {
          manualChunks: {
            // 把组件按组分块打包 动态导入
            homeUI: [
              './src/renderer/views/home/pages/UI/form.vue',
              './src/renderer/views/home/pages/UI/useTable.vue'
            ]
          }
        }
      }
    }
  }
})
