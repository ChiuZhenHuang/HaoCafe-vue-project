<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container-fluid shop" >
    <div class="row">
    <!-- 左側選單 -->
      <div class="col-12 col-md-2">
        <ul class="list-group">
          <li>
            <input type="search" v-model="search" value="" placeholder="" @input="handleSearchChange">
            <button><i class="bi bi-search"></i></button>
          </li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('')">全部商品</li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('淺烘培')">淺烘培</li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('中烘培')">中烘培</li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('深烘培')">深烘培</li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('周邊商品')">周邊商品</li>
        </ul>
      </div>
      <!-- 右側產品 -->
      <div class="col-12 col-md-10">
        <div class="row">
          <div class="col-12 col-md-6 col-xl-4" v-for="item in filterProducts" :key="item.id">
            <table class="table align-middle">
              <tbody>
                <tr>
                  <td style="width: 150px">
                    <div style="height: 100px; background-size: cover; background-position: center"
                      :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                  </td>
                  <td><p class="text-dark" style="cursor: pointer" @click="getProduct(item.id)">{{ item.title }}</p></td>
                  <td>
                    <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                    <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                    <div class="h5" v-if="item.price">特價 {{ item.price }} 元</div>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button type="button" class="btn btn-outline-secondary"
                          @click="getProduct(item.id)">
                        查看更多
                      </button>
                      <button type="button" class="btn btn-outline-danger"
                      :disabled="this.status.loadingItem === item.id"
                            @click="addCart(item.id)">
                          <span v-if="this.status.loadingItem === item.id" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        加到購物車
                      </button>
                      <button v-if="!item.isFavorite" type="button" class="btn btn-outline-info" @click="addToFavorites(item)">收藏</button>
                      <button v-else type="button" class="btn btn-outline-info" @click="removeToFavorites(item)">移除收藏</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 顯示全部商品時才顯示頁數 -->
          <Pagination v-if="selectedCategory === ''" :pages="pagination" @emit-pages="getProducts"></Pagination>
          <!-- <Favorites :isFavorites="favorites"></Favorites> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
// import Favorites from '@/views/front/Favorites.vue'

export default {
  data () {
    return {
      products: [],
      search: '',
      selectedCategory: '', // 烘培類型
      status: {
        loadingItem: '' // 對應品項id
      },
      pagination: {},
      isLoading: false,
      favorites: [], // 收藏的商品
      love: [] // 存放是否已收藏
    }
  },
  components: { Pagination },
  inject: ['emitter'],
  computed: {
    // 搜尋及篩選
    filterProducts () {
      return this.products.filter(item => {
        const titleMatch = item.title.match(new RegExp(this.search, 'i'))
        const categoryMatch = !this.selectedCategory || item.category === this.selectedCategory
        return titleMatch && categoryMatch
      })
    }
  },
  methods: {
    getProducts (page = 1) {
      // 一頁最多只能取得10筆資料
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        console.log('products:', res)
        this.products = res.data.products
        this.isLoading = false
        this.pagination = res.data.pagination
        this.love = res.data.products.map(item => ({ ...item, isFavorite: false })) // 添加isFavorite屬性，用於收藏功能
      })
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
          this.getCart()
        })
    },
    // 加到收藏,畫面重新渲染資料就消失??
    addToFavorites (item) {
      console.log(item)
      const isAlreadyFavorite = this.favorites.some(favProduct => favProduct.id === item.id)
      if (!isAlreadyFavorite) {
        this.favorites.push(item)
        this.saveFavoritesToLocalStorage()
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已加入收藏'
        })
      }
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
    // loadFavoritesFromLocalStorage () {
    // // 從 localStorage 中加載資料，如果有的話
    //   const storedFavorites = localStorage.getItem('favorites')
    //   this.isFavorites = storedFavorites ? JSON.parse(storedFavorites) : []
    // },
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
    // 篩選烘培度
    selectCategory (category) {
      this.selectedCategory = category
    },
    // 在搜尋框內容改變時，觸發 selectCategory 方法
    handleSearchChange () {
      this.selectCategory()
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
  // mounted () {
  //   this.loadFavoritesFromLocalStorage()
  // }
}
</script>
