<template>
  <div class="home">
    <ToastMessages/>
    <userNav/>
  </div>

  <!-- 幻燈片 -->
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" ref="carousel">
    <div class="carousel-inner">
      <div class="carousel-text bg-transparent">
        <p class="bg-transparent">咖啡是一種藝術，每一杯都是一幅畫，每一口都是一首詩。</p>
        <router-link class="nav-link go-shopping" to="/user/shopping" @click.prevent="scrollToTop">來去逛逛</router-link>
      </div>
      <div class="carousel-item active">
        <img src="../../assets/images/coffee-5.avif"  class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../assets/images/coffee-2.avif" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../assets/images/coffee-4.avif" class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <!-- 消息 -->
  <div class="container-fluid news-wrapper">
    <div class="row">
      <div class="mask"></div>
      <div class="col-12 col-md-4 mt-3 mb-3">
        <div class="news-content">
          <div class="side">
            <div class="news-item animate__animated" :class="{'animate__bounceInLeft': showNews, 'animate__fadeOutLeft': !showNews}">
              <img src="https://i.imgur.com/Ee0Isz0.jpg">
              <router-link class="nav-link" to="/about" @click.prevent="scrollToTop">關於我們</router-link>
            </div>
            <div class="news-item  animate__animated" :class="{'animate__bounceInLeft':showNews, 'animate__fadeOutLeft': !showNews}">
              <img src="https://i.imgur.com/LqGBzES.jpg">
              <router-link class="nav-link" to="/user/shopping" @click.prevent="scrollToTop">產品列表</router-link>
            </div>
            <div class="news-item animate__animated" :class="{'animate__bounceInLeft':showNews, 'animate__fadeOutLeft': !showNews}">
              <img src="https://i.imgur.com/zXIMLuE.jpg">
              <router-link class="nav-link" to="/user/favorites" @click.prevent="scrollToTop">收藏列表</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 mt-3 mb-3">
        <div class="news-content">
          <h2>News</h2>
          <div>
            <div class="news-txt">
              <h5 class="date">2024 / 01 / 19</h5>
              <p>周年慶！輸入優惠碼：haocafe888，享有八折</p>
            </div>
            <div class="news-txt">
              <h5 class="date">2023 / 11 / 02</h5>
              <p>全館消費滿額3,000！即可免運</p>
            </div>
            <div class="news-txt">
              <h5 class="date">2023 / 08 / 19</h5>
              <p>店長榮獲好咖品質金牌獎！全館優惠促銷中</p>
            </div>
            <div class="news-txt">
              <h5 class="date">2023 / 05 / 20</h5>
              <p>好咖 即將上市</p>
            </div>
            <div class="news-txt">
              <h5 class="date">2023 / 04 / 30</h5>
              <p>好咖 整修中，敬請期待！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 滾動按鈕 -->
  <transition name="fade">
    <button class="scrollButton animate__animated"
    :class="{ 'animate__fadeIn': showScrollButton }"
      v-show="showScrollButton" @click="scrollToTop">
      <i class="bi bi-arrow-up-short"></i>
    </button>
  </transition>

  <!-- 領取優惠 -->
  <getCoupon/>

  <!-- 商品分類 -->
  <category/>

  <!-- 訂閱我們 -->
  <subscription/>

  <!-- Footer -->
  <Footer/>

</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue'
import userNav from '@/components/UserNavbar.vue'
import getCoupon from '@/components/getCoupon.vue'
import category from '@/components/Category.vue'
import subscription from '@/components/Subscription.vue'
import Footer from '@/components/Footer.vue'
import scrollButton from '@/mixins/scrollButton'

import { mapState, mapActions } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
    }
  },
  name: 'HomeView',
  components: {
    userNav, Footer, getCoupon, subscription, ToastMessages, category
  },
  computed: {
    ...mapState(favoriteStore, ['isFavorites']),
    ...mapState(cartStore, ['cart'])
  },
  mixins: [scrollButton],
  inject: ['emitter'],
  methods: {
    ...mapActions(favoriteStore, ['loadFavoritesFromLocalStorage']),
    ...mapActions(cartStore, ['getCart'])
  },
  mounted () {
  },
  created () {
    this.loadFavoritesFromLocalStorage()
    this.getCart()
    // console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
  }
}
</script>
