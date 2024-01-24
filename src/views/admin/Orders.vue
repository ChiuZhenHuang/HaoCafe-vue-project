<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
    <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">購買時間</th>
        <th width="120">名字</th>
        <th>email</th>
        <th width="120">購買品項</th>
        <th width="120">應付金額</th>
        <!-- 考慮加上顯示是否使用優惠 -->
        <th width="100">是否付款</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody v-for="(item, key) in orders" :key="key">
      <!-- <tr v-if="orders.length"
            :class="{'text-secondary': !item.is_paid}"> -->
      <tr>
        <td>{{ $filters.date(item.create_at) }}</td>
        <td>{{ item.user.name }}</td>
        <td><span v-text="item.user.email" v-if="item.user"></span></td>
        <td>
            <ul class="list-unstyled" style="width: 150px;">
              <li v-for="(product, i) in item.products" :key="i">
              (  {{ product.product.title }} ) *{{ product.qty }}
              </li>
            </ul>
          </td>
        <td class="text-right">
          {{ $filters.currency(item.total) }}
        </td>

        <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`"
                    v-model="item.is_paid"
                    @change="updatePaid(item)">
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                      @click="openModal(item)">檢視</button>
              <button class="btn btn-outline-danger btn-sm"
                      @click="openDelOrderModal(item)"
              >刪除</button>
            </div>
          </td>
      </tr>
    </tbody>
  </table>
  <OrderModal ref="orderModal" :order="tempOrder"></OrderModal>
  <DelModal ref="delModal" :item="tempOrder" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
</template>

<script>
import OrderModal from '@/components/orderModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      orders: {}, // 所有訂單資料
      pagination: {}, // 分頁資訊
      tempOrder: {}, // 單筆訂單資料
      isLoading: false,
      currentPage: 1
    }
  },
  components: {
    OrderModal,
    DelModal,
    Pagination
  },
  // 帶入emitter功能，才能使吐司元件正常顯示
  inject: ['emitter'],
  methods: {
    // 取得訂單資料
    getOrders (currentPage = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            console.log(res)
            this.orders = res.data.orders
            this.pagination = res.data.pagination
          }
        })
    },
    // 打開檢視訂單資料
    openModal (item) {
      this.tempOrder = { ...item }
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    },
    // 打開確定刪除頁面
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delModal = this.$refs.delModal
      delModal.showModal()
    },
    // 刪除訂單
    delOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        this.$refs.delModal.hideModal()
        if (res.data.success) {
          this.getOrders()
          this.emitter.emit('push-message', {
            style: 'warning',
            title: '已刪除產品'
          })
        }
      })
    },
    // 更新付款狀態
    updatePaid (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((response) => {
        this.isLoading = false
        this.getOrders(this.currentPage)
        this.$httpMessageState(response, '更新付款狀態')
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
