<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中...</van-loading>
      </div>
      <!-- 加载完成，展示文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="username">{{ article.aut_name }}</div>
          <div slot="label" class="publishdate">{{ article.pubdate }}</div>
          <!-- 模板中的$event是事件参数 -->
          <!-- 关注按钮组件 -->
          <follow-user
            class="follow-btn"
            v-model="article.is_followed"
            :authorId="article.aut_id"
          />
        </van-cell>
        <!-- 文章内容 -->
        <div
          ref="article-content"
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" round type="default" size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" color="#777" badge="123" />
          <!-- 收藏文章组件 -->
          <CollectArticle
            v-model="article.is_collected"
            :article-id="article.art_id"
          ></CollectArticle>
          <!-- 对文章点赞组件 -->
          <LikeArticle
            v-model="article.attitude"
            :article-id="article.art_id"
          ></LikeArticle>
          <van-icon name="share" color="#777" />
        </div>
      </div>
      <!-- 加载失败:404 -->
      <div v-else-if="errStatus === 404" class="err-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- 加载失败:其他未知错误，例如网络原因或服务端异常 -->
      <div v-else class="err-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetailAPI } from '@/api/articleAPI.js'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/User/FollowUser.vue'
import CollectArticle from '@/components/User/CollectArticle.vue'
import LikeArticle from '@/components/User/LikeArticle.vue'
export default {
  name: 'Article',
  data() {
    return {
      loading: true,
      errStatus: 0,
      article: {}
    }
  },
  components: { FollowUser, CollectArticle, LikeArticle },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      try {
        const { data: res } = await getArticleDetailAPI(this.articleId)
        this.article = res.data
        // 数据驱动视图这件事不是立即的
        // setTimeout(()=>{},0) 会把要做的事情放在异步队列的最后面执行
        // 1.开启定时器，在获取数据并渲染到页面后，拿到DOM节点
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          // 2.调用图片预览展示的处理函数
          this.previewImage()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    previewImage() {
      // 1.得到所有的img DOM节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // 2.获取所有的img的src的节点
      const imgUrls = []
      imgs.forEach((img, index) => {
        imgUrls.push(img.src)
        // 3.给每个img注册点击事件，在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            images: imgUrls,
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .page-nav-bar {
    /deep/ .van-icon {
      color: #fff !important;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 90px;
    overflow-y: auto;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      margin: 0;
      padding: 50px 32px;
      font-size: 40px;
      color: #3a3a3a;
    }
    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .username {
        font-size: 24px;
        color: #3a3a3a;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .publishdate {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }
    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
    .article-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 88px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      /deep/ .van-button {
        border: unset;
      }
      .comment-btn {
        width: 282px;
        height: 46px;
        border: 2px solid #eeeeee;
        font-size: 30px;
        line-height: 46px;
        color: #a7a7a7;
      }
      /deep/ .van-icon {
        font-size: 40px;
        .van-info {
          font-size: 16px;
          background-color: #e22829;
        }
      }
    }
  }
  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .err-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      color: #666;
      font-size: 30px;
      border: 1px solid #c3c3c3;
    }
  }
}
</style>
