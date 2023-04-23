<template>
  <div class="collect-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
      @load="onLoad"
    >
      <CollectItem
        v-for="(item, index) in list"
        :key="index"
        :collect="item"
      ></CollectItem>
    </van-list>
  </div>
</template>

<script>
import { getUserCollectAPI, getUserHistoriesAPI } from '@/api/userAPI.js'
import CollectItem from '@/components/Collect/CollectItem.vue'
export default {
  name: 'CollectList',
  components: { CollectItem },
  props: {
    active: {
      type: Number,
      required: true
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
      // if (this.loading === true) return
      this.loading = true
      // 1.请求获取数据
      const params = { page: this.page, per_page: 10 }
      try {
        const { data: res } =
          this.active === 0
            ? await getUserCollectAPI(params)
            : await getUserHistoriesAPI(params)
        console.log(res)
        // 2.把数据放到list列表里
        const { results, total_count: totalCount } = res.data
        this.list.push(...results)
        // 3.关闭loading加载状态
        this.loading = false
        // 4.判断是否还有更多数据,如果没有数据,把finnished改成true
        if (this.list.length < totalCount) {
          this.page++
        }
        this.finished = this.list.length >= totalCount
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
