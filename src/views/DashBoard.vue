<template>
  <Navbar></Navbar>
  <div class="container-fluid">
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/NavbarForm.vue'

export default {
  components: {
    Navbar
  },
  created () {
    // 取得存在cookie內 hexToken中的token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 將token資料帶入http標頭(headers)中驗證
    this.$http.defaults.headers.common.Authorization = token

    // 檢查使用者是否持續登入
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('./login')
        }
      })
  }
}
</script>
