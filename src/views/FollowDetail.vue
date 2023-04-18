<template>
  <div class="follow-detail">
    <!--  tab标签 -->
    <van-tabs v-model="active">
      <van-icon slot="nav-left" name="arrow-left"></van-icon>
      <van-tab title="关注">
        <!-- 关注列表 -->
        <FollowList></FollowList>
      </van-tab>
      <van-tab title="粉丝">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import FollowList from '@/components/FollowDetail/FollowList.vue'
export default {
  name: 'FollowDetail',
  data() {
    return {
      active: 0
    }
  },
  created() {},
  methods: {},
  components: { FollowList }
}
</script>

<style lang="less" scoped>
</style>
