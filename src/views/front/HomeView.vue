<template>
  <div class="home">
    <userNav/>
  </div>
  <!-- 輪播 目前沒效果 -->
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" >
      <div class="carousel-item active">
        <img src="../../assets/picture/IMG_1695200081572.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../assets/picture/IMG_4311.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../assets/picture/IMG_6637.jpg" class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

</template>

<script>
// @ is an alias to /src
import userNav from '@/components/UserNavbar.vue'

export default {
  name: 'HomeView',
  components: {
    userNav
  },
  created () {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
  }
}
</script>
