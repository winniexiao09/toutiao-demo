import request from '@/utils/request.js'

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
