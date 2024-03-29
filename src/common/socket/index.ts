import { detectEnvironment, eventLogger } from '../environment'
import { Heart } from './heart'

interface SocketParamsType {
  url?: string
  port?: number
  noCreatRouters?: Array<string>
  noInitCreat?: boolean
  reconnectMaxTime?: number
  reconnectDelay?: number
  isReconnect?: boolean
  reconnectCount?: number
  heartTime?: number
  heartMsg: 'ping' // 心跳信息,默认为'ping'
  isDestory: false // 是否销毁
}
interface User {
  userName?: string
}

const CONNECTOR_STATUS = 1 // 连接状态
const ignorePath = ['event_tracking'] // 忽略的路径
const ignoreMsg = ['ping', 'pong'] // 忽略的消息

class Socket extends Heart {
  ws: any

  RECONNEC_TTIMER: number | NodeJS.Timeout = 0

  CALLBACK: any // 回调函数

  USER_INFO: User = {}

  OPTIONS = {
    url: 'ws://localhost',
    heartTime: 10 * 1000, // 心跳时间间隔 10s
    port: 8081, // 默认端口号
    heartMsg: 'ping', // 心跳信息,默认为'ping'
    isReconnect: true, // 是否自动重连
    isDestory: false, // 是否销毁
    reconnectDelay: 10 * 1000, // 重连时间间隔 10s
    reconnectCount: -1, // -1 无限重连 0
    reconnectMaxTime: 20,
    noCreatRouters: [],
    noInitCreat: false // 不在创建时初始化
  }

  constructor(router: string, params: SocketParamsType) {
    super()
    const port = params.port || this.OPTIONS.port
    const route = router || ''
    this.OPTIONS.url = `${this.OPTIONS.url}:${port}/${route}`
    if (params.url) {
      this.OPTIONS.url = params.url
    }
    Object.assign(this.OPTIONS, params)
    if (!params.noInitCreat) {
      this.create()
    }
  }

  /**
   * 建立连接
   */
  create(callback?: any, userInfo?: any) {
    const isBrowser = detectEnvironment() === 'browser'
    console.log(`创建socket:${this.OPTIONS.url} 环境:${detectEnvironment()}`)
    if (!this.OPTIONS.url) {
      throw Error('地址不存在，无法建立通道')
    }
    this.USER_INFO = userInfo || {}
    if (isBrowser) {
      this.USER_INFO.userName = localStorage.getItem('USERNAME') || ''
    }
    this.OPTIONS.isDestory = false
    delete this.ws
    const WebSocketAlias = isBrowser ? WebSocket : require('ws')
    this.ws = new WebSocketAlias(this.OPTIONS.url)

    this.onopen(callback)
    this.onclose()
    this.onmessage()
    this.onerror(callback)
    eventLogger('创建websocket', {
      url: this.OPTIONS.url,
      env: detectEnvironment()
    })
  }

  /**
   * 自定义连接成功事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onopen(callback?: any) {
    this.ws.onopen = (event: any) => {
      console.log('onopen: ', this.OPTIONS.url)
      const { userName } = this.USER_INFO
      clearTimeout(this.RECONNEC_TTIMER) // 清除重连定时器
      typeof callback === 'function' && callback(event)
      eventLogger('建立socket连接', {
        url: this.OPTIONS.url,
        userName
      })
    }
  }

  /**
   * 自定义关闭事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onclose(callback?: any) {
    if (this.ws) {
      this.ws.onclose = (event: any) => {
        console.log('onclose: ', this.OPTIONS.url)
        const { userName } = this.USER_INFO
        super.reset()
        if (!this.OPTIONS.isDestory && this.OPTIONS.isReconnect) {
          // 非主动销毁，且需要重连
          this.reconnect()
        }
        typeof callback === 'function' && callback(event)
        eventLogger('断开socket链接', {
          url: this.OPTIONS.url,
          userName,
          code: event.code,
          reason: event.reason
        })
      }
    }
  }

  /**
   * 自定义错误事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onerror(callback?: any) {
    this.ws.onerror = (event: any) => {
      console.log('onerror: ', this.OPTIONS.url)
      const { userName } = this.USER_INFO
      super.reset()
      typeof callback === 'function' && callback(event)
      eventLogger('socket链接失败', {
        url: this.OPTIONS.url,
        userName
      })
    }
  }

  /**
   * 自定义消息监听事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} CALLBACK 回调函数
   */
  onmessage() {
    this.ws.onmessage = (event: any) => {
      this.CALLBACK && this.CALLBACK(event.data)
      if (!this.ignoreLog(event.data)) {
        // 不记录心跳消息,不记录日志记录
        const { userName } = this.USER_INFO
        eventLogger('接收socket消息', {
          url: this.OPTIONS.url,
          userName,
          data: event.data
        })
      }
    }
  }

  bindMessage(callback?: any) {
    if (callback) {
      this.CALLBACK = callback
    }
  }

  send(data: Record<string, unknown>) {
    const text = JSON.stringify(data)
    if (!this.ws || this.ws.readyState !== this.ws.OPEN) {
      return console.error('没有连接到服务器，无法推送')
    }
    this.ws.send(text)
    if (!this.ignoreLog(text)) {
      eventLogger('发送socket消息', {
        url: this.OPTIONS.url,
        data: text
      })
    }
  }

  /**
   * 判断是否已连接
   */
  isConnect() {
    return this.ws && this.ws.readyState === CONNECTOR_STATUS
  }

  /**
   * 连接事件
   */
  reconnect() {
    if (this.OPTIONS.reconnectCount === 0 || !this.OPTIONS.isReconnect) {
      // 不重连
      clearTimeout(this.RECONNEC_TTIMER)
      this.OPTIONS.isDestory = true
      return
    }
    if (this.OPTIONS.isReconnect && this.OPTIONS.reconnectCount === -1) {
      // 不限重连 不记录重连日志
      this.RECONNEC_TTIMER = setTimeout(() => {
        this.create()
      }, this.OPTIONS.reconnectDelay)
      return
    }

    this.RECONNEC_TTIMER = setTimeout(() => {
      // 开始重连
      this.create()
    }, this.OPTIONS.reconnectDelay)

    eventLogger('重新连接socket', {
      url: this.OPTIONS.url,
      reconnectCount: this.OPTIONS.reconnectCount
    })
    this.OPTIONS.reconnectCount--
  }

  /**
   * 销毁
   */
  destroy() {
    super.reset()
    clearTimeout(this.RECONNEC_TTIMER) // 清除重连定时器
    this.OPTIONS.isDestory = true
    this.ws && this.ws.close()
    this.CALLBACK = null
    this.ws = null

    eventLogger('销毁socket', {
      url: this.OPTIONS.url,
      env: detectEnvironment()
    })
  }

  /**
   * 忽略心跳，日志记录接口信息
   */
  ignoreLog(msg: string) {
    const fitPath = ignorePath.find((i) => this.OPTIONS.url.includes(i))
    const fitMsg = ignoreMsg.find((j) => msg.includes(j))
    return fitPath || fitMsg
  }
}
export { Socket }
