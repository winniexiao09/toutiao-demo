<template>
  <div class="follow-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getUserFollowingAPI } from '@/api/userAPI.js'
export default {
  name: 'FollowList',
  data() {
    return {
      // 存储列表数据数组
      list: [],
      page: 1,
      loading: false, // 控制加载中loading的状态
      finished: false, // 控制数据加载结束的状态
      error: false // 控制列表加载失败的提示状态
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      try {
        const { data: res } = await getUserFollowingAPI({
          page: this.page,
          per_page: 10
        })
        console.log(res)

        // 模拟随即失败的情况
        // if (Math.random > 0.1) {
        //   JSON.parse('dnkffdwejin')
        // }

        // 2.把请求结果数据放到list数组中
        const { results } = res.data
        this.list.push(...results)

        // 3.本次数据加载结束后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        // 展示错误提示状态
        this.error = true
        // 请求失败了，loading也需要关闭
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
