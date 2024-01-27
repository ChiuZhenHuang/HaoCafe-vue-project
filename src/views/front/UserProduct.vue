<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container"  style="margin-top:85px">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/shopping">更多商品</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.category }}</li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <div class="col-8">
        <h2>{{ product.title }}</h2>
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
        <img v-for="(image, index) in product.images" :key="index" :src="image" alt="" class="img-fluid mb-3">
        <div>{{ product.description }}</div>
        <div>{{ product.content }}</div>
      </div>
      <div class="col-4">
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      id: '',
      status: {
        loadingItem: '' // 對應品項id
      }
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          // 將品項資料讀取後帶入
          this.product = response.data.product
        }
      })
    },
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        console.log(res)
        this.status.loadingItem = ''
        this.$httpMessageState(res, '加入購物車')
        // this.$router.push('/user/cart')
      })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
