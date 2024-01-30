<template>
  <div class="home">
    <userNav/>
  </div>
  <!-- 幻燈片 -->
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner ">
      <div class="text bg-transparent">
        <p class="bg-transparent">咖啡是一種藝術，每一杯都是一幅畫，每一口都是一首詩。</p>
        <router-link class="nav-link" to="/user/shopping">來去逛逛</router-link>
      </div>
      <div class="carousel-item active">
        <img src="../../assets/images/coffee-5.avif" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../assets/images/coffee-2.avif" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../assets/images/coffee-4.avif" class="d-block w-100" alt="...">
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

  <!-- 中間面板 -->
  <div class="container-fluid home-main">
    <div class="row">
      <div class="mask"></div>
      <!-- <div class="col-12 col-md-5 offset-md-1 mt-3 mb-3">
        <div class="col-12 col-md-7 main-pic">
          <div class="main-item">
            <img src="https://i.pinimg.com/564x/af/ad/86/afad86046f8d420692a612ccef4f05b6.jpg" alt="">
          </div>
        </div>
        <div class="col-12 col-md-7 offset-md-4">
          <div class="main-item">
            <div class="text">
              <p>「表達自己，</p>
              <p>來一杯濃縮咖啡。」</p>
            </div>
          </div>
        </div>
      </div> -->
      <div class="col-12 col-md-4 mt-3 mb-3">
        <div class="main-item">
          <div class="left">
            <img src="https://i.imgur.com/Ee0Isz0.jpg">
            <img src="https://i.imgur.com/LqGBzES.jpg">
            <img src="https://i.imgur.com/zXIMLuE.jpg">
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 mt-3 mb-3">
        <div class="main-item news">
          <h2>News</h2>
          <div>
          <span>2020 / 05 / 19</span><p>店長榮獲好咖品質金牌獎！全面85折</p>
          <span>2020 / 05 / 19</span><p>周年慶！輸入優惠碼：9，享有九折</p>
          <span>2020 / 05 / 19</span><p>好咖 即將上市</p>
          <span>2020 / 05 / 19</span><p>好咖 整修中，敬請期待！</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-12 banner">
        <div>
          <strong>還沒領取優惠券？</strong>
          <div>
            <strong>速速領取專屬優惠券！</strong>
            <button type="button">GO</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <p>&copy; 2024 好咖 | 本網站為學習用途</p>
  </footer>

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
    // console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
  }
}
</script>
