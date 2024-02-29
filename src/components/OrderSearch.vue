<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog  modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <strong class="modal-title">查詢訂單</strong>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click.prevent="closeModal"></button>
        </div>
        <div class="modal-body">
          <div class="mt-2 mb-1 orderSearch-input-list">
            <input type="search" value="" v-model="orderNumber" placeholder="請輸入訂單編號">
            <button @click.prevent="searchOrder"><i class="bi bi-search"></i></button>
          </div>
          <div v-if="orderId === '未找到訂單'" class="text-center">
            <h5>查無相關訂單</h5>
          </div>
          <table v-else v-show="showOrderInformation" @click.prevent="pushToOrder" class="order-information mt-3 mb-3">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>訂購人</th>
                <th>訂單金額</th>
                <th>付款狀態</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ orderId }}</td>
                <td>{{ userName }}</td>
                <td>{{ $filters.currency(total) }}</td>
                <td>{{ isPaid ? '已付款' : '未付款' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" @click.prevent="searchOrder">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  data () {
    return {
      modal: '',
      orderNumber: '', // 用戶輸入訂單編號
      ordersList: [],
      orderId: '',
      userName: '',
      isPaid: '',
      total: '',
      showOrderInformation: false
    }
  },
  inject: ['emitter'],
  computed: {
  },
  methods: {
    async getOrders () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`
      await this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.ordersList = res.data.orders
          }
        })
    },
    async searchOrder () {
      await this.getOrders()
      this.showOrderInformation = true
      if (this.ordersList) {
        // 比對id尋找訂單
        const foundOrder = this.ordersList.find(item => item.id === this.orderNumber)
        this.orderId = foundOrder ? foundOrder.id : '未找到訂單'
        this.total = foundOrder ? foundOrder.total : '未找到金額'
        this.userName = foundOrder ? foundOrder.user.name : '未找到姓名'
        this.isPaid = foundOrder ? foundOrder.is_paid : '未找到付款資訊'
        this.orderNumber = ''
      } else {
        console.error('無法獲取訂單數據')
      }
    },
    closeModal () {
      this.orderId = ''
      this.total = ''
      this.userName = ''
      this.isPaid = ''
      this.orderNumber = ''
      this.showOrderInformation = false
      this.hideModal()
    },
    pushToOrder () {
      this.$router.push(`/user/checkout/${this.orderId}`).then(() => {
        window.location.reload()
      })
    }
  },
  created () {
  },
  mixins: [modalMixin]
}
</script>
