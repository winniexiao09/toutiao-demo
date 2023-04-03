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
