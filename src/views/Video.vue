<template>
  <div class="video-container">
    <button @click="btnGet">发起请求</button>
    <button @click="btnGet2">发起请求2</button>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api/userAPI.js'
export default {
  name: 'VideoView',
  methods: {
    async btnGet() {
      const { data: res } = await getUserChannelsAPI()
      console.log(res)
    },
    btnGet2() {}
  }
}
</script>

<style lang="less" scoped></style>
