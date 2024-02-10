<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="banner bg-product">
    <div class="mask"></div>
    <h2>商品列表</h2>
  </div>

  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/shopping">全部商品</router-link></li>
        <li class="breadcrumb-item" aria-current="page">{{ product.category }}</li>
        <li class="breadcrumb-item" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <!-- <div class="row justify-content-center">
      <div class="col-5">
        <img :src="product.imageUrl" alt="產品圖" class="img-fluid mb-3">
        <img v-for="(image, index) in product.images" :key="index" :src="image" alt="產品圖" class="img-fluid mb-3">
        <div>{{ product.description }}</div>
        <div>{{ product.content }}</div>
      </div>
      <div class="col-7">
        <h2>{{ product.title }}</h2>
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
        <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
        <hr>
        <button type="button" class="btn btn-outline-danger"
        :disabled="status.loadingItem === product.id"
                @click="addToCart(product.id)">
                <span v-if="status.loadingItem === product.id" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          加到購物車
        </button>
      </div>
    </div> -->

    <div class="row">
      <div class="col-12 col-md-5" id="product">
        <div class="row">
          <div class="frame">
            <div class="card">
              <div class="card-top">
                <button v-if="!product.isFavorite" type="button" class="btn btn-outline-info" @click="addToFavorites(product)">
                  <i class="bi bi-heart"></i>
                </button>
                <button v-else type="button" class="btn btn-outline-info" @click="removeToFavorites(product)">
                  <i class="bi bi-heart-fill"></i>
                </button>
                <img class="main-image animate__animated" :class="{ 'animate__fadeIn': changeImage }" :src="selectedImage || product.imageUrl" alt="產品主圖">
              </div>
              <div class="card-body images">
                <img class="img-fluid" :src="product.imageUrl" alt="產品小圖" @click="handleImageClick(null)">
                <img class="img-fluid" v-for="(image, key) in product.images" :key="key"
                  :src="image" alt="產品圖" @click="handleImageClick(image)">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-7">
        <h5 class="title">{{ product.title }}</h5>
        <div class="category">{{ product.category }}</div>
        <div class="h5" v-if="!product.price">NT$ {{ product.origin_price }}</div>
        <del class="h5" v-if="product.price">NT$ {{ product.origin_price }}</del>
        <div class="h6" v-if="product.price">NT$ {{ product.price }}</div>
        <button type="button add-cart" class="btn btn-outline-danger"
          :disabled="this.status.loadingItem === product.id"
          @click="addToCart (product.id)">
          <span v-if="this.status.loadingItem === product.id" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      id: '',
      favorites: [], // 收藏產品列表
      selectedImage: null, // 追蹤主圖顯示
      changeImage: false,
      status: {
        loadingItem: ''
      }
    }
  },
  inject: ['emitter'],
  methods: {
    // 取得產品資料
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      // 取得收藏清單資料
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      this.favorites = favorites

      this.$http.get(api).then((response) => {
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
          // 新增是否於收藏此產品屬性
          this.product.isFavorite = favorites.some(item => item.id === this.product.id)
        }
      })
    },
    // 加道購物車
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        this.$httpMessageState(res, '加入購物車')
        // this.$router.push('/user/cart')
      })
    },
    // 加到收藏
    addToFavorites (product) {
      this.favorites.push(product)
      this.emitter.emit('push-message', {
        style: 'success',
        title: '已加入收藏'
      })
      product.isFavorite = true
      this.saveFavoritesToLocalStorage()
    },
    // 移除收藏
    removeToFavorites (product) {
      const index = this.favorites.findIndex(favProduct => favProduct.id === product.id)
      if (index !== -1) {
        this.favorites.splice(index, 1)
        this.emitter.emit('push-message', {
          style: 'warning',
          title: '已移除收藏'
        })
      }
      product.isFavorite = false
      this.saveFavoritesToLocalStorage()
    },
    // 將收藏資料儲存LocalStorage
    saveFavoritesToLocalStorage () {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    // 點擊其他圖片取代主圖
    handleImageClick (image) {
      this.selectedImage = image
      this.changeImageHandler()
    },
    // 主圖更換動態效果
    changeImageHandler () {
      this.changeImage = !this.changeImage
      // 更換圖片效果完成後改回false
      setTimeout(() => {
        this.changeImage = false
      }, 500)
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
