<!-- eslint-disable camelcase -->
<template>
<!-- 只有 List 在可视范围内才会检查滚动位置触发 onLoad -->
  <van-list
    class="article-list"
    v-model="loading"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    :finished="finished"
    finished-text="已展示所有评论"
    :immediate-check="false"
    @load="onLoad"
  >
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    ></CommentItem>
  </van-list>
</template>

<script>
import { getCommentAPI } from '@/api/commentAPI.js'
import CommentItem from '@/components/Comment/CommentItem.vue'
export default {
  name: 'CommentList',
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10
    }
  },
  components: { CommentItem },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    // 新增type属性
    type: {
      type: String,
      validator: (value) => {
        // 这个值必须匹配下列字符串中的一个
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    },
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 1.请求获取评论数据
      // 2.将数据push到list数组中
      // 3.把loading关掉
      // 4.判断是否还有更多数据,如果没有数据了,把finished设置为true
      try {
        const { data } = await getCommentAPI({
          type: this.type,
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id
          limit: this.limit
        })

        const { results, total_count: totalCount } = data.data
        this.list.push(...results)
        // this.list = this.list.concat(results)
        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        }
        // eslint-disable-next-line camelcase
        this.finished = this.list.length <= totalCount
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
