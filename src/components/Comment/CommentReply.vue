<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <CommentItem :comment="comment"></CommentItem>
      <!-- 回复评论列表 -->
      <CommentList
       :source="comment.com_id"
       type="c"
       :list="commentReplyList"
      ></CommentList>
      <!-- 底部区域 -->
      <div class="reply-bottom">
        <van-button
        class="write-btn"
        round
        size="small"
        @click="isPostShow=true"
        >写评论</van-button>
        <van-popup v-model="isPostShow" position="bottom"
            >
            <CommentPost
            :target="comment.com_id"
            type="c"
            @onpost-success="onPostSuccess"
            ></CommentPost>
            </van-popup
          >
      </div>
    </div>

  </div>
</template>

<script>
import CommentItem from '@/components/Comment/CommentItem.vue'
import CommentList from '@/components/Comment/CommentList.vue'
import CommentPost from '@/components/Comment/CommentPost.vue'
export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, CommentPost },
  data() {
    return {
      isPostShow: false,
      commentReplyList: []
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    onPostSuccess(data) {
    // 关闭弹出层
      this.isPostShow = false
      // 将新评论添加到列表中
      this.commentReplyList.unshift(data.new_obj)
      // 更新评论总数
      this.comment.reply_count++
    }
  }
}
</script>

<style lang="less" scoped>
.comment-reply {
  padding-top: 92px;
  .scroll-wrap {
    padding-top: 92px;
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
  .reply-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88px;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .write-btn {
      width: 60%;
    }
  }
}
</style>
