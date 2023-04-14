<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#F4F5F6"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></SearchSuggestion>
    <!-- 历史记录 -->
    <SearchHistory
      :search-histories="searchHistories"
      @search="onSearch"
      @clear-search-histories="searchHistories = []"
      v-else
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from '@/components/Search/SearchHistory.vue'
import SearchSuggestion from '@/components/Search/SearchSuggestion.vue'
import SearchResult from '@/components/Search/SearchResult.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchView',
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('search-histories') || []
    }
  },
  watch: {
    searchHistories(newval) {
      setItem('search-histories', newval)
    }
  },
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 要求不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search {
    background: #3296fa !important;
  }
  /deep/ .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
