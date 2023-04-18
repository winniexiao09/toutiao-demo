<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <!-- 用户信息 -->
      <div class="base-info">
        <div class="left">
          <van-image round fit="cover" class="avatar" :src="userInfo.photo" />
          <span class="username">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <!-- 用户数据 -->
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{ userInfo.art_count }}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item" @click="$router.push('/followdetail')">
          <div class="count">{{ userInfo.follow_count }}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.fans_count }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.like_count }}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->
    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->

    <!-- 宫格导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->
    <!-- 单元格导航 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      @click="onLogout"
      v-if="user"
      class="logout-btn"
      title="退出登录"
      clickable
    />
    <!-- /单元格导航 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userInfoAPI } from '@/api/userAPI.js'
export default {
  name: 'MyView',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    if (this.user) {
      this.getUserInfo()
    }
  },
  methods: {
    onLogout() {
      // 退出登录提示
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // 确认退出，要清除登录状态（包括容器中的user和本地存储中的user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {})
    },
    async getUserInfo() {
      try {
        const { data: res } = await userInfoAPI()
        this.userInfo = res.data
      } catch (err) {
        this.$toast.fail('获取数据失败,请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .username {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
  .grid-nav {
    margin-bottom: 7px;
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        color: #333;
        font-size: 28px;
      }
    }
  }
  .logout-btn {
    margin-top: 7px;
    text-align: center;
    color: #eb5253;
    font-size: 30px;
  }
}
</style>
