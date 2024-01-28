<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container" style="margin-top:85px">

    <div class="row">
    <!-- 左側選單 -->
      <div class="col-12 col-md-2">
        <ul class="list-group">
          <input type="search" v-model="search" @input="handleSearchChange">
          <li class="list-group-item" style="cursor: pointer" @click="showTotalProducts">全部商品</li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('淺烘培')">淺烘培</li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('中烘培')">中烘培</li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('深烘培')">深烘培</li>
          <li class="list-group-item" style="cursor: pointer" @click="selectCategory('周邊商品')">周邊商品</li>
        </ul>
      </div>
      <!-- 右側產品 -->
      <div class="col-12 col-md-10 ">
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
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 如果篩選的內容超過10個再顯示頁面的選擇，但是按到第二頁後會變成頁面鈕又消失，需再改-->
          <Pagination v-if="filterProducts.length >=10" :pages="pagination" @emit-pages="getProducts"></Pagination>
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
      products: [],
      search: '',
      selectedCategory: '', // 烘培類型
      status: {
        loadingItem: '' // 對應品項id
      },
      pagination: {},
      isLoading: false
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
    // 顯示全部商品
    showTotalProducts (page = 1) {
      this.selectedCategory = ''
      this.getProducts()
    },
    // 篩選烘培度
    selectCategory (category) {
      this.selectedCategory = category
      // 需取得所有產品資料(含後面頁數資料),更換api
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        this.products = res.data.products
        this.filterProduct(res.data.products) // 新增
        this.isLoading = false
      })
    },
    // 在搜尋框內容改變時，觸發 selectCategory 方法
    handleSearchChange () {
      this.selectCategory()
    },
    // 所有產品內搜尋內容
    filterProduct (allProducts) {
      this.products = allProducts.filter(item => {
        return item.title.match(new RegExp(this.search, 'i'))
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
