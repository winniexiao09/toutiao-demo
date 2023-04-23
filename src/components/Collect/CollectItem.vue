<template>
  <van-cell class="collect-item">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ collect.title }}
    </div>
    <div slot="label">
      <div v-if="collect.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in collect.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info">
        <span>{{ collect.aut_name }}</span>
        <span>{{ collect.pubdate | FormatTime }}</span>
      </div>
    </div>
    <van-image
      v-if="collect.cover.type === 1"
      class="cover-right"
      slot="default"
      fit="cover"
      :src="collect.cover.images[0]"
    ></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'CollectItem',
  props: {
    // 每一个收藏项的信息
    collect: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.collect-item {
  .title {
    color: #3a3a3a;
    font-size: 32px;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
