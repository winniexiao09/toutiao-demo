// 文章请求模块
import request from '@/utils/request.js'

// 请求获取文章列表数据
export const getArticlesAPI = (params) => {
  return request.get('/v1_0/articles', {
    params
  })
}

// 请求获取文章详情
export const getArticleDetailAPI = (articleId) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollectAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消收藏文章
export const deleteCollectAPI = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

// 对文章点赞
export const addLikeAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消对文章的点赞
export const deleteLikeAPI = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
