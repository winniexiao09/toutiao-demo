import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置处理相对时间的插件
dayjs.extend(relativeTime)

// dayjs默认语言是英文,我们这里配置为中文
dayjs.locale('zh-cn') // 全局使用

// dayjs()获取当前最新时间
// console.log(dayjs().format('YYYY/MM/DD hh:mm:ss'))

// 定义一个处理相对时间的过滤器

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
