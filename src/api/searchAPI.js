import request from '@/utils/request.js'

// 获取联想建议数据列表
export const getSearchSuggestionsAPI = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getSearchResultAPI = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
