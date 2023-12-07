import axios from 'axios'
import qs from 'qs'
import { SUCCESS_CODE } from '@/config'
import { ElMessage } from 'element-plus'

// 1.创建axios实例
const service = axios.create({
    baseURL: '',
    timeout: 6000,
})

// 2.请求拦截器，用于添加修改统一的请求头
service.interceptors.request.use((config) => {
    if (
        config.data instanceof FormData &&
        config.data.get &&
        config.data.get('file') instanceof File
    ) {
        config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8'
        config.timeout = 6000
    }
    config.withCredentials = false // 表示跨域请求时是否需要使用凭证
    return config
}, (err) => {
    return Promise.reject(err)
})

// 3.响应拦截器，对响应状态码做统一处理，统一给出报错提示
service.interceptors.response.use((response) => {
    /*
    * responseData的结构主要是与后端协商好
    * 协商统一规定code成功码为'000000',其他code码均为异常
    * 数据结构协商为{ code: '', data: {}, message: '' }
    */
    const responseData = response.data || {}
    const { code, message = '服务异常' } = responseData
    if (code !== SUCCESS_CODE) {
        // 如果项目有登陆要求的话还需要判断登录状态，未登录的话就需要跳转到登陆页
        ElMessage.error(message)
        return Promise.reject({ code, message })
    }
    return responseData
}, (err) => {
    const message = err.message || '服务异常！'
    ElMessage.error(message)
    return Promise.reject({ code: err.code, message})
})

// 4.封装请求方法(可根据项目实际情况)
const http = {
    get: (url, params, config) => {
        return new Promise((resolve, reject) => {
            service.get(params ? `${url}?${qs.stringify(params)}` : url, config)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post: (url, data, config) => {
        return new Promise((resolve, reject) => {
            service.post(url, data, config)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    posturl: (url, params, config) => {
        return new Promise((resolve, reject) => {
            service.request({
                url,
                method: 'post',
                params,
                ...config
            })
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postFrom: (url, data, config) => {
        const customConfig = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: [
                function () {
                    let ret = ''
                    for (let it in data) {
                        if (data[it] === null || data[it] === undefined) data[it] = ''
                        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
                    }
                    return ret
                }
            ]
        }
        return new Promise((resolve, reject) => {
            service.request({
                url,
                method: 'post',
                ...config,
                ...customConfig
            })
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getBlob: (url, params, config) => {
        return new Promise((resolve, reject) => {
            service.request({
                url,
                method: 'get',
                params: {
                    loading: false,
                    toast: false,
                    ...params
                },
                responseType: 'blob',
                ...config
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

export default http