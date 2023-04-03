// 文章请求模块
import request from '@/utils/request.js'

// 请求获取文章列表数据
export const getArticlesAPI = () => {
  return request.get('/v1_0/articles')
}
