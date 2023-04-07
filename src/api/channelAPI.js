// 频道请求模块
import request from '@/utils/request.js'

// 请求获取所有频道
export const getAllChannelsAPI = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 请求添加用户频道
export const addUserChannelAPI = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除用户指定频道
export const deleteUserChannelAPI = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
