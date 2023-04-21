// 封装axios请求模块
import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router/index.js'
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
request.interceptors.response.use(function(response) {
  // 响应成功进入第1个函数
  // 该函数的参数是响应对象
  return response
}, async function(error) {
  // 响应失败进入第2个函数，该函数的参数是错误对象
  console.dir(error)
  if (error.response && error.response.status === 401) {
    // 校验是否有refresh_token
    const { user } = store.state
    if (!user || !user.refresh_token) {
    // 跳转到登录页面
      router.push('/login')
      return
    }
    // 如果有refresh_token，则请求获取新的token
    try {
      const res = await axios({
        method: 'PUT',
        url: 'http://toutiao.itheima.net/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log('刷新token成功', res)
      // 如果获取成功,把新的token更新到容器里
      store.commit('setUser', {
        token: res.data.data.token, // 最新获取的可用 token
        refresh_token: user.refresh_token // 还是原来的 refresh_token
      })
      // 把之前失败的用户请求继续发出去
      return request(error.config)
    } catch (error) {
      console.log('请求刷新token失败', error)
      router.push('/login')
    }
  }
  return Promise.reject(error)
})
export default request
