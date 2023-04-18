<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    :loading="loading"
    @click="onCollect"
  >
  </van-button>
</template>

<script>
import { addCollectAPI, deleteCollectAPI } from '@/api/articleAPI.js'
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，点击取消收藏
          await deleteCollectAPI(this.articleId)
        } else {
          // 没有收藏，点击添加收藏
          await addCollectAPI(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  /deep/ .van-icon {
    color: #ffa500;
  }
}
</style>
