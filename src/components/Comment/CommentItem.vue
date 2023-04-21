<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <span class="username">{{ comment.aut_name }}</span>
      <van-button
        class="like-btn"
        :class="{ liked: comment.is_liking }"
        :loading="loading"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onCommentLike"
        >{{ comment.like_count || '赞' }}</van-button
      >
    </div>
    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate |relativeTime}}</span>
        <van-button
          @click="$emit('reply-click', comment)"
          class="reply-btn"
          round
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLikeAPI, deleteCommentLikeAPI } from '@/api/commentAPI.js'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCommentLike() {
      this.loading = true
      try {
        if (this.comment.is_liking) {
          // 已点赞,取消点赞
          await deleteCommentLikeAPI(this.comment.com_id)
          this.comment.like_count--
          this.$toast.success('取消点赞')
        } else {
          // 没有点赞,添加点赞
          await addCommentLikeAPI(this.comment.com_id)
          this.comment.like_count++
          this.$toast.success('点赞成功')
        }
        // 更新视图
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast('操作失败,请重试!')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .username {
      color: #406599;
      font-size: 26px;
    }
    .like-btn {
      border: none;
      padding: 0;
      height: 30px;
      line-height: 30px;
      font-size: 19px;
      &.liked {
        color: #e5645f;
      }
      .van-icon {
        font-size: 30px;
      }
    }
  }
  .comment-content {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .bottom-info {
    display: flex;
    align-items: center;
    .comment-pubdate {
      font-size: 19px;
      color: #222;
      margin-right: 25px;
    }
    .reply-btn {
      width: 135px;
      height: 48px;
      line-height: 48px;
      font-size: 21px;
      color: #222;
    }
  }
}
</style>
