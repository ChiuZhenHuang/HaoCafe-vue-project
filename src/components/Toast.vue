<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <!-- 如果資料帶有content再顯示出來 -->
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import ToastComponent from 'bootstrap/js/dist/toast'

export default {
  name: 'ToastComponent',
  props: [
    'msg'
  ],
  mounted () {
    const toastEl = this.$refs.toast
    const toast = new ToastComponent(toastEl, {
      delay: 3000
    })
    // 有出現訊息時，會顯示3秒
    toast.show()
  }
}
</script>
