<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api/articleAPI.js'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 存储列表数据数组
      list: [],
      loading: false, // 控制加载中loading的状态
      finished: false, // 控制数据加载结束的状态
      error: false //
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      const data = await getArticlesAPI()
      console.log(data)
      // 2.把请求结果数据放到list数组中
      // 3.本次数据加载结束后要把加载状态设置为结束
      // 4.判断数据是否全部加载完成
    }
  }
}
</script>

<style lang="less" scoped></style>
