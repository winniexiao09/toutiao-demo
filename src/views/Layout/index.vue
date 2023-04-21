<template>
  <div class="layout-container">
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>

    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"> </router-view>

    <van-tabbar fixed placeholder route>
      <van-tabbar-item :to="{ name: 'home' }">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  i.toutiao {
    font-size: 40px;
  }
  .text {
    font-size: 20px;
  }
}
</style>
