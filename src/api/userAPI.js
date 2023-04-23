import request from '@/utils/request.js'

// 获取登录数据
export const userLoginAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 获取短信验证码接口
export const sendSmsAPI = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己信息
export const userInfoAPI = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}
// 获取用户频道列表
export const getUserChannelsAPI = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 关注用户
export const addFollowAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
export const deleteFollowAPI = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
// 获取用户关注列表
export const getUserFollowAPI = params => {
  return request({
    method: 'GET',
    url: '/v1_0/user/followings',
    params
  })
}
// 获取用户粉丝列表
export const getUserFansAPI = params => {
  return request({
    method: 'GET',
    url: '/v1_0/user/followers',
    params
  })
}
// 获取用户收藏列表
export const getUserCollectAPI = params => {
  return request({
    method: 'GET',
    url: '/v1_0/article/collections',
    params
  })
}
// 获取用户阅读历史列表
export const getUserHistoriesAPI = params => {
  return request({
    method: 'GET',
    url: '/v1_0/user/histories',
    params
  })
}
