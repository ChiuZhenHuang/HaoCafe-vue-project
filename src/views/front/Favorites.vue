<template>
  <div>
    <ul>
      <li v-for="item in isFavorites" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
    收藏產品數量： {{ isFavorites.length }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFavorites: []
    }
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
