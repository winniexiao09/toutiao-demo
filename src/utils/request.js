// 封装axios请求模块
import axios from 'axios'
import store from '@/store/index.js'
import jsonBig from 'json-bigint'

// const json = '{ "value" : 9223372036854775807, "v2": 123 }'

// console.log(jsonBig.parse(json))

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  transformResponse: [function(data) {
    try {
      return jsonBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})
// 配置请求拦截器
request.interceptors.request.use(
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
