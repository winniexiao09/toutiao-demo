<template>
  <div class="follow-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
      @load="onLoad"
    >
      <FollowItem
        v-for="(item, index) in list"
        :key="index"
        :follow="item"
        :active="active"
      ></FollowItem>
    </van-list>
  </div>
</template>

<script>
import { getUserFollowAPI, getUserFansAPI } from '@/api/userAPI.js'
import FollowItem from '@/components/FollowDetail/FollowItem.vue'
export default {
  name: 'FollowList',
  components: { FollowItem },
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
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
  // 因为切换tab时候,渲染展示的是一个list组件
  // 我们根据active的变化来判断切换了tab页
  // 如果切换了tab页,我们就要重新请求数据
  // 所以要监听active的变化,重新请求数据,而且把相关的数据重置
  watch: {
    active() {
      this.list = []
      this.page = 1
      this.loading = false
      this.finished = false
      this.error = false
      this.onLoad()
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      if (this.loading === true) return
      this.loading = true
      // 1.请求获取数据
      const params = { page: this.page, per_page: 10 }
      try {
        const { data: res } =
          this.active === 0
            ? await getUserFollowAPI(params)
            : await getUserFansAPI(params)

        // 2.把请求结果数据放到list数组中
        const { results } = res.data
        this.list.push(...results)
        // 3.本次数据加载结束后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length >= 10) {
          this.page++
        }
        this.finished = results.length < 10

        // 模拟随即失败的情况
        // if (Math.random > 0.1) {
        //   JSON.parse('dnkffdwejin')
        // }
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

<style lang="less" scoped></style>
