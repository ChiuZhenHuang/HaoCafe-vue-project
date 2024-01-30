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
  // props: ['isFavorites'],
  data () {
    return {
      isFavorites: []
      // product: []
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
  // 在 Vue 實例創建時，從 localStorage 中加載收藏資料
    this.loadFavoritesFromLocalStorage()
  },
  methods: {
    // 取得儲存收藏產品資料
    loadFavoritesFromLocalStorage () {
      const favoritesData = JSON.parse(localStorage.getItem('favorites')) || []
      // 然後你可以將資料設置到 Vue 實例的數據屬性中
      this.isFavorites = favoritesData
    }
  }
}
</script>
