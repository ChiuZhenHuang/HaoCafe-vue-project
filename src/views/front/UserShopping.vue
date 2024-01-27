<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container" style="margin-top:85px">

  <div class="row">
    <!-- 左側選單 -->
    <div class="col-12 col-md-2">
      <ul class="list-group">
        <li class="list-group-item">淺烘培</li>
        <li class="list-group-item">中烘培</li>
        <li class="list-group-item">深烘培</li>
        <li class="list-group-item">周邊商品</li>
      </ul>
    </div>
    <!-- 右側產品 -->
    <div class="col-12 col-md-10 ">
      <div class="row">
        <div class="col-12 col-md-6 col-xl-4" v-for="item in products" :key="item.id">
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
        <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
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
      // product: {},
      status: {
        loadingItem: '' // 對應品項id
      },
      pagination: {},
      isLoading: false
    }
  },
  components: { Pagination },
  inject: ['emitter'],
  methods: {
    // 驗證電話是否正確
    // isPhone (value) {
    //   const phoneNumber = /^(09)[0-9]{8}$/
    //   return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    // },
    // 取得產品列表資料
    getProducts (page = 1) {
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
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
