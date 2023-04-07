<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell class="edit-cell" :border="false">
      <div slot="title" class="text">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in channels"
        :key="channel.id"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fixedChannel.includes(channel.id)"
          slot="icon"
          name="close"
        ></van-icon>
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
        v-for="rechannel in recommendChannels"
        :key="rechannel.id"
        :text="rechannel.name"
        @click="onAddChannel(rechannel)"
      />
    </van-grid>
    <!-- /频道编辑 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { addUserChannelAPI, deleteUserChannelAPI } from '@/api/channelAPI.js'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      // 控制编辑状态的显示
      isEdit: false,
      // 固定频道，不允许删除
      fixedChannel: [0, 1]
    }
  },
  props: {
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    // 所有频道
    ...mapState(['user', 'allchannels', 'channels']),
    // 推荐频道=所有频道-用户频道
    recommendChannels() {
      return this.allchannels.filter((allchannel) => {
        return !this.channels.find((channel) => {
          return channel.id === allchannel.id
        })
      })
    }
  },
  created() {
    this.$store.dispatch('getUserChannels')
    this.$store.dispatch('getAllChannels')
  },
  methods: {
    ...mapActions(['getUserChannels', 'getAllChannels']),
    async onAddChannel(rechannel) {
      this.channels.push(rechannel)
      // 数据持久化
      if (this.user) {
        // 用户已登录，请求接口存储
        try {
          await addUserChannelAPI({
            id: rechannel.id, // 用户频道ID
            seq: this.channels.length // 序号
          })
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 用户未登录，本地存储
        setItem('TOUTIAO-CHANNELS', this.channels)
      }
    },
    // 点击我的频道项，触发的方法
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 1.如果是固定频道项，不能删除
        if (this.fixedChannel.includes(index)) {
          return
        }
        // 2.如果删除active前面的元素，需要添加自定义事件传值
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1)
        }
        // 3.删除频道项
        this.channels.splice(index, 1)
        // 4.数据持久化
        this.deleteChannel(channel)
      } else {
        // 切换频道项
        this.$emit('update-active', index, false)
      }
    },
    // 删除用户频道
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 用户已登录，请求接口存储
          await deleteUserChannelAPI(channel.id)
        } else {
          // 用户未登录，本地存储
          setItem('TOUTIAO-CHANNELS', this.channels)
        }
      } catch (error) {
        this.$toast('删除频道失败，请稍后重试')
      }
    }
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
    .van-grid-item__icon-wrapper {
      position: unset;
    }
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
