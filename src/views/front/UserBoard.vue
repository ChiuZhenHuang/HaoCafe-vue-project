<template>
  <div class="container-fluid mt-3 position-relative">
    <userNav></userNav>
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import userNav from '@/components/UserNavbar.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  components: {
    ToastMessages,
    userNav
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
