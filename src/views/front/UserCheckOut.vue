<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>

  <div class="banner bg-user-checkout">
    <div class="mask"></div>
    <h2>付款確認</h2>
  </div>

  <div class="order-progress mt-5">
    <ul>
      <li><i class="fa-solid fa-list-check"></i>確認訂單</li>
      <li><i class="fa-regular fa-pen-to-square"></i>資料填寫</li>
      <li class="active"><i class="fa-solid fa-money-check-dollar"></i>付款完成</li>
    </ul>
  </div>

  <div class="container">
    <div class="my-5 row justify-content-center">
      <div class="col-12 col-md-8 col-xl-7 check-out">
        <div class="card-header">
          <h2 class="text-center py-3">訂單資訊</h2>
        </div>
        <div class="frame">
          <div v-if="order.is_paid === true" class="d-flex flex-column text-center pay-success">
            <i class="fa-solid fa-check mb-2"></i>
            <h5>付款成功</h5>
            <div class="mt-2 mb-2">訂單編號：{{ order.id }}  <i @click="copyText" class="fa-regular fa-copy"></i></div>
            <router-link to="/user/shopping" @click.prevent="scrollToTop">
              <button type="button" class="button w-100">繼續購物</button>
            </router-link>
          </div>
          <div v-else>
            <div class="text-end create">
              <h5>訂單成立時間：{{ $filters.date(order.create_at) }}</h5>
            </div>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    商品資訊
                  </button>
                </h2>
                <div id="collapseOne"  v-for="item in order.products" :key="item.id"
                  class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div class="d-flex align-items-center product">
                      <div>
                        <img :src="item.product.imageUrl" alt="產品圖片" style="width: 100px; height: 100px;">
                      </div>
                      <div class="d-flex flex-column">
                        <h5>{{ item.product.title }}</h5>
                        <p>數量：{{ item.qty }}</p>
                      </div>
                      <div class="ms-auto">
                        <div v-if="item.final_total">NT$ {{ $filters.currency(item.final_total) }}</div>
                        <div v-else>>NT$ {{ $filters.currency(item.product.price) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <table>
                <tbody>
                  <tr>
                    <td>訂單編號</td>
                    <td>{{ order.id }} <i @click="copyText" class="fa-regular fa-copy"></i></td>
                  </tr>
                  <tr>
                    <td>付款方式</td>
                    <td>{{ order.user.pay }}</td>
                  </tr>
                  <tr>
                    <td>姓名</td>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <td>手機</td>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <td>E-mail</td>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <td>收件地址</td>
                    <td>{{ order.user.address }}</td>
                  </tr>
                  <tr>
                    <td>備註</td>
                    <td v-if="!order.message">無</td>
                    <td v-else>{{ order.message }}</td>
                  </tr>
                  <tr v-if="calcTotal < 3000">
                    <td>小計</td>
                    <td>NT$ {{ $filters.currency(order.total) }}</td>
                  </tr>
                  <tr>
                    <td>運費</td>
                    <td v-if="calcTotal < 3000">+ $120</td>
                    <td v-else>恭喜達成免運！</td>
                  </tr>
                  <tr>
                    <td>金額總計</td>
                    <td v-if="calcTotal < 3000">NT$ {{ $filters.currency(parseInt(order.total)+120) }}</td>
                    <td v-else>NT$ {{ $filters.currency(order.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center">
              <button type="button" class="button" @click.prevent="payOrder">確認付款</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scrollButton from '@/mixins/scrollButton'

export default {
  data () {
    return {
      order: {
        // 因畫面渲染的 user沒有用 v-for或是迴圈等方式就要預先定義 user: {}，告訴瀏覽器 user 這是一個物件，
        // 我要用物件取值的方式渲染出來，否則瀏覽器無法解析
        user: {}
      },
      isLoading: false,
      orderId: ''
    }
  },
  mixins: [scrollButton],
  inject: ['emitter'],
  computed: {
    // 每筆訂單原始金額加總
    calcTotal () {
      if (!this.order?.products) {
        return 0
      }
      const orderArray = Object.values(this.order?.products)
      // 使用 reduce 將每個訂單的 total 屬性加總
      return orderArray.reduce((accumulator, order) => {
        return accumulator + order.total
      }, 0)
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order
          }
        })
    },
    payOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(url)
        .then((res) => {
          console.log('付款成功', res)
          if (res.data.success) {
            // 成功後會將order.is_paid改為true
            // 付款完成重新取得資料渲染頁面
            this.getOrder()
          }
        })
    },
    copyText () {
      const textToCopy = this.order.id
      const textarea = document.createElement('textarea')
      textarea.value = textToCopy
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      this.emitter.emit('push-message', {
        style: 'success',
        title: '已複製訂單編號'
      })
    }
  },
  created () {
    // 將路由上的id並取出帶入api
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
