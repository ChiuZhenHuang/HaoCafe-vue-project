<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">查詢訂單</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <li class="mt-2 mb-1">
            <input type="search" value="" v-model="orderNumber" placeholder="請輸入訂單編號">
            <button><i class="bi bi-search"></i></button>
          </li>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn">確定</button>
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
      orderNumber: '' // 訂單編號
    }
  },
  methods: {
  },
  created () {
  },
  mixins: [modalMixin]
}
</script>
