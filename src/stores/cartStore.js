import { defineStore } from 'pinia'
import axios from 'axios'
import emitter from '@/methods/emitter.js'

export default defineStore('cartStore', {
  state: () => {
    return {
      cart: {
        carts: []
      },
      quantity: 1, // 加入購物車數量
      isLoading: false,
      status: {
        loadingItem: '' // 對應品項id
      }
    }
  },
  actions: {
    // favorites,shopping,product頁面加入購物車
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: this.quantity
      }
      axios.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        emitter.emit('push-message', {
          style: 'success',
          title: '加入購物車成功'
        })
      })
      this.updateCart(id, false)
      this.quantity = 1
    },
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      axios.get(url)
        .then((res) => {
          this.cart = res.data.data
          this.isLoading = false
        })
    },
    // 更新購物車
    updateCart (item, triggerMessage = true) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true // 轉換購物車數量同時整個頁面loading
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      axios.put(url, { data: cart }).then((res) => {
        this.getCart()
        this.isLoading = false
        // 若為刪除產品所觸發此方法，就不觸發吐司通知
        if (triggerMessage) {
          emitter.emit('push-message', {
            style: 'success',
            title: '更新數量成功'
          })
        }
      })
    },
    // 清空購物車
    clearCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      axios.delete(url).then((res) => {
        this.getCart()
        emitter.emit('push-message', {
          style: 'warning',
          title: '已刪除產品'
        })
      })
    },
    // 刪除購物車產品
    removeCartItem (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      axios.delete(url).then((res) => {
        // 用於判斷updateCart是否為removeCartItem所觸發，避免刪除時觸發更新產品通知
        const triggerMessage = false
        this.updateCart(item, triggerMessage)
        emitter.emit('push-message', {
          style: 'warning',
          title: '已刪除產品'
        })
      })
    },
    // product頁面 減少數量
    productDecrementQuantity (qty) {
      if (qty > 1) {
        this.quantity--
      }
    },
    // product頁面 增加數量
    productIncrementQuantity (qty) {
      this.quantity++
    },
    // cart頁面 減少數量
    decrementQuantity (item, qty) {
      if (qty > 1) {
        item.qty--
      }
      this.updateCart(item)
    },
    // cart頁面 增加數量
    incrementQuantity (item, qty) {
      if (qty < item.product.unit) {
        item.qty++
      }
      this.updateCart(item)
    }
  },
  getters: {
    cartLength: function (state) {
      return state.cart.carts.length
    }
  }
})
