<template>
  <div class="container-fluid"  id="login">
    <form class="row h-100 justify-content-center align-items-center"
    @submit.prevent="signIn">
    <div class="mask d-flex justify-content-center align-items-center">
      <div class="col-9 mt-5 mb-5 frame">
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
        <router-link to="/" class="btn go-home"><i class="bi bi-arrow-90deg-up"></i> 回首頁</router-link>
        <div class="mb-2">
          <label for="inputEmail">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            required
            v-model="user.password"
          />
        </div>
        <div class="mt-4 w-100 d-flex justify-content-end">
          <button class="btn login-button" type="submit">登入</button>
        </div>
      </div>
    </div>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      // 發送post請求到api，並傳入使用者輸入的資料
      this.$http.post(api, this.user)
        .then((res) => {
          console.log(res)
          // 如果登入成功，將資料存留到cookie
          if (res.data.success) {
            // 解構賦值
            const { token, expired } = res.data
            // console.log(token, expired)
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            console.log(res)
            // 轉到dashboard頁面
            this.$router.push('./dashboard/productComponent')
          }
        })
    }
  }
}
</script>
