const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 引入插件不使用时不报报错
  configureWebpack: {
    externals: {
      'electron': 'require("electron")'
    },
  },

  // 第三方插件配置
  pluginOptions: {
    // vue-cli-plugin-electron-builder 配置
    electronBuilder: {
      nodeIntegration: true,
      // 设置应用主进程的入口
      mainProcessFile: 'src/background.js',
      // 设置应用渲染进程的入口
      rendererProcessFile: 'src/main.js',
      customFileProtocol: '../',
      // 打包选项
      builderOptions: {
        appId: 'com.ajin.vue3', // 设置软件id，解决的问题：在安装到电脑后，系统通知无法工作; appId/guid需保持一致
        productName: 'wrjinElectronVue3', // 设置打包后的名称，也是生成的安装文件名，即wrjinElectronVue3.exe
        directories: {
          output: './dist'// 输出文件路径
        },
        // windows系统相关配置
        win: {
          icon: './src/assets/icon.png', // 应用图标路径（Windows 系统中 icon 需要 256 * 256 的 ico 格式图片）
          target: {
            target: 'nsis',
            // 支持 64 位和 32 位的 Windows 系统
            // arch: ['x64', 'ia32'],
            // 仅支持 32 位的 Windows 系统
            arch: 'x64',
          },
        },
        nsis: {
          // 如果为false，想要给电脑所有用户安装必须使用管理员权限
          allowElevation: true,
          // 是否一键安装
          oneClick: false,
          // 允许修改安装目录
          allowToChangeInstallationDirectory: true,
          'guid': 'com.ajin.vue3', // 软件id
          'include': './installer.nsh' // 如果需要热更新的话；这个文件一定要配置，不然在卸载/更新后安装软件安装不上；主要原因注册机的问题
        },
        // publish: [
        //   // 热更新相关
        //   {
        //       provider: "generic",
        //       url: 'https:', // 打包文件地址,与以上链接需相同
        //   },
        // ],      
      },
    },
  },
})

