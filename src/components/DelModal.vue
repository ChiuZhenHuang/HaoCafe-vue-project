<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title">刪除訂單</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>是否確定要刪除訂單編號{{ item.id }}?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <!-- 因item資料為外層傳入，因此確定刪除emit觸發外層方法時，外層知道要刪的是哪一筆資料 -->
          <button type="button" class="btn btn-danger" @click="$emit('del-item')">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: {
    item: {}
  },
  data () {
    return {
      modal: ''
    }
  },
  mixins: [modalMixin]
}
</script>
