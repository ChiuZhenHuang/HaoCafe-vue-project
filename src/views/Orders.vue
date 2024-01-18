<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
    <table class="table mt-4">
    <thead>
      <!-- v-for="(item, key) in orders" :key="key" -->
      <tr>
        <th width="120">購買時間</th>
        <th>email</th>
        <th width="120">購買款項</th>
        <th width="120">應付金額</th>
        <th width="100">是否付款</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>購買時間1</td>
        <td>email1</td>
        <td class="text-right">
          <!-- 全域屬性，千分位方法 -->
          購買款項1
        </td>
        <td class="text-right">
          應付金額1
        </td>
        <td>
          <span class="text-success">是否付款1</span>
          <!-- <span class="text-muted">未啟用</span> -->
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">檢視</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <OrderModal ref="orderModal" :order="tempOrder" ></OrderModal> -->
</template>

<script>
// import OrderModal from '../components/orderModal.vue'

export default {
  data () {
    return {
      orders: {}, // 所有訂單資料
      pagination: {}, // 分頁資訊
      tempOrder: {}, // 單筆訂單資料
      isLoading: false
    }
  },
  components: {
    // OrderModal
  },
  methods: {
    getOrders () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            // this.orders = res.data.orders
            // this.pagination = res.data.pagination
          }
        })
    },
    openModal (item) {
      // this.tempOrder = { ...item }
      // const orderComponent = this.$refs.orderModal
      // orderComponent.showModal()
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
