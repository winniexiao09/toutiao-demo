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
    <van-button class="follow-btn" type="default">{{
      follow.mutual_follow ? '互相关注' : '已关注'
    }}</van-button>
  </van-cell>
</template>

<script>
export default {
  name: 'FollowItem',
  props: {
    follow: {
      type: Object,
      required: true
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
}
</style>
