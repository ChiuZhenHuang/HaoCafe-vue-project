<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="text-end">
    <button type="button" class="btn btn-primary" @click="openModal(true)">增加一個產品</button>
  </div>
    <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          {{ item.origin_price }}
        </td>
        <td class="text-right">
          {{ item.price }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- props給內層的product為這裡的tempProduct資料 -->
  <!-- 內層emit出來的資料觸發updateProduct事件 -->
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <!-- props給內層的item為這裡的tempProduct資料 -->
  <DelModal ref="delModal" :item="tempProduct" @del-item="delProduct"></DelModal>
</template>

<script>
import ProductModal from '../components/ProductsModal.vue'
import DelModal from '../components/DelModal.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal
  },
  // 取得外層provide進來的emitter功能
  inject: ['emitter'],
  methods: {
    // 取得最新資料
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`
      this.isLoading = true // 讀取資料時觸發loading效果
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false // 讀取資料完成關閉loading效果
          if (res.data.success) {
            // 將api資料傳入本地
            this.products = res.data.products
            this.pagination = res.data.pagination
          }
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    // 開啟刪除
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delModal = this.$refs.delModal
      delModal.showModal()
    },
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((res) => {
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        // 如果成功刪除，
        if (res.data.success) {
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'warning',
            title: '已刪除產品'
          })
        }
      })
    },
    updateProduct (item) {
      // 用tempProduct接收emit出來的參數(使用者輸入後的資料)
      this.tempProduct = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'

      // 編輯
      // isNew為false時為編輯資料，因此取反值變為true才能進入編輯api，反之如果為true時(新增)就不會觸發if進入
      // if進入編輯api方式為將定義好的api及httpMethod變數重新賦值
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      // 將productModal元件帶入變數
      const productComponent = this.$refs.productModal
      // 將http方法用[]帶入
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        console.log(response)
        // 關閉productModal頁面，使用元件內的方法
        productComponent.hideModal()
        if (response.data.success) {
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、')
            // 將更新失敗產生的message帶入分別渲染到畫面
          })
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
