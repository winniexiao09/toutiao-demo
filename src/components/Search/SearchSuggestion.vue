<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <span slot="title" v-html="highlight(text)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '@/api/searchAPI.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      // 联想建议数据列表
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // handler(newval) {
      //   this.loadSearchSuggestions(newval)
      // },
      // eslint-disable-next-line space-before-function-paren
      handler: debounce(function (newval) {
        this.loadSearchSuggestions(newval)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data: res } = await getSearchSuggestionsAPI(q)
        console.log(res)
        this.suggestions = res.data.options
      } catch (error) {
        this.$toast('获取联想建议数据失败,请稍后重试')
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 //中间的内容都会当作匹配字符来使用,而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式, 则手动 new RegExp
      // RegExp 是正则表达式 构造函数
      // 参数1:匹配的字符串,它会根据这个字符串创建正则对象
      // 参数2:匹配模式,要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
