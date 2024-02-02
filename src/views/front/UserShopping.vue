<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container-fluid shop">
    <div class="row">
    <!-- 左側選單 -->
      <div class="col-12 col-md-2 select">
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
      <!-- 右側產品 -->
      <div class="col-12 col-md-10" id="product">
        <div class="row">
          <div class="col-12 col-md-6 col-xl-4 frame" v-for="item in filterProducts" :key="item.id">
            <div class="card">
              <div class="card-top">
                <button v-if="!item.isFavorite" type="button" class="btn btn-outline-info" @click="addToFavorites(item)">
                  <i class="bi bi-heart"></i>
                </button>
                <button v-else type="button" class="btn btn-outline-info" @click="removeToFavorites(item)">
                  <i class="bi bi-heart-fill"></i>
                </button>
                <img :src="item.imageUrl" class="card-img-top" alt="產品圖片">
                <div class="more">
                  <button type="button" class="btn btn-outline-secondary"
                    @click="getProduct(item.id)">More...
                  </button>
                </div>
              </div>
              <div class="card-body h-100 w-100">
                <h5 class="title" style="cursor: pointer" @click="getProduct(item.id)">{{ item.title }}</h5>
                <div class="d-flex justify-content-between">
                  <div class="left">
                    <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                    <del class="h5" v-if="item.price">NT$ {{ item.origin_price }} 元</del>
                    <div class="h6" v-if="item.price">NT$ {{ item.price }} 元/盒</div>
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
          <!-- 渲染全部商品時才顯示頁數 -->
          <Pagination v-if="selectedCategory === '' && search === '' " :pages="pagination" @emit-pages="getProducts"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      visible: true,
      products: [], // 單頁產品
      allProducts: [], // 所有產品
      search: '', // 搜尋內容
      selectedCategory: '', // 烘培類型
      status: {
        loadingItem: '' // 對應品項id
      },
      pagination: {}, // 分頁
      isLoading: false, // 整個頁面loading
      favorites: [], // 收藏的商品
      isActive: false, // 篩選欄是否被選擇
      isComposing: false // 是否進行中文輸入
    }
  },
  components: { Pagination },
  inject: ['emitter'],
  computed: {
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
    // 取得單頁產品資料
    getProducts (page = 1) {
      // 一頁最多只能取得10筆資料
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        this.isLoading = false
        this.pagination = res.data.pagination
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
      this.$router.push(`/user/product/${id}`)
    },
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data
          this.isLoading = false
          console.log('購物車產品', this.cart)
        })
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
          this.getCart()
        })
    },
    // 收藏產品比對頁面產品
    isProductFavorite (product) {
      return this.favorites.some(favProduct => favProduct.id === product.id)
    },
    // 加到收藏
    addToFavorites (item) {
      this.favorites.push(item)
      this.saveFavoritesToLocalStorage()
      this.emitter.emit('push-message', {
        style: 'success',
        title: '已加入收藏'
      })
      item.isFavorite = true
    },
    // 移除收藏
    removeToFavorites (item) {
      const index = this.favorites.findIndex(favProduct => favProduct.id === item.id)
      if (index !== -1) {
        this.favorites.splice(index, 1)
        this.saveFavoritesToLocalStorage()
        this.emitter.emit('push-message', {
          style: 'warning',
          title: '已移除收藏'
        })
      }
      item.isFavorite = false
    },
    // 將收藏資料儲存LocalStorage
    saveFavoritesToLocalStorage () {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    // 從 localStorage 中提取資料到 favorites
    loadFavoritesFromLocalStorage () {
      const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || []
      this.favorites = favoritesFromStorage
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
  created () {
    this.getProducts()
    this.getCart()
    this.getAllProducts()
    this.loadFavoritesFromLocalStorage()
  }
}
</script>
