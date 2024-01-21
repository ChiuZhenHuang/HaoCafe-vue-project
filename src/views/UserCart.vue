<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                  :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            </td>
            <td><a href="#" class="text-dark">{{ item.title }}</a></td>
            <td>
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
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
        <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
      </div>
      <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>庫存數</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="status.loadingItem === item.id"
                          @click="removeCartItem(item)">
                          <i class="bi bi-trash"></i>
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control" min="1" :max="item.product.unit"
                          v-model.number="item.qty"
                          :disabled="status.loadingItem === item.id"
                          @change="updateCart(item)">
                  </div>
                </td>
                  <td><div class="input-group-text">{{ item.product.unit }} 件</div></td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr  v-if="cart.final_total == cart.total">
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-else>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end"><del>{{ $filters.currency(cart.total) }}</del></td>
            </tr>
            <!-- 如果最終價格和總計價格不同再顯示(已使用優惠券) -->
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end">已折扣金額</td>
              <td class="text-end">{{ $filters.currency(cart.total - cart.final_total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">應付金額</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 建立訂單表單 -->
    <div class="my-5 row justify-content-center">
      <Form class="col-md-6" v-slot="{ errors }"
            @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email" rules="email|required"
                  v-model="form.user.email"></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名" rules="required"
                  v-model="form.user.name"></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field id="tel" name="電話" type="tel" class="form-control"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話" :rules="isPhone"
                  v-model="form.user.tel"></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址" rules="required"
                  v-model="form.user.address"></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10"
                    v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '' // 對應品項id
      },
      cart: {}, // 存放目前已加至購物車內產品
      coupon_code: '', // 用戶輸入優惠券號碼
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      pagination: {},
      isLoading: false
    }
  },
  components: { Pagination },
  inject: ['emitter'],
  methods: {
    // 驗證電話是否正確
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
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
    },
    // 更新購物車數量
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true // 轉換購物車數量同時整個頁面loading
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        // console.log(res)
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    // 送出訂單表單
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.isLoading = true
      const order = this.form
      // 將用戶建立訂單資料傳到api
      this.$http.post(url, { data: order }).then((res) => {
        console.log(res)
        this.$httpMessageState(res, '訂單送出')
        this.getCart()
      })
    },
    // 刪除購物車品項
    removeCartItem (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.delete(url).then((res) => {
        this.updateCart(item)
        this.emitter.emit('push-message', {
          style: 'warning',
          title: '已刪除產品'
        })
      })
    },
    // 套用優惠券
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.$http.post(url, { data: coupon })
        .then((res) => {
          console.log(res)
          this.$httpMessageState(res, '套用優惠券')
          this.getCart()
          // 優惠碼使用成功後清除優惠碼資料
          this.coupon_code = ''
        })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
