<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="l-banner bg-product">
    <div class="mask"></div>
    <h2>商品列表</h2>
  </div>

  <div class="container mt-3">
    <div class="row">
      <!-- 選單 -->
      <div class="col-md-4 col-lg-3" id="select">
        <ul class="list-group">
          <li class="mt-2 mb-1">
            <input type="search" v-model="search" value="" placeholder=""
            @input="handleInput" @compositionstart="handleCompositionStart" @compositionend="handleCompositionEnd">
            <button><i class="bi bi-search"></i></button>
          </li>
          <li class="list-group-item mt-2 mb-1" :class="{'active': selectedCategory === ''}"
          style="cursor: pointer" @click="search === '' && selectCategory('')">全部商品</li>
          <li class="list-group-item mt-2 mb-1" :class="{'active': selectedCategory === '淺烘培'}"
          style="cursor: pointer" @click="search === '' && selectCategory('淺烘培')">淺烘培</li>
          <li class="list-group-item mt-2 mb-1" :class="{'active': selectedCategory === '中烘培'}"
          style="cursor: pointer" @click="search === '' && selectCategory('中烘培')">中烘培</li>
          <li class="list-group-item mt-2 mb-1" :class="{'active': selectedCategory === '深烘培'}"
          style="cursor: pointer" @click="search === '' && selectCategory('深烘培')">深烘培</li>
          <li class="list-group-item mt-2 mb-1" :class="{'active': selectedCategory === '周邊商品'}"
          style="cursor: pointer" @click="search === '' && selectCategory('周邊商品')">周邊商品</li>
        </ul>
      </div>
      <!-- 產品 -->
      <div class="col-md-8 col-lg-9 l-product-content">
        <div class="row row-cols-sm-2 row-cols-lg-3">
          <div class="l-frame" v-for="item in filterProducts" :key="item.id">
            <div class="card">
              <div class="card-top">
                <button v-if="!item.isFavorite" type="button" class="btn btn-outline-info btn-love" @click="addToFavorites(item)">
                  <i class="bi bi-heart"></i>
                </button>
                <button v-else type="button" class="btn btn-outline-info btn-love" @click="removeToFavorites(item)">
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
                <div class="category">{{ item.category }} </div>
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
          <div v-show="filterProducts.length === 0" class="not-found">
            <i class="bi bi-chat-square-dots"></i>
            <p>找不到相關的產品</p>
            <p>請嘗試輸入其他關鍵字</p>
          </div>
        </div>
        <!-- 渲染全部商品時才顯示頁數 -->
        <Pagination v-show="selectedCategory === '' && search === '' " :pages="pagination" @emit-pages="getProducts"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import scrollButton from '@/mixins/scrollButton'
import { mapState, mapActions } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
      products: [], // 單頁產品
      allProducts: [], // 所有產品
      search: '', // 搜尋內容
      selectedCategory: '', // 烘培類型
      pagination: {}, // 分頁
      isLoading: false, // 整個頁面loading
      isActive: false, // 篩選欄是否被選擇
      isComposing: false // 是否進行中文輸入
    }
  },
  components: { Pagination },
  inject: ['emitter'],
  mixins: [scrollButton],
  computed: {
    ...mapState(favoriteStore, ['isFavorites']),
    ...mapState(cartStore, ['status']),
    // 搜尋及篩選
    filterProducts () {
      // 輸入搜尋，從所有產品中查找
      if (this.search !== '') {
        return this.allProducts.filter((item) => {
          return item.title.match(new RegExp(this.search, 'i'))
        })
      } else if (this.selectedCategory !== '') {
        // 如果選擇篩選種類，從所有產品中進行篩選
        return this.allProducts.filter((item) => {
          return item.category === this.selectedCategory
        })
      } else {
        return this.products
      }
    }
  },
  methods: {
    ...mapActions(favoriteStore, ['loadFavoritesFromLocalStorage', 'addToFavorites', 'removeToFavorites', 'isProductFavorite']),
    ...mapActions(cartStore, ['addToCart', 'getCart']),
    // 取得單頁產品資料
    getProducts (page = 1) {
      // 一頁最多只能取得10筆資料
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        this.isLoading = false
        this.pagination = res.data.pagination
        // 新增isFavorite屬性，用於判斷是否已是收藏產品
        this.products = res.data.products.map(item => ({ ...item, isFavorite: this.isProductFavorite(item) }))
      })
    },
    // 取得所有產品資料
    getAllProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        this.allProducts = res.data.products
      })
    },
    // 前往詳細資料頁面
    getProduct (id) {
      this.scrollToTop()
      this.$router.push(`/user/product/${id}`)
    },
    // 滾動至最上方
    scrollToTop () {
      window.scrollTo({
        top: 325, // 產品列表最上方
        behavior: 'smooth' // 平滑滾動效果
      })
    },
    // 篩選烘培度
    selectCategory (category) {
      this.selectedCategory = category
      // 篩選全部商品時，重新取得 this.products 內的 isFavorite值，同步收藏按鈕
      if (category === '') {
        this.products = this.products.map(product => {
          const matchingProduct = this.allProducts.find(p => p.id === product.id)
          return matchingProduct ? { ...product, isFavorite: matchingProduct.isFavorite } : product
        })
      } else if (this.search !== '' || category !== '') {
        // 搜尋或篩選非全部商品狀態時，更新 this.allProducts 內的 isFavorite值，同步收藏按鈕
        this.allProducts = this.allProducts.map(item => ({ ...item, isFavorite: this.isProductFavorite(item) }))
      }
      this.scrollToTop()
    },
    // 如果搜尋文字並非中文，就觸發 handleSearchChange
    handleInput () {
      if (!this.isComposing) {
        this.handleSearchChange()
      }
    },
    // 中文輸入開始
    handleCompositionStart () {
      this.isComposing = true
    },
    // 中文輸入結束，結束後觸發 handleSearchChange
    handleCompositionEnd () {
      this.isComposing = false
      this.handleSearchChange()
    },
    // 在搜尋框內容送出時，觸發 selectCategory 篩選
    handleSearchChange () {
      if (this.search === '') {
        this.selectCategory('')
      } else {
        // 只要不是空就可
        this.selectCategory('search')
      }
    }
  },
  mounted () {
    this.emitter.on('emit-category', this.selectCategory)
  },
  beforeUnmount () {
    this.emitter.off('emit-category')
  },
  created () {
    this.getProducts()
    this.getAllProducts()
    this.getCart()
    this.loadFavoritesFromLocalStorage()
  }
}
</script>
