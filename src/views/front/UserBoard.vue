<template>
  <userNav></userNav>
  <ToastMessages></ToastMessages>
  <router-view/>
  <Footer></Footer>

  <!-- 滾動按鈕 -->
  <transition name="fade">
    <button class="scrollButton animate__animated"
    :class="{ 'animate__fadeIn': showScrollButton }"
      v-show="showScrollButton" @click="scrollToTop">
      <i class="bi bi-arrow-up-short"></i>
    </button>
  </transition>

</template>

<script>
import userNav from '@/components/UserNavbar.vue'
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import scrollButton from '@/mixins/scrollButton'

export default {
  components: {
    ToastMessages,
    userNav,
    Footer
  },
  mixins: [scrollButton],
  provide () {
    return {
      emitter
    }
  },
  created () {
  }
}
</script>

<!-- <style>
*{
  background-color: rgba(42, 42, 42, 0.5);
}
</style> -->
