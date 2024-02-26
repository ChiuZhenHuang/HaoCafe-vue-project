<template>
  <div class="toast-container  position-fixed bottom-0 end-0 p-3" style="z-index: 1050">
    <!-- 將內層Toast元件用列表展示出來 -->
    <!-- :msg="msg"代表內層props的msg為這裡的msg資料 -->
    <Toast v-for="(msg, key) in messages" :key="key"
      :msg="msg"
    />
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'

export default {
  // 註冊Toast資料
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  // 取得外層provide進來的emitter功能
  inject: ['emitter'],
  mounted () {
    // msg為外部傳進來的資訊
    this.emitter.on('push-message', (msg) => {
      // 若資料沒傳入style的話，style預設為success
      const { style = 'success', title, content } = msg
      this.messages.push({ style, title, content })
    })
  }
}
</script>
