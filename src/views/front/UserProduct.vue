<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="l-banner bg-product">
    <div class="mask"></div>
    <h2>Product</h2>
  </div>

  <div class="container">
    <nav aria-label="breadcrumb">
      <ul class="breadcrumb mt-5">
        <li class="breadcrumb-item"><router-link to="/user/shopping">全部商品</router-link></li>
        <li class="breadcrumb-item" @click.prevent="selectCategory(product.category)">
          <router-link to="/user/shopping">{{ product.category }}</router-link>
        </li>
        <li class="breadcrumb-item">{{ product.title }}</li>
      </ul>
    </nav>

    <div class="row d-flex justify-content-center">
      <div class="col-12 col-md-8 col-lg-5 d-flex justify-content-center l-product-content">
        <div class="l-frame h-100">
          <div class="card">
            <div class="card-top h-auto">
              <button v-if="!product.isFavorite" type="button" class="btn btn-outline-info btn-love" @click="addToFavorites(product)">
                <i class="bi bi-heart"></i>
              </button>
              <button v-else type="button" class="btn btn-outline-info btn-love" @click="removeToFavorites(product)">
                <i class="bi bi-heart-fill"></i>
              </button>
              <img class="main-img animate__animated" :class="{ 'animate__fadeIn': changeImage }" :src="selectedImage || product.imageUrl" alt="產品主圖">
            </div>
            <div class="card-body other-img-content">
              <img :src="product.imageUrl" alt="產品小圖" @click="handleImageClick(null)">
              <img  v-for="(image, key) in product.images" :key="key"
                :src="image" alt="產品圖" @click="handleImageClick(image)">
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-7 product-description" style="display: flex; flex-direction: column;">
        <h5 class="product-title">{{ product.title }}</h5>
        <div class="category mb-5">{{ product.category }}</div>
        <p class="mb-2" style="white-space: pre-line">{{ product.description }}
        </p>
        <div class="d-flex" style="margin-top: auto;align-items: end;">
          <div>
            <div class="h5" v-if="!product.price">NT$ {{ $filters.currency(product.origin_price) }}</div>
            <del class="h5" v-if="product.price">NT$ {{ $filters.currency(product.origin_price) }}</del>
            <div class="h6" v-if="product.price">NT$ {{ $filters.currency(product.price) }}</div>
          </div>
          <div class="add-cart">
            <button type="button" class="btn qty-handler" @click="productDecrementQuantity(quantity)">-</button>
            <input type="number" v-model="quantity"  readonly  min="1" :max="product.unit"/>
            <button type="button" class="btn qty-handler" @click="productIncrementQuantity(quantity)">+</button>
            <button type="button add-cart" class="btn  btn-outline-dark"
              :disabled="this.status.loadingItem === product.id" @click="addToCart (product.id)">
              <span v-if="this.status.loadingItem === product.id" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3 product-notice">
      <div class="col-12 col-md-6">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item mb-2">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                送貨方式
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
              <div class="accordion-body">
                <ul>
                  <li>新竹物流宅配</li>
                  <li>黑貓宅配</li>
                  <li>7-11 取貨</li>
                  <li>全家 取貨</li>
                  <li>跨境宅配</li>
                  <li>7-11 跨境門市取貨</li>
                  <li>郵局航空包裹</li>
                  <li>郵局宅配（台灣離島地區）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="accordion" id="accordionPanelsStayOpenExample1">
          <div class="accordion-item mb-2">
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                產品備註
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
              <div class="accordion-body">
                <p style="white-space: pre-line">{{ product.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 相關產品 -->
    <div class="row other-product">
      <div class="about-product-title">
        <h2>相關產品</h2>
      </div>
      <div class="col-12">
        <div class="col-md-8 col-lg-9 l-product-content">
          <div class="row row-cols-sm-2 row-cols-lg-3">
            <div class="l-frame" v-show="product.category === item.category && product.title !== item.title"
              v-for="item in allProducts" :key="item.id">
              <div class="card">
                <div class="card-top">
                  <img :src="item.imageUrl"  alt="產品圖片">
                  <div class="more">
                    <button type="button" class="btn btn-outline-secondary btn-more"
                      @click.prevent="goOtherProduct(item.id)">More...
                    </button>
                  </div>
                </div>
                <div class="card-body w-100">
                  <h5 class="title" style="cursor: pointer" @click.prevent="goOtherProduct(item.id)">{{ item.title }}</h5>
                  <div class="category">{{ item.category }} </div>
                  <div class="d-flex justify-content-between">
                    <div class="price">
                      <div class="h5" v-if="!item.price">NT$ {{ $filters.currency(item.origin_price) }}</div>
                      <del class="h5" v-if="item.price">NT$ {{ $filters.currency(item.origin_price) }}</del>
                      <div class="h6" v-if="item.price">NT$ {{ $filters.currency(item.price) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scrollButton from '@/mixins/scrollButton'
import { mapState, mapActions } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
      product: {},
      id: '',
      selectedImage: null, // 追蹤主圖顯示
      changeImage: false, // 用於更換主圖
      allProducts: [] // 所有產品列表，用於顯示相關產品
    }
  },
  inject: ['emitter'],
  mixins: [scrollButton],
  computed: {
    ...mapState(favoriteStore, ['isFavorites']),
    ...mapState(cartStore, ['quantity', 'status'])
  },
  methods: {
    ...mapActions(favoriteStore, ['addToFavorites', 'removeToFavorites', 'getProduct', 'loadFavoritesFromLocalStorage']),
    ...mapActions(cartStore, ['addToCart', 'getCart', 'productDecrementQuantity', 'productIncrementQuantity']),
    // 取得產品資料
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      // 取得收藏清單資料
      this.loadFavoritesFromLocalStorage()
      this.$http.get(api).then((response) => {
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
          // 新增是否於收藏此產品屬性
          this.product.isFavorite = this.isFavorites.some(item => item.id === this.product.id)
        }
      })
    },
    // 取得所有產品資料
    getAllProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        this.allProducts = res.data.products
      })
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
    },
    // 前往相關產品頁面
    goOtherProduct (id) {
      this.$router.push(`/user/product/${id}`).then(() => {
        // this.$router.go(0)
        window.location.reload()
      })
    },
    // 麵包削篩選分類
    selectCategory (category) {
      this.emitter.emit('emit-category', category)
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getCart()
    this.getProduct()
    this.getAllProducts()
  }
}
</script>
