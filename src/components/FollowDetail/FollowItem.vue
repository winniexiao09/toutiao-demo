<template>
  <van-cell class="follow-item" center>
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="follow.photo"
    />
    <div slot="title" class="name">{{ follow.name }}</div>
    <div slot="label" class="fans-count">粉丝数: {{ follow.fans_count }}</div>
    <van-button v-if="this.active === 0" class="follow-btn" type="default">{{
      follow.mutual_follow ? '互相关注' : '已关注'
    }}</van-button>
    <van-button
      v-else-if="this.active === 1"
      class="follow-btn"
      :class="{ fans: !follow.mutual_follow }"
      type="default"
      @click="addfollow"
      >{{ follow.mutual_follow ? '互相关注' : '关注' }}</van-button
    >
  </van-cell>
</template>

<script>
import { addFollowAPI } from '@/api/userAPI'
export default {
  name: 'FollowItem',
  props: {
    // 每个关注的用户信息
    follow: {
      type: Object,
      required: true
    },
    active: {
      type: Number,
      default: 0
    }
  },
  methods: {
    async addfollow() {
      try {
        if (this.follow.mutual_follow === false) {
          // 如果没有关注,关注对方
          await addFollowAPI(this.follow.id)
          this.follow.fans_count++
        }
        // 更新视图
        this.follow.mutual_follow = true
      } catch (error) {
        this.$toast.fail('操作失败,请重试!')
      }
    },
    async deletefollow() {
      try {
      } catch (err) {
        this.$toast.fail('操作失败,请重试!')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follow-item {
  .avatar {
    width: 123px;
    height: 123px;
    margin-right: 25px;
  }
  .name {
    font-size: 28px;
    color: #222;
  }
  .fans-count {
    font-size: 23px;
    color: #999;
  }
  .follow-btn {
    height: 54px;
    line-height: 54px;
    font-size: 23px;
    color: #999;
  }
  .fans {
    background-color: #f85959;
    color: #fff;
  }
}
</style>
