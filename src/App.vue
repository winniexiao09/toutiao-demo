<template>
  <div id="app">
    <p>App根组件</p>
    <div class="happy">我今天很开心</div>
    <i class="toutiao toutiao-dianzan"></i>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
.happy {
  width: 200px;
  height: 100px;
  background-color: pink;
  font-size: 14px;
}
</style>
