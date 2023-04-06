<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell class="edit-cell" :border="false">
      <div slot="title" class="text">我的频道</div>
      <van-button class="edit-btn" size="mini" round>编辑</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in channels"
        :key="channel.id"
        icon="close"
      >
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->
    <!-- 频道编辑 -->
    <van-cell class="edit-cell" :border="false">
      <div slot="title" class="text">频道编辑</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="value in 8"
        :key="value"
        text="文字文字"
      />
    </van-grid>
    <!-- /频道编辑 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: {
    active: {
      type: Number,
      required: true
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
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .edit-cell {
    margin: 40px auto;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        margin-top: 0;
        font-size: 28px;
        color: #222;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .my-grid {
    .van-icon-close {
      position: absolute;
      top: -10px;
      right: -14px;
      font-size: 30px;
      z-index: 12;
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
    }
    .van-grid-item__icon {
      font-size: 24px;
    }
  }
}
</style>
