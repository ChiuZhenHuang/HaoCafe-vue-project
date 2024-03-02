<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 在第一頁時不顯示 -->
      <li class="page-item" v-if="pages.has_pre">
        <a class="page" href="#" aria-label="Previous" @click.prevent="previousPage(pages)"
        >
        <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page">
        <a class="page" :class="{ 'active': page === pages.current_page }"
        href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <!-- 在最後一頁時不顯示 -->
      <li class="page-item" v-if="pages.has_next">
        <a class="page" href="#" aria-label="Next" @click.prevent="nextPage(pages)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  data () {
    return {
      nowPage: ''
    }
  },
  methods: {
    // 參數為目前的頁數
    updatePage (page) {
      // 向外emit目前頁數做更新
      this.$emit('emit-pages', page)
      this.nowPage = page
      this.scrollToPosition()
    },
    // 參數為外層props進來的資料
    previousPage (page) {
      this.nowPage = page.current_page
      if (this.nowPage > 1) {
        this.nowPage--
      } else {
        this.nowPage = 1
      }
      this.updatePage(this.nowPage)
    },
    // 參數為外層props進來的資料
    nextPage (page) {
      this.nowPage = page.current_page
      if (this.nowPage < page.total_pages) {
        this.nowPage++
      } else {
        this.nowPage = page.total_pages
      }
      this.updatePage(this.nowPage)
    },
    // 使用路由判斷滑動至特定位置
    scrollToPosition () {
      if (this.$route.name === 'user-shopping') {
        window.scrollTo({
          top: 325,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>
