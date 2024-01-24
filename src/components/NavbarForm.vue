<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">範例作品</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <div class="navbar-nav me-auto mb-2 mb-lg-0">
        <router-link  class="nav-link" aria-current="page" to="/dashboard/productComponent">產品</router-link>
        <router-link  class="nav-link" aria-current="page" to="/dashboard/orders">訂單</router-link>
        <router-link  class="nav-link" aria-current="page" to="/dashboard/coupons">優惠券</router-link>
        <a class="nav-link" href="#" @click.prevent="logout">登出</a>
      </div>
      <div>
        <router-link  class="nav-link" aria-current="page" to="/user/shopping">產品介面</router-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    // 登出按鈕
    logout () {
      const api = `${process.env.VUE_APP_API}logout`

      this.$http.post(api)
        .then((res) => {
          // 可將cookie使用者資料清空，但在這邊沒有添加這行也沒關係，因為下次重新登入時，又會有新的token傳入做驗證
          document.cookie = `hexToken=;expires= ${new Date(0).toGMTString()}`
          this.$router.push('/login')
        })
    }
  }
}

</script>
