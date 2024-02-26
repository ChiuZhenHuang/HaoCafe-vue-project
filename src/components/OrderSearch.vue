<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">查詢訂單{{ orders }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mt-2 mb-1">
            <input type="search" value="" v-model="orderNumber" placeholder="請輸入訂單編號">
            <button @click.prevent="getOrders"><i class="bi bi-search"></i></button>
          </div>
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
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
      modal: '',
      orderNumber: '' // 用戶輸入訂單編號
    }
  },
  computed: {
    ...mapState(cartStore, ['orders'])
  },
  methods: {
    ...mapActions(cartStore, ['getOrders'])
  },
  created () {
  },
  mixins: [modalMixin]
}
</script>
