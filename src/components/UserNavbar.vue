<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top"
    :class="{ 'bg-transparent': isTransparent, 'bg-black': !isTransparent }" :style="{'height': dynamicHeight + 'px' }">
      <div class="container-fluid bg-transparent" >
        <div>
          <router-link to="/" @click.prevent="scrollToTop">
            <img src="https://i.imgur.com/qToNLW6.jpg" class="d-block logo" style="height: 60px;width: 60px;" alt="LOGO">
          </router-link>
        </div>
        <div>
        <!-- 手機漢堡鈕 -->
          <button class="navbar-toggler ml-auto bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
            <i class="bi bi-border-width"></i>
          </button>
        <!-- 桌機導覽列 -->
          <ul  id="navbarNav" class="navbar-nav collapse navbar-collapse bg-transparent">
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
              <router-link class="nav-link" to="/dashboard/productComponent" @click.prevent="scrollToTop">
                管理產品
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/user/favorites" @click.prevent="scrollToTop">
                <i class="bi bi-heart"></i>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/user/cart" @click.prevent="scrollToTop">
                <i class="bi bi-cart"></i>
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
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
      <div class="offcanvas-header">
        <!-- <h5 class="offcanvas-title" id="sidebarLabel">導覽列</h5> -->
        <button type="button" class="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav flex-column">
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
            <router-link class="nav-link" to="/dashboard/productComponent" @click.prevent="scrollToTop">
              管理產品
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/favorites" @click.prevent="scrollToTop">
              <i class="bi bi-heart"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/cart" @click.prevent="scrollToTop">
              <i class="bi bi-cart"></i>
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
</template>

<script>
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
  watch: {
    // 螢幕寬度改變時觸發handleScroll，取得高度資料
    windowWidth (newWidth, oldWidth) {
      this.handleScroll()
    }
  },
  computed: {
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
