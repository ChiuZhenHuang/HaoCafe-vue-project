<template>
  <div class="home">
    <userNav/>
  </div>
  <!-- 幻燈片 -->
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="text">
        <p>咖啡是一種藝術，每一杯都是一幅畫，每一口都是一首詩。</p>
        <a href="#">來去逛逛</a>
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
<!-- <div class="container">
  <div class="row">
    <div class="col-md-6 mt-2">
      <div class="col-12 col-md-7 main-pic">
        <div class="main-item">
          <img src="https://i.pinimg.com/564x/af/ad/86/afad86046f8d420692a612ccef4f05b6.jpg" alt="">
        </div>
      </div>
      <div class="col-12 col-md-7 offset-md-5">
        <div class="main-item">
          <div class="text">
            <p>「表達自己，</p>
            <p>來一杯濃縮咖啡。」</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h1>Coffee</h1>
    </div>
  </div>
</div> -->

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

<!-- <script>
export default {
  data () {
    return {
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
      // this.isFixedTop = scrollY > 50

      // 設置 isTransparent 屬性，根據滾動距離來判斷背景色
      // this.isTransparent = scrollY <= 50
    }
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script> -->
