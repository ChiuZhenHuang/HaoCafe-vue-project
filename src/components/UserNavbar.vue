<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top"
    :class="{ 'bg-transparent': isTransparent, 'bg-black': !isTransparent }" :style="{'height': dynamicHeight + 'px' }">
      <div class="container-fluid bg-transparent">
        <div class="d-flex">
          <router-link to="/" @click.prevent="scrollToTop">
            <img src="https://i.imgur.com/qToNLW6.jpg" class="d-block logo" style="height: 60px;width: 60px;margin-right: 20px;" alt="LOGO">
          </router-link>
          <ul id="navbarNav" class="navbar-nav collapse navbar-collapse bg-transparent">
            <li class="nav-item">
              <router-link class="nav-link" to="/about" @click.prevent="scrollToTop">
                關於我們
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/user/shopping" @click.prevent="scrollToTop">
                商品列表
              </router-link>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click.prevent="openSearchModal">
                訂單查詢
              </button>
            </li>
          </ul>
        </div>

        <div>
        <!-- 手機漢堡鈕 -->
          <div class="ml-auto bg-transparent d-flex navbar-nav">
            <router-link class="nav-item d-lg-none" to="/user/favorites" @click.prevent="scrollToTop">
              <i class="bi bi-heart"></i>
                <span v-if="!favoritesLength" :style="{ display: favoritesLength ? 'block' : 'none' }"></span>
                <span v-else><h5>{{ favoritesLength }}</h5></span>
            </router-link>
            <router-link class="nav-item d-lg-none" to="/user/cart" @click.prevent="scrollToTop">
              <i class="bi bi-cart"></i>
                <span v-if="!cartLength" :style="{ display: cartLength ? 'block' : 'none' }"></span>
                <span v-else><h5>{{ cartLength }}</h5></span>
            </router-link>
            <router-link class="nav-item d-lg-none" to="/login" @click.prevent="scrollToTop">
                <i class="bi bi-person-gear"></i>
              </router-link>
            <button class="navbar-toggler ml-auto bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
              <i class="bi bi-border-width"></i>
            </button>
          </div>
        <!-- 桌機導覽列 -->
          <ul id="navbarNav" class="navbar-nav collapse navbar-collapse bg-transparent">
            <li class="nav-item">
              <router-link class="nav-link" to="/user/favorites" @click.prevent="scrollToTop">
                <i class="bi bi-heart"></i>
                <span v-if="!favoritesLength" :style="{ display: favoritesLength ? 'block' : 'none' }"></span>
                <span v-else><h5>{{ favoritesLength }}</h5></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/user/cart" @click.prevent="scrollToTop">
                <i class="bi bi-cart"></i>
                <span v-if="!cartLength" :style="{ display: cartLength ? 'block' : 'none' }"></span>
                <span v-else><h5>{{ cartLength }}</h5></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login" @click.prevent="scrollToTop">
                <i class="bi bi-person-gear"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 手機側邊欄 -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" data-bs-scroll="true" aria-labelledby="sidebarLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav flex-column h-100 justify-content-around">
          <li class="nav-item">
            <router-link class="nav-link" to="/about" @click.prevent="scrollToTop">
              關於我們
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/shopping" @click.prevent="scrollToTop">
              前往購物
            </router-link>
          </li>
          <li class="nav-item">
            <button class="nav-link" @click.prevent="openSearchModal">
              訂單查詢
            </button>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/favorites" @click.prevent="scrollToTop">
              <i class="bi bi-heart"></i>
                <span v-if="!favoritesLength" :style="{ display: favoritesLength ? 'block' : 'none' }"></span>
                <span v-else><h5>{{ favoritesLength }}</h5></span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/cart" @click.prevent="scrollToTop">
              <i class="bi bi-cart"></i>
                <span v-if="!cartLength" :style="{ display: cartLength ? 'block' : 'none' }"></span>
                <span v-else><h5>{{ cartLength }}</h5></span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login" @click.prevent="scrollToTop">
              <i class="bi bi-person-gear"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <orderSearch ref="search"></orderSearch>
</template>

<script>
import orderSearch from '@/components/OrderSearch.vue'
import { mapState } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
      isTransparent: true,
      scrollY: 0,
      windowWidth: window.innerWidth,
      initialHeight: 100, // 初始navbar高度
      scrolledHeight: 76 // 下滑頁面時navbar高度
    }
  },
  components: {
    orderSearch
  },
  watch: {
    // 螢幕寬度改變時觸發handleScroll，取得高度資料
    windowWidth (newWidth, oldWidth) {
      this.handleScroll()
    }
  },
  computed: {
    ...mapState(favoriteStore, ['favoritesLength']),
    ...mapState(cartStore, ['cartLength']),
    // navbar高度設定
    dynamicHeight () {
      // 手機板navbar高度保持76px
      if (this.windowWidth < 768) {
        return this.scrolledHeight
      } else {
        return this.scrollY > 50 ? this.scrolledHeight : this.initialHeight
      }
    }
  },
  methods: {
    // 判斷螢幕寬
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    // 判斷Y軸位置
    handleScroll () {
      // 獲取滾動的距離
      this.scrollY = window.scrollY
      this.isTransparent = this.scrollY <= 50
    },
    // 滾動至最上方
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    // 打開訂單查詢
    openSearchModal () {
      this.$refs.search.showModal()
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
