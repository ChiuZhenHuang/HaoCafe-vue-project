<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar w/ text</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
      <span class="navbar-text">
        Navbar text with an inline element
      </span>
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
