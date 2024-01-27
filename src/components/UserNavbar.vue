<template>
  <div>
    <nav class="navbar navbar-expand-lg" :class="{ 'fixed-top': isFixedTop, 'bg-transparent': isTransparent, 'bg-black': !isTransparent }">
      <div class="container-fluid bg-transparent">
        <router-link class="navbar-brand" to="/">
          <img src="https://i.pinimg.com/564x/e6/e8/69/e6e8691e77bd66ca772d620f22d61d9b.jpg" class="d-block" style="height: 60px;width: 60px;" alt="...">
        </router-link>
        <!-- 手機漢堡鈕 -->
        <button class="navbar-toggler ml-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 桌機導覽列 -->
        <ul  id="navbarNav" class="navbar-nav collapse navbar-collapse">
          <li class="nav-item">
            <router-link class="nav-link" to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/shopping">商品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/productComponent">管理產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login"><i class="bi bi-person-gear"></i> 登入</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/cart"><i class="bi bi-cart"></i></router-link>
          </li>
        </ul>
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
            <router-link class="nav-link" to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/shopping">前往購物</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/productComponent">管理產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login"><i class="bi bi-person-gear"></i> 登入</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/cart"><i class="bi bi-cart"></i></router-link>
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
      isFixedTop: false,
      isTransparent: true
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      // 獲取滾動的距離
      const scrollY = window.scrollY

      // 設置 isFixedTop 屬性，當滾動距離超過某個值時固定在頂部
      this.isFixedTop = scrollY > 50

      // 設置 isTransparent 屬性，根據滾動距離來判斷背景色
      this.isTransparent = scrollY <= 50
    }
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
