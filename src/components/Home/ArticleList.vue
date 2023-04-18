<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
          @click="$router.push('')"
        ></ArticleItem>
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api/articleAPI.js'
import ArticleItem from '@/components/Home/ArticleItem.vue'
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
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isRefreshLoading: false, // 控制下拉刷新的加载状态
      refreshSuccessText: ''
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 这个是渠道ID
          timestamp: this.timestamp || Date.now() // 这是时间戳
        })
        // 模拟随即失败的情况
        // if (Math.random > 0.1) {
        //   JSON.parse('dnkffdwejin')
        // }

        // 2.把请求结果数据放到list数组中
        const { results } = data.data
        this.list.push(...results)

        // 3.本次数据加载结束后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        // 展示错误提示状态
        this.error = true
        // 请求失败了，loading也需要关闭
        this.loading = false
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      //  1.请求获取数据
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 这个是渠道ID
          timestamp: Date.now() // 下拉刷新，每次请求最新数据
        })
        // if (Math.random >= 0.1) {
        //   JSON.parse('dnkffdwejin')
        // }
        //  2.将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        //  3.关闭下拉刷新的loading状态
        this.isRefreshLoading = false
        // 4.更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
      } catch (error) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  },
  components: { ArticleItem }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>
