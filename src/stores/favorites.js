import { defineStore } from 'pinia'

export const statusStore = defineStore('statusStore', {
  state: () => ({
    isFavorites: []
  }),
  getters: {
    favoritesLength: (state) => state.isFavorites.length
  }
})
