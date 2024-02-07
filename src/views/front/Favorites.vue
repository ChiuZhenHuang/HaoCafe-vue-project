<template>
  <div class="banner bg-favorites">
    <div class="mask"></div>
    <h2>收藏列表</h2>
  </div>

  <div class="container favorite-product mt-3">
    <div class="row">
      <div class="col-10" id="product">
        <button class="clear" @click="clearFavorites"><i class="bi bi-trash"></i> 清空全部</button>
        <div class="row row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 district">
          <div class="frame" v-for="item in isFavorites" :key="item.id">
            <div class="card">
              <div class="card-top">
                <button v-if="!item.isFavorite" type="button" class="btn btn-outline-info" @click="addToFavorites(item)">
                  <i class="bi bi-heart"></i>
                </button>
                <button v-else type="button" class="btn btn-outline-info" @click="removeToFavorites(item)">
                  <i class="bi bi-heart-fill"></i>
                </button>
                <img :src="item.imageUrl"  alt="產品圖片">
                <div class="more">
                  <button type="button" class="btn btn-outline-secondary"
                    @click="getProduct(item.id)">More...
                  </button>
                </div>
              </div>
              <div class="card-body w-100">
                <h5 class="title" style="cursor: pointer" @click="getProduct(item.id)">{{ item.title }}</h5>
                <div class="d-flex justify-content-between">
                  <div class="left">
                    <div class="category">{{ item.category }}</div>
                    <div class="h5" v-if="!item.price">NT$ {{ item.origin_price }}</div>
                    <del class="h5" v-if="item.price">NT$ {{ item.origin_price }}</del>
                    <div class="h6" v-if="item.price">NT$ {{ item.price }}</div>
                  </div>
                  <div class="right ml-auto">
                    <button type="button add-cart" class="btn btn-outline-danger"
                      :disabled="this.status.loadingItem === item.id"
                      @click="addCart(item.id)">
                      <span v-if="this.status.loadingItem === item.id" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <i class="bi bi-cart4"></i>
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

export default {
  data () {
    return {
      isFavorites: [],
      status: {
        loadingItem: '' // 對應品項id
      }
    }
  },
  components: { subscription },
  inject: ['emitter'],
  methods: {
    // 取得儲存收藏產品資料
    loadFavoritesFromLocalStorage () {
      const favoritesData = JSON.parse(localStorage.getItem('favorites')) || []
      this.isFavorites = favoritesData
    },
    // 將收藏資料儲存LocalStorage
    saveFavoritesToLocalStorage () {
      localStorage.setItem('favorites', JSON.stringify(this.isFavorites))
    },
    // 前往詳細資料頁面
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    // 加到購物車
    addCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // 讀取資料前先讓loadingItem等於id資料，觸發disabled避免用戶重複加入購物車
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          console.log(res)
          // 讀取資料完成將disabled取消，讓用戶知道已經完成加入購物車
          this.status.loadingItem = ''
          this.$httpMessageState(res, '加入購物車')
        })
    },
    // 加到收藏
    addToFavorites (item) {
      this.isFavorites.push(item)
      this.emitter.emit('push-message', {
        style: 'success',
        title: '已加入收藏'
      })
      item.isFavorite = true
      this.saveFavoritesToLocalStorage()
    },
    // 移除收藏
    removeToFavorites (item) {
      const index = this.isFavorites.findIndex(favProduct => favProduct.id === item.id)
      if (index !== -1) {
        this.isFavorites.splice(index, 1)
        this.emitter.emit('push-message', {
          style: 'warning',
          title: '已移除收藏'
        })
      }
      item.isFavorite = false
      this.saveFavoritesToLocalStorage()
    },
    clearFavorites () {
      // 清空 isFavorites 及LocalStorage
      this.isFavorites = []
      localStorage.removeItem('favorites')
    }
  },
  created () {
  // 從 localStorage 中加載收藏資料
    this.loadFavoritesFromLocalStorage()
  }
}
</script>
