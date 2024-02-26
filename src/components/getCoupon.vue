<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 get-coupon">
        <div class="text-center">
          <strong>享受折扣商品優惠</strong>
          <h5>感謝祭活動期間快來領取優惠券！</h5>
        </div>
        <div class="d-flex flex-column align-items-center animate__animated"
        :class="{'animate__fadeIn': getCoupon, 'animate__fadeOut': !getCoupon}">
          <div class="d-flex coupon">
            <div class="mt-3 mb-3">
              <p>好康</p>
              <span>八折</span>
            </div>
            <h5>goodcoffee888</h5>
          </div>
          <button type="button" @click="copyText">點擊領取</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scrollButton from '@/mixins/scrollButton'

export default {
  data () {
    return {
    }
  },
  inject: ['emitter'],
  mixins: [scrollButton],
  methods: {
    // 複製優惠
    copyText () {
      const textToCopy = 'goodcoffee888'
      // 創建一個 textarea 元素
      const textarea = document.createElement('textarea')
      textarea.value = textToCopy
      document.body.appendChild(textarea)
      // 選中 textarea 中的文本
      textarea.select()
      document.execCommand('copy')
      // 刪除創建的 textarea 元素
      document.body.removeChild(textarea)
      this.emitter.emit('push-message', {
        style: 'success',
        title: '領取優惠碼成功'
      })
    }
  }
}
</script>
