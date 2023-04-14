<template>
  <div>
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else @click="isDeleteShow = true" name="delete-o" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onHistoryClick(item, index)"
    >
      <van-icon v-if="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data() {
    return {
      // 删除元素的显示状态
      isDeleteShow: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  computed: {},
  methods: {
    onHistoryClick(item, index) {
      // 如果是删除状态，执行删除操作
      if (this.isDeleteShow) {
        // 删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        // 执行搜索操作
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>
</style>
