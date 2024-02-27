<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">查詢訂單</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mt-2 mb-1 orderSearch-input-list">
            <input type="search" value="" v-model="orderNumber" placeholder="請輸入訂單編號">
            <button @click.prevent="searchOrder"><i class="bi bi-search"></i></button>
          </div>
          <div>{{ OrderId }}</div>
          <div>{{ userName }}</div>
          <div>{{ isPaid }}</div>
          <div>{{ total }}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" @click.prevent="hideModal">確定</button>
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
      OrderId: '',
      userName: '',
      isPaid: '',
      total: ''
    }
  },
  computed: {
  },
  methods: {
    getOrders () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.ordersList = res.data.orders
          }
        })
    },
    searchOrder () {
      console.log('this.ordersList:', this.ordersList)
      if (this.ordersList) {
        // 比對id尋找訂單
        const foundOrder = this.ordersList.find(item => item.id === this.orderNumber)
        this.OrderId = foundOrder ? foundOrder.id : '未找到訂單'
        this.total = foundOrder ? foundOrder.total : '未找到金額'
        this.userName = foundOrder ? foundOrder.user.name : '未找到姓名'
        this.isPaid = foundOrder ? foundOrder.is_paid : '未找到付款資訊'
        this.orderNumber = ''
      } else {
        console.error('無法獲取訂單數據')
      }
    }
    // hideModal 新增方法，關閉畫面時，再把訂單資訊改回 ''
  },
  created () {
    this.getOrders()
  },
  mixins: [modalMixin]
}
</script>
