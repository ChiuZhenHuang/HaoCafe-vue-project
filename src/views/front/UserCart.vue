<template>
<LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container" style="margin-top:85px">
    <div class="row mt-4">
      <!-- 購物車內商品  -->
      <div class="col-md-10 offset-md-2" >
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>庫存數</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          @click="removeCartItem(item)">
                          <i class="bi bi-trash"></i>
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券( {{ item.coupon.title }} )
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control" min="1" :max="item.product.unit"
                          v-model.number="item.qty"
                          @change="updateCart(item)">
                  </div>
                </td>
                <td>
                  <div class="input-group">{{ item.product.unit }} 件</div>
                </td>
                <td class="text-end">
                  <!-- v-if="cart.final_total !== cart.total" -->
                  <small  v-if="item.coupon" class="text-success">金額：</small>
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
              <td colspan="3" class="text-end">已折扣</td>
              <td class="text-end">{{ $filters.currency(cart.total - cart.final_total) }}</td>
            </tr>
            <!-- 如果購物車內有商品才顯示運費資訊 -->
            <tr v-show="cart.final_total < 3000 && cart.carts.length > 0">
              <td colspan="3" class="text-end">運費</td>
              <td class="text-end">+$ 120 (只差NT$ {{ $filters.currency(3000-parseInt(cart.final_total)) }}達成免運！)</td>
            </tr>
            <tr v-show="cart.final_total >= 3000">
              <td colspan="3" class="text-end">恭喜達成免運！</td>
            </tr>
            <tr v-show="cart.total < 3000">
              <td colspan="3" class="text-end text-success">應付金額</td>
              <td class="text-end text-success">{{ $filters.currency(parseInt(cart.final_total)+120) }}</td>
            </tr>
            <tr v-show="cart.total >= 3000">
              <td colspan="3" class="text-end text-success">應付金額</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input  type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
          <button class="btn btn-success" @click="pushForm">確認訂單</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      cart: {}, // 存放目前已加至購物車內產品
      coupon_code: '', // 用戶輸入優惠券號碼
      isLoading: false
    }
  },
  // components: { Pagination },
  inject: ['emitter'],
  // watch: {
  //   'cart.carts': {
  //     handler (newCarts, oldCarts) {
  //       // 檢查新的購物車數據中的第一個產品是否有 coupon 屬性
  //       if (newCarts.length > 0 && newCarts[0].coupon) {
  //         const couponContent = newCarts[0].coupon
  //         newCarts.forEach(product => {
  //           if (typeof product.coupon === 'object') {
  //             product.coupon = couponContent
  //           } else {
  //             // 如果 coupon 不是物件，創建一個包含 code 的新物件
  //             product.coupon = { ...couponContent }
  //           }
  //         })
  //       }
  //       // this.getCart()
  //     },
  //     deep: true
  //   }
  // },
  methods: {
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
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        // console.log(res)
        this.getCart()
        // this.$httpMessageState(res, '更新數量')
        // 若刪除品項會同時觸發導致更新數量失敗
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
          localStorage.setItem('coupon_code', this.coupon_code)
          // 優惠碼使用成功後清除優惠碼資料
          this.coupon_code = ''
        })
    },
    saved () {
      const savedCouponCode = localStorage.getItem('coupon_code')
      // 將讀取的值設置為組件的 coupon_code
      if (savedCouponCode !== null) {
        this.coupon_code = savedCouponCode
      }
    },
    // 前往填寫訂單資料
    pushForm () {
      this.$router.push('/user/form')
    }
  },
  created () {
    this.getCart()
  }
}
</script>
