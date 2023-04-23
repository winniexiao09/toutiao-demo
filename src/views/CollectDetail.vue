<template>
  <div class="collect-detail">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      class="page-nav-bar"
      title="收藏/历史"
    />
    <!-- 标签页 -->
    <van-tabs
      v-model="active"
      @click="$router.replace(`/collectdetail?active=${active}`)"
    >
      <van-tab title="我的收藏"></van-tab>
      <van-tab title="我的历史"></van-tab>
    </van-tabs>
    <!-- 展示列表的组件 -->
    <CollectList :active="active"></CollectList>
  </div>
</template>

<script>
import CollectList from '@/components/Collect/CollectList.vue'
export default {
  name: 'CollectDetail',
  components: {
    CollectList
  },
  data() {
    return {
      active: Number(this.$route.query.active || 0)
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.collect-detail {
  /deep/ .van-nav-bar .van-icon {
    color: #fff;
    font-size: 30px;
  }
  /deep/.van-tab {
    color: #333;
  }
  /deep/ .van-tab--active {
    font-size: 30px;
    color: #3296fa;
  }
  /deep/ .van-tabs__nav--line {
    padding-bottom: 0;
  }
  /deep/ .van-tabs__line {
    bottom: 8px;
    width: 120px;
    height: 6px;
    background-color: #3296fa;
  }
}
</style>
