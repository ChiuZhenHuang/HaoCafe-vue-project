<template>
  <div>
    <ul>
      <li v-for="item in isFavorites" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFavorites: []
    }
  },
  computed: {
    // product () {
    //   if (Array.isArray(this.isFavorites)) {
    //     return [...this.isFavorites] // 使用複製的陣列以觸發重新渲染
    //   } else {
    //     console.error('isFavorites is not an array')
    //     return []
    //   }
    // }
  },
  created () {
  // 從 localStorage 中加載收藏資料
    this.loadFavoritesFromLocalStorage()
  },
  methods: {
    // 取得儲存收藏產品資料
    loadFavoritesFromLocalStorage () {
      const favoritesData = JSON.parse(localStorage.getItem('favorites')) || []
      this.isFavorites = favoritesData
    }
  }
}
</script>
