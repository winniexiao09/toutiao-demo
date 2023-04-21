import request from '@/utils/request.js'

// 获取评论或评论回复
export const getCommentAPI = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
// 对评论或评论回复点赞
export const addCommentLikeAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消对评论或评论回复点赞
export const deleteCommentLikeAPI = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 发布评论,对文章或者评论进行评论
export const addCommentAPI = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
