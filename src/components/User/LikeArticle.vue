<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value === 1 }"
    :loading="loading"
    @click="onLike"
  ></van-button>
</template>

<script>
import { addLikeAPI, deleteLikeAPI } from '@/api/articleAPI.js'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onLike() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，需要点击取消点赞
          await deleteLikeAPI(this.articleId)
        } else {
          // 没有点赞，需要点击点赞
          await addLikeAPI(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  /deep/ .van-icon {
    color: #e5645f;
  }
}
</style>
