<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" :disabled="!message.length" @click="onPost"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentAPI } from '@/api/commentAPI.js'
export default {
  name: 'CommentPost',

  data() {
    return {
      message: ''
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }

  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      validator: (value) => {
        // 这个值必须匹配下列字符串中的一个
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }

  },
  methods: {
    async onPost() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续展示toast
      })
      try {
        const { data } = await addCommentAPI({
        // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          target: this.target,
          content: this.message, // 评论内容
          art_id: this.type === 'a' ? null : this.articleId.toString()
        })
        this.$toast.success('发布成功')
        // todo=>
        // 清空文本框
        this.message = ''
        // 关闭弹出层
        // 把评论内容展示在列表中
        // 这两件事需要在父组件中完成
        this.$emit('onpost-success', data.data)
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    border: none;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
