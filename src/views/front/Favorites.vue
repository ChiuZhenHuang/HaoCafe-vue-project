<template>
  <div class="l-banner bg-favorites">
    <div class="mask"></div>
    <h2>收藏列表</h2>
  </div>

  <div class="container favorite-content mt-3">
    <div class="row">
      <div class="col-10 l-product-content">
        <button class="favorite-clear" @click="clearFavorites"><i class="bi bi-trash"></i> 清空全部</button>
        <div class="row row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 favorite-wrap">
          <div v-if="isFavorites.length === 0" class="favorite-not-buy">
            <i class="bi bi-emoji-dizzy"></i>
            <h5>您尚未收藏產品</h5>
            <router-link class="nav-link" to="/user/shopping" @click.prevent="scrollToTop">
              <button type="button" class="btn btn-dark">立即前往選購</button>
            </router-link>
          </div>
          <div class="l-frame" v-for="item in isFavorites" :key="item.id">
            <div class="card">
              <div class="card-top">
                <button type="button" class="btn btn-outline-info btn-love" @click="removeToFavorites(item)">
                  <i class="bi bi-heart-fill"></i>
                </button>
                <img :src="item.imageUrl"  alt="產品圖片">
                <div class="more">
                  <button type="button" class="btn btn-outline-secondary btn-more"
                    @click="getProduct(item.id)">More...
                  </button>
                </div>
              </div>
              <div class="card-body w-100">
                <h5 class="title" style="cursor: pointer" @click="getProduct(item.id)">{{ item.title }}</h5>
                <div class="category">{{ item.category }}</div>
                <div class="d-flex justify-content-between">
                  <div class="price">
                    <div class="h5" v-if="!item.price">NT$ {{ $filters.currency(item.origin_price) }}</div>
                    <del class="h5" v-if="item.price">NT$ {{ $filters.currency(item.origin_price) }}</del>
                    <div class="h6" v-if="item.price">NT$ {{ $filters.currency(item.price) }}</div>
                  </div>
                  <div class="add-cart ml-auto">
                    <button type="button" class="btn btn-outline-dark"
                      :disabled="this.status.loadingItem === item.id"
                      @click="addToCart(item.id)">
                      <span v-if="this.status.loadingItem === item.id" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <subscription/>

</template>

<script>
import subscription from '@/components/Subscription.vue'
import scrollButton from '@/mixins/scrollButton'
import { mapState, mapActions } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
    }
  },
  components: { subscription },
  mixins: [scrollButton],
  computed: {
    ...mapState(favoriteStore, ['isFavorites']),
    ...mapState(cartStore, ['status'])
  },
  methods: {
    ...mapActions(favoriteStore, ['loadFavoritesFromLocalStorage', 'removeToFavorites', 'clearFavorites']),
    ...mapActions(cartStore, ['addToCart', 'getCart']),
    // 前往詳細資料頁面
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
      this.scrollToTop()
    }
  },
  created () {
  // 從 localStorage 中加載收藏資料
    this.loadFavoritesFromLocalStorage()
    this.getCart()
  }
}
</script>
