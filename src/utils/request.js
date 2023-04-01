// 封装axios请求模块
import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(
  (config) => {
    // config是本次请求的配置对象
    // config里有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 配置响应拦截器
export default request
