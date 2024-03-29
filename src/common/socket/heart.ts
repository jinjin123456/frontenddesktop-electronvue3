// 该模块兼容浏览器和nodejs环境
type Timout = number | NodeJS.Timeout
/**
 * 心跳基类
 */
class Heart {
  readonly timeout: number

  private HEART_TIMEOUT: Timout = 0 // 心跳计时器

  private SERVER_HEART_TIMEOUT: Timout = 0 // 心跳计时器

  constructor() {
    this.timeout = 5000
  }

  // 重置
  reset() {
    clearTimeout(this.HEART_TIMEOUT)
    clearTimeout(this.SERVER_HEART_TIMEOUT)
    return this
  }

  // 启动心跳
  start(cb: any) {
    if (!cb) return false
    this.HEART_TIMEOUT = setTimeout(() => {
      cb()
      this.SERVER_HEART_TIMEOUT = setTimeout(() => {
        cb()
        // 重新开始检测
        this.reset().start(cb())
      }, this.timeout)
    }, this.timeout)
  }
}

export { Heart }
