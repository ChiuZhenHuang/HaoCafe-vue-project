<template>
  <!-- about目前是多餘的class -->
  <div class="about">
    <userNav></userNav>
  </div>
  <!-- 英文字體google-font 先用link -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet">
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
