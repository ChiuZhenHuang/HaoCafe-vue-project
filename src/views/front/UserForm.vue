<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>

  <div class="l-banner bg-user-form">
    <div class="mask"></div>
    <h2>資料填寫</h2>
  </div>

  <div class="order-progress mt-5">
    <ul>
      <li><i class="fa-solid fa-list-check"></i>確認訂單</li>
      <li class="active"><i class="fa-regular fa-pen-to-square"></i>資料填寫</li>
      <li><i class="fa-solid fa-money-check-dollar"></i>付款完成</li>
    </ul>
  </div>

    <div class="container cart-product">
    <div class="row mt-5 mb-5">
      <div class="col-12 col-md-6 cart-list">
        <div class="cart-frame" v-if="cart.carts">
          <h3>訂單內容</h3>
          <div class="overflow-auto mt-5 mb-2" style="max-height: 500px;">
          <div class="cart-item d-flex justify-content-center" v-for="item in cart.carts" :key="item.id">
            <div class="product-image-container">
              <img :src="item.product.imageUrl" alt="產品圖片">
            </div>
            <div class="d-flex flex-column w-100 info">
              <div class="h-100 d-flex flex-column"  style="justify-content:space-evenly; padding:.5em;">
                <div class="d-flex flex-row">
                  <h5>{{ item.product.title }}</h5>
                </div>
                <h6 class="text-start price">單價：NT$ {{ item.product.price }}</h6>
                <div class="d-flex">
                  <div>
                    數量：{{ item.qty }}
                  </div>
                  <div class="d-flex" style="display: flex; align-items:end;">
                    <div>NT$ {{ $filters.currency(item.product.price*item.qty) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="total mt-3">
            <div class="d-flex w-100 justify-content-between">
              <h3>小計</h3>
              <h3>NT$ {{ $filters.currency(cart.total) }}</h3>
            </div>
            <div class="d-flex w-100 justify-content-between" v-if="hasCoupons">
              <h6>已優惠 <span>{{ cart.carts[0].coupon.title }}</span></h6>
              <h6>-$ {{ $filters.currency(parseInt(cart.total)-parseInt(cart.final_total)) }}</h6>
            </div>
            <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
              <div class="input-group-append">
                <button  type="button" @click="addCouponCode">
                  套用優惠碼
                </button>
              </div>
            </div>
            <div class="d-flex w-100 justify-content-between" v-if="cart.total < 3000">
              <h6>運費</h6>
              <h6>+$120</h6>
            </div>
            <div class="d-flex w-100 justify-content-between" v-else>
              <h6>運費</h6>
              <h4>恭喜達成免運！</h4>
            </div>
            <!-- 沒使用優惠券 -->
            <div class="d-flex w-100 justify-content-between" v-if="!hasCoupons">
              <h5>總計</h5>
              <h5 v-if="cart.total < 3000">NT$ {{ $filters.currency(parseInt(cart.total) + 120) }}</h5>
              <h5 v-else>NT$ {{ $filters.currency(parseInt(cart.total)) }}</h5>
            </div>
            <!-- 有使用優惠券 -->
            <div class="d-flex w-100 justify-content-between" v-else>
              <h5>總計</h5>
              <h5 v-if="cart.total < 3000">NT$ {{ $filters.currency(parseInt(cart.final_total) + 120) }}</h5>
              <h5 v-else>NT$ {{ $filters.currency(cart.final_total) }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 shop-notice">
        <div class="shop-notice-frame">
          <div style="text-align: center;margin-bottom: 2em;">
            <h3>訂購人資訊</h3>
          </div>
          <div>
            <div class="row justify-content-center">
              <Form v-slot="{ errors }" ref="myForm"
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
                  <label for="paymentMethod" class="form-label">付款方式</label>
                  <Field id="paymentMethod" name="付款方式" as="select" class="form-control"
                    :class="{ 'is-invalid': errors['付款方式'] }" rules="required" v-model="form.user.pay">
                    <option value="" disabled selected>請選擇付款方式</option>
                    <option value="貨到付款">貨到付款</option>
                    <option value="ATM銀行轉帳">ATM銀行轉帳</option>
                    <option value="信用卡">信用卡</option>
                    <option value="Apple Pay">Apple Pay</option>
                  </Field>
                  <ErrorMessage name="付款方式" class="invalid-feedback"></ErrorMessage>
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
                  <textarea name="" id="message" class="form-control" cols="30" rows="6"
                  v-model="form.message"></textarea>
                </div>
                <div class="text-end">
                  <button class="next">送出訂單</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 mt-3 route">
        <router-link class="nav-link" to="/user/cart" @click.prevent="scrollToTop">
          <button type="button" class="previous">返回購物車</button>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import scrollButton from '@/mixins/scrollButton'

export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          pay: '',
          address: ''
        },
        message: ''
      },
      coupon_code: '',
      cart: {}, // 存放目前已加至購物車內產品
      isLoading: false,
      total: ''
    }
  },
  inject: ['emitter'],
  mixins: [scrollButton],
  computed: {
    // 用於判斷是否每個商品都有使用優惠
    hasCoupons () {
      return this.cart.carts.every(item => item.coupon)
    }
  },
  methods: {
    // 驗證電話是否正確
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data
          this.total = res.data.data.total
          this.isLoading = false
          console.log('購物車產品', this.cart)
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
    },
    // 送出訂單表單
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.isLoading = true
      const order = this.form
      // 將用戶建立訂單資料傳到api
      this.$http.post(url, { data: order }).then((res) => {
        console.log('送出訂單資料', res)
        this.$httpMessageState(res, '訂單送出')
        this.getCart()
        // 前往付款頁面
        this.$router.push(`/user/checkout/${res.data.orderId}`)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
