<template>
  <!-- about目前是多餘的class -->
  <div class="about">
    <userNav></userNav>
  </div>
  <!-- about -->
  <div class="container-fluid  main-about">
    <div class="row">
      <div class="col-12 col-md-6 about-item">
        <h3>About</h3>
        <img class="middle-img" src="../../assets/images/middleImg.jpg" alt="">
        <p>「好咖」的故事始於一群對咖啡充滿熱情的夥伴們，他們分享著相同的信念：每一杯咖啡都是一種藝術，每一次沖煮都是一次探索。這群咖啡愛好者匯聚在一起，希望將他們對於咖啡的熱情和品味帶給更多的人。</p>
      </div>
      <div class="col-12 col-md-6 about-item">
        <img src="https://media.discordapp.net/attachments/848579800130256906/1200749359113965620/IMG_2075.jpg?ex=65c74ffc&is=65b4dafc&hm=8fddf682e2ab6ac64e34569dfdb0d5dd9a68b07f9aa069df8322b112ca79e479&=&format=webp&width=441&height=662" alt="">
      </div>
      <div class="col-12 col-md-6 about-item">
          <img src="../../assets/images/coffee-item1.png" alt="">
      </div>
      <div class="col-12 col-md-6 about-item ">
        <p>我們將咖啡視為一種藝術形式，每一杯都是由經驗豐富的咖啡師用心調製的藝術品。品味「好咖」，感受咖啡的多重層次。</p>
        <p>我們注重可持續發展，並致力於與來自各地的咖啡豆生產商建立合作關係。這不僅保證了我們的咖啡豆的品質，還有助於支持農民和維護環境。</p>
      </div>
    </div>
  </div>

</template>

<script>
import userNav from '@/components/UserNavbar.vue'

export default {
  components: {
    userNav
  }
}
</script>
