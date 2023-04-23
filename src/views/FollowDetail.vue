<template>
  <div class="follow-detail">
    <van-icon class="follow-left" name="arrow-left" @click="$router.back()" />
    <van-tabs v-model="active" animated @click="onclick">
      <van-tab title="关注"> </van-tab>
      <van-tab title="粉丝"> </van-tab>
    </van-tabs>
    <!-- 展示列表的组件 -->
    <FollowList :active="active"></FollowList>
  </div>
</template>

<script>
import FollowList from '@/components/FollowDetail/FollowList.vue'
export default {
  name: 'FollowDetail',
  data() {
    return {
      active: Number(this.$route.query.active || 0)
    }
  },
  created() {},
  methods: {
    onclick() {
      this.$router.replace('/followDetail?active=' + this.active)
    }
  },
  components: { FollowList }
}
</script>

<style lang="less" scoped>
.follow-detail {
  .follow-left {
    position: fixed;
    top: 28px;
    left: 20px;
    z-index: 2;
    font-size: 30px;
    color: #fff;
  }

  /deep/ .van-tabs__nav {
    padding: 0 130px;
    background-color: #3296fa !important;
  }
  /deep/ .van-tab {
    color: #fff;
    font-size: 30px;
  }
  /deep/ .van-tabs__nav--line {
    padding-bottom: 0;
  }
  /deep/ .van-tabs__line {
    bottom: 8px;
    width: 70px;
    height: 6px;
    background-color: #fff;
  }
}
</style>
