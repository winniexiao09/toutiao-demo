<template>
  <div class="search-result">
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
import { getSearchResultAPI } from '@/api/searchAPI.js'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  methods: {
    async onLoad() {
      /*  1.请求获取数据
      2.将数据添加到数组中
      3.将本次加载中的loading结束
      4.判断是否还有数据，如果有，更新获取下一个数据的页码；如果没有，将加载状态finished设为结束 */
      try {
        const { data: res } = await getSearchResultAPI({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        console.log(res)
        const { results } = res.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  height: 100vh;
  overflow-y: auto;
}
</style>
