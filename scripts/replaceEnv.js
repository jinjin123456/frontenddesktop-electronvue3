/** @format */
/**
 * 自动替换dist_electron下的env.json为public/config下的env.json
 */
const fs = require('fs')
const path = require('path')
const { forEach } = require('lodash')

const envPath = path.join(__dirname, '../package/config/env.json')
const distElectronPath = path.join(__dirname, '../dist_electron')

const ENV_SUFFIX = {
  development: 'dev',
  test: 'test',
  prerelease: 'pre',
  production: 'www'
}

const envSuffix = ENV_SUFFIX[process.env.CONFIG_ENV]
const regexEnvSuffix = Object.values(ENV_SUFFIX).join('|')

function copyDir(src, dest) {
  // 创建目标目录
  fs.mkdirSync(dest, { recursive: true })

  // 读取源目录中的文件和子目录
  const entries = fs.readdirSync(src, { withFileTypes: true })

  // 遍历所有条目
  entries.forEach((entry) => {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    // 如果是文件，则直接复制
    if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath)
    } else if (entry.isDirectory()) {
      // 如果是子目录，则递归调用copyDir函数
      copyDir(srcPath, destPath)
    }
  })
}

function replaceEnv(obj) {
  const regex = new RegExp(`(https?:\\/\\/|wss:\\/\\/)${regexEnvSuffix}\\.iflyrpa\\.com`, 'g')

  forEach(obj, (value, key) => {
    if (typeof value === 'string') {
      obj[key] = value.replace(regex, `$1${envSuffix}.iflyrpa.com`)
    } else if (typeof value === 'object') {
      replaceEnv(value)
    }
  })
}

fs.stat(envPath, (err) => {
  if (err) throw Error('/package/config/env.json 文件不存在请检查')

  fs.stat(distElectronPath, (err1) => {
    if (err1) throw Error('请先执行 npm run electron:build')
    const originPath = path.join(__dirname, '../package/config')
    const targetPath = path.join(__dirname, '../dist_electron/bundled/config')

    copyDir(originPath, targetPath)

    if (!envSuffix) return

    // 读取env.json文件
    const envJson = fs.readFileSync(envPath, 'utf8')
    const envJsonObj = JSON.parse(envJson)
    // 替换env.json中的变量
    replaceEnv(envJsonObj)
    // 将替换后的内容写入env.json文件
    fs.writeFileSync(path.join(targetPath, 'env.json'), JSON.stringify(envJsonObj, null, 2))
  })
})
