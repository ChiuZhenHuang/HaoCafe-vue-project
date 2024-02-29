<template>
  <userNav></userNav>
  <!-- about -->
  <div class="container-fluid about">
    <div class="row">
      <div class="col-12 col-md-6 about-item">
        <h3>About</h3>
        <img class="about-middleImg" src="../../assets/images/middleImg.jpg" alt="關於我們圖片">
        <p>「好咖」的故事始於一群對咖啡充滿熱情的夥伴們，他們分享著相同的信念：每一杯咖啡都是一種藝術，每一次沖煮都是一次探索。這群咖啡愛好者匯聚在一起，希望將他們對於咖啡的熱情和品味帶給更多的人。</p>
      </div>
      <div class="col-12 col-md-6 about-item">
        <img class="about-img" src="../../assets/images/IMG_2075.webp" alt="關於我們圖片">
      </div>
      <div class="col-12 col-md-6 about-item">
          <img class="about-img" src="../../assets/images/coffee-item1.png" alt="關於我們圖片">
      </div>
      <div class="col-12 col-md-6 about-item ">
        <p>我們將咖啡視為一種藝術形式，每一杯都是由經驗豐富的咖啡師用心調製的藝術品。品味「好咖」，感受咖啡的多重層次。</p>
        <p>我們注重可持續發展，並致力於與來自各地的咖啡豆生產商建立合作關係。這不僅保證了我們的咖啡豆的品質，還有助於支持農民和維護環境。</p>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <Footer/>

  <!-- 滾動按鈕 -->
  <transition name="fade">
    <button class="scrollButton animate__animated"
    :class="{ 'animate__fadeIn': showScrollButton }"
      v-show="showScrollButton" @click="scrollToTop">
      <i class="bi bi-arrow-up-short"></i>
    </button>
  </transition>

</template>

<script>
import userNav from '@/components/UserNavbar.vue'
import Footer from '@/components/Footer.vue'
import scrollButton from '@/mixins/scrollButton'

import { mapState, mapActions } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'

export default {
  components: {
    userNav, Footer
  },
  computed: {
    ...mapState(favoriteStore, ['isFavorites']),
    ...mapState(cartStore, ['cart'])
  },
  mixins: [scrollButton],
  methods: {
    ...mapActions(favoriteStore, ['loadFavoritesFromLocalStorage']),
    ...mapActions(cartStore, ['getCart'])
  },
  created () {
    this.loadFavoritesFromLocalStorage()
    this.getCart()
  }
}
</script>
