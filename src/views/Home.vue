<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        type="info"
        size="mini"
        round
        slot="title"
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表区域 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable border>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 插入文章列表组件 -->
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <!-- 插槽可以有多个 -->
      <div class="placeholder" slot="nav-right"></div>
      <div
        @click="isChannelEditShow = true"
        class="hamburger-btn"
        slot="nav-right"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表区域 -->
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit :active="active"></ChannelEdit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ArticleList from '@/components/Home/ArticleList.vue'
import ChannelEdit from '@/components/Home/ChannelEdit.vue'
export default {
  name: 'HomeView',
  data() {
    return {
      active: 0,
      // 控制编辑频道弹出层的状态
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['channels'])
  },
  created() {
    this.$store.dispatch('getUserChannels')
  },
  methods: {
    ...mapActions(['getUserChannels'])
  },
  components: { ArticleList, ChannelEdit }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 558px;
    height: 67px;
    background-color: #5babfb;
    font-size: 28px;
    color: #fff;
    border: none;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  // 导航栏结束
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 28px;
      color: #777;
    }
    .van-tab--active {
      font-size: 30px;
      color: #333;
    }
    .van-tabs__nav--line {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 35px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(../assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
