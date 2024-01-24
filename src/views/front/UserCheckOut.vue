<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="my-5 row justify-content-center" >
    <form class="col-md-6" @submit.prevent="payOrder" style="margin-top:85px">
      <table class="table align-middle">
        <thead>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
        </thead>
        <tbody>
        <tr v-for="item in order.products" :key="item.id">
          <td>{{ item.product.title }}</td>
          <td>{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="text-end">{{ $filters.currency(item.final_total) }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2" class="text-end">總計</td>
          <td class="text-end">{{ $filters.currency(order.total) }} 元</td>
        </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
        <tr>
          <th width="100">Email</th>
          <td>{{ order.user.email }}</td>
        </tr>
        <tr>
          <th>姓名</th>
          <td>{{ order.user.name }}</td>
        </tr>
        <tr>
          <th>收件人電話</th>
          <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
          <th>收件人地址</th>
          <td>{{ order.user.address }}</td>
        </tr>
        <tr>
          <th>留言</th>
          <td>{{ order.message }}</td>
        </tr>
        <tr>
          <th>付款狀態</th>
          <td>
            <span v-if="!order.is_paid">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
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
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url)
        .then((res) => {
          console.log('取得資料', res)
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
    }
  },
  created () {
    // 將路由上的id並取出帶入api
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
