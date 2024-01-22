<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/cart">用戶端範例</router-link>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/productComponent">管理產品</router-link>
          </li>
        </ul>
      </div>

    </div>
  </nav>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
  }
}
</script>
