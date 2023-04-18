<template>
  <van-button
    v-if="isFollowed"
    @click="onFollow"
    round
    :loading="loading"
    loading-type="spinner"
    type="info"
    size="small"
    color="#3296fa"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    @click="onFollow"
    round
    :loading="loading"
    loading-type="spinner"
    icon="plus"
    type="info"
    size="small"
    color="#3296fa"
    >关注</van-button
  >
</template>

<script>
import { addFollowAPI, deleteFollowAPI } from '@/api/userAPI.js'
export default {
  data() {
    return {
      loading: false
    }
  },
  // 自定义v-model的数据名称
  model: {
    prop: 'isFollowed', // 默认是value
    event: 'update-isfollowed' // 默认是input
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    authorId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onFollow() {
      // 展示关注按钮的loading状态
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注，点击取消关注
          await deleteFollowAPI(this.authorId)
        } else {
          // 没有关注，点击添加关注
          await addFollowAPI(this.authorId)
        }
        this.$emit('update-isfollowed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      // 关闭关注按钮的loading状态
      this.loading = false
    }
  }
}
</script>

<style>
</style>
