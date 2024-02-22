export default {
  data () {
    return {
      showScrollButton: false // 顯示滑到最上方按鈕
    }
  },
  methods: {
    // 滾動事件處理方法
    handleScroll () {
      // 根據實際需求設置 Y 軸的閾值，當滾動超過閾值時顯示按鈕
      const scrollThreshold = 500
      // 當 Y 軸滾動超過閾值時，顯示滾動按鈕，否則隱藏
      this.showScrollButton = window.scrollY > scrollThreshold
    },
    // 點擊按鈕回到最上方
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滾動效果
      })
    }
  },
  mounted () {
    // 監聽滾動事件
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount () {
    // 移除滾動事件監聽器，避免內存洩漏
    window.removeEventListener('scroll', this.handleScroll)
  }
}
