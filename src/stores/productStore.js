import axios from 'axios'
import { defineStore } from 'pinia'
// import { statusStore } from './statusStore'

// const status = statusStore()

export default defineStore('productStore', {
  state: () => ({
    cart: []
  }),
  actions: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      axios.get(url)
        .then((res) => {
          this.cart = res.data.data
          // this.isLoading = false
        })
    }
  }
})
