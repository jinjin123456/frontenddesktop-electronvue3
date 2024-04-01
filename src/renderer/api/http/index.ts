import axios from 'axios'
import qs from 'qs'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { resultMap } from '@/types/index'
// 创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/json'
// // 最高管理员
// axios.defaults.headers.tenantId = '226'
// axios.defaults.headers['current-tenant'] = '226'
// axios.defaults.headers.userId = '55'
// axios.defaults.headers['user-info'] = '%7B%22hasPassword%22%3Afalse%2C%22id%22%3A55%2C%22userOwnedPath%22%3A%5B%5D%7D'
// 非最高管理员
// axios.defaults.headers.tenantId = '796'
// axios.defaults.headers['current-tenant'] = '796'
// axios.defaults.headers.userId = '104'
// axios.defaults.headers['user-info'] = '%7B%22hasPassword%22%3Afalse%2C%22id%22%3A104%2C%22userOwnedPath%22%3A%5B%5D%7D'
let once = false
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 60000 // 请求超时时间
})
// 抛异常
const throwError = (message: string) => {
  ElMessage.error(message || '服务异常！')
}

// request
service.interceptors.request.use(
  // (config: AxiosRequestConfig) => {
  (config: any) => {
    if (
      config.data instanceof FormData &&
      config.data.get &&
      config.data.get('file') instanceof File
    ) {
      ;(config as any).headers['Content-Type'] = 'multipart/form-data;charset=UTF-8'
      config.timeout = 60000
    }
    config.withCredentials = false // 表示跨域请求时是否需要使用凭证
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// response
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const responseData = response.data || {}
    const { code } = responseData
    const message = responseData.message || '服务异常！'
    // 下载文件
    if (responseData instanceof Blob) {
      return responseData
    }
    if (code !== '000000') {
      // 004010001 cookie认证失败不需要error提示，001001001没有cookie或者网络问题，路由重定向到官网login
      if (code === '004010001' || code === '001001001' || code === '401') {
        if (once) {
          return
        }
        once = true
        ElMessageBox.confirm('您的登录状态已过期或者网络异常，请重新登录', '提示', {
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: '去登录',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          showClose: false
        })
          .then(() => {
            const { href } = window.location
            window.location.replace('/login?redirect=' + href)
            // window.reload()
          })
          .catch(() => {})
      } else {
        throwError(message)
      }
      return Promise.reject({ code, message })
    }
    return responseData
  },
  (error) => {
    const { code } = error
    const message = '服务异常！'
    code !== 'ERR_CANCELED' && throwError(message)
    return Promise.reject({ code, message: message })
  }
)
const http = {
  get: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => {
    console.log('地址', url, data)
    return new Promise<resultMap>((resolve, reject) => {
      service
        .get(data ? `${url}?${qs.stringify(data)}` : url, config)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  post: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => {
    return new Promise<resultMap>((resolve, reject) => {
      service
        .post(url, data, config)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  posturl: (url: string, params?: any, config?: AxiosRequestConfig) => {
    return new Promise<resultMap>((resolve, reject) => {
      service
        .request({
          url: url,
          method: 'post',
          params: params,
          ...config
        })
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  postForm: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => {
    const customConfig = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [
        function () {
          let ret = ''
          for (const it in data) {
            if (data[it] === null || data[it] === undefined) data[it] = ''
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ]
    }
    return new Promise((resolve, reject) => {
      service
        .request({
          url: url,
          method: 'post',
          ...config,
          ...customConfig
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  getBlob: (url: string, params?: any, config?: AxiosRequestConfig): Promise<any> => {
    return new Promise<resultMap>((resolve, reject) => {
      service
        .request({
          url: url,
          method: 'get',
          params: {
            loading: false,
            toast: false,
            ...params
          },
          responseType: 'blob',
          ...config
        })
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default http
