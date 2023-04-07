<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 添加form是为了在手机上显示搜索按钮 -->
    <form action="/">
      <van-search
        class="search-ipt"
        v-model="searchText"
        show-action
        background="#F4F5F6"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果  -->
    <SearchResult v-if="isResultShow"></SearchResult>
    <!-- 搜索结果  -->
    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText"></SearchSuggestion>
    <!-- 联想建议 -->
    <!-- 历史记录 -->
    <SearchHistory v-else></SearchHistory>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import SearchHistory from '@/components/Search/SearchHistory.vue'
import SearchSuggestion from '@/components/Search/SearchSuggestion.vue'
import SearchResult from '@/components/Search/SearchResult.vue'

export default {
  name: 'SearchView',
  data() {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  methods: {
    onSearch(val) {
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  },
  components: { SearchHistory, SearchSuggestion, SearchResult }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
  .search-ipt {
    background-color: #3296fa !important;
  }
}
</style>
