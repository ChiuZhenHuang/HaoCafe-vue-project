<template>
  <div class="container-fluid" style="padding:0;">
      <ul class="category-wrapper">
        <li @click.prevent="selectCategory('')">
          <router-link to="/user/shopping">全部商品</router-link>
        </li>
        <li @click.prevent="selectCategory('淺烘培')">
          <router-link to="/user/shopping">淺烘培</router-link>
        </li>
        <li @click.prevent="selectCategory('中烘培')">
          <router-link to="/user/shopping">中烘培</router-link>
        </li>
        <li @click.prevent="selectCategory('深烘培')">
          <router-link to="/user/shopping">深烘培</router-link>
        </li>
        <li @click.prevent="selectCategory('周邊商品')">
          <router-link to="/user/shopping">周邊商品</router-link>
        </li>
    </ul>
  </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  inject: ['emitter'],
  methods: {
    selectCategory (category) {
      this.emitter.emit('emit-category', category)
    }
  },
  created () {
  }
}
</script>
