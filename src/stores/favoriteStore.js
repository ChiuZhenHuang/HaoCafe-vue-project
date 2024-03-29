import { defineStore } from 'pinia'
import emitter from '@/methods/emitter.js'

export default defineStore('favoriteStore', {
  state: () => {
    return {
      isFavorites: []
    }
  },
  actions: {
    // 取得儲存收藏產品資料
    loadFavoritesFromLocalStorage () {
      const favoritesData = JSON.parse(localStorage.getItem('favorites')) || []
      this.isFavorites = favoritesData
    },
    // 將收藏資料儲存LocalStorage
    saveFavoritesToLocalStorage () {
      localStorage.setItem('favorites', JSON.stringify(this.isFavorites))
    },
    // 收藏產品比對頁面產品，用於產品頁面新增判斷，是否為收藏產品
    isProductFavorite (product) {
      return this.isFavorites.some(favProduct => favProduct.id === product.id)
    },
    // 加到收藏
    addToFavorites (item) {
      this.isFavorites.push(item)
      emitter.emit('push-message', {
        style: 'success',
        title: '已加入收藏'
      })
      item.isFavorite = true
      // 先變更isFavorite的值再儲存至localStorage
      this.saveFavoritesToLocalStorage()
    },
    // 移除收藏
    removeToFavorites (item) {
      const index = this.isFavorites.findIndex(favProduct => favProduct.id === item.id)
      if (index !== -1) {
        this.isFavorites.splice(index, 1)
        emitter.emit('push-message', {
          style: 'warning',
          title: '已移除收藏'
        })
      }
      item.isFavorite = false
      this.saveFavoritesToLocalStorage()
    },
    // 清空 isFavorites 及LocalStorage
    clearFavorites () {
      this.isFavorites = []
      localStorage.removeItem('favorites')
    }
  },
  getters: {
    favoritesLength: function (state) {
      return state.isFavorites.length
    }
  }
})
