// 封装axios请求模块
import axios from 'axios'
import store from '@/store/index.js'
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  transformResponse: [
    (data) => {
      try {
        return jsonBig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})
// 配置请求拦截器
axios.interceptors.request.use(
  (config) => {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 配置响应拦截器
export default request
