<template>
<LoadingComponent :active="isLoading"></LoadingComponent>

  <div class="l-banner bg-user-cart">
    <div class="mask"></div>
    <h2>Order checkout</h2>
  </div>

  <div class="order-progress mt-5">
    <ul>
      <li class="active"><i class="fa-solid fa-list-check"></i>確認訂單</li>
      <li><i class="fa-regular fa-pen-to-square"></i>資料填寫</li>
      <li><i class="fa-solid fa-money-check-dollar"></i>付款完成</li>
    </ul>
  </div>

  <div class="container cart-product">
    <div class="row mt-5 mb-5">
      <!-- 購物清單 -->
      <div class="col-12 col-md-6 cart-list">
        <div class="cart-frame" v-if="cart.carts">
          <h3>購物清單</h3>
          <div v-if="cart.carts.length === 0" class="not-buy">
            <i class="bi bi-cart-x"></i>
            <h5>您尚未選購產品</h5>
            <router-link class="nav-link" to="/user/shopping" @click.prevent="scrollToTop">
              <button type="button" class="btn btn-dark">立即前往選購</button>
            </router-link>
          </div>
          <div class="text-end">
            <button type="button" v-if="cart.carts.length !==0" class="clear-cart" @click="clearCart"><i class="bi bi-trash"></i>清空購物車</button>
          </div>
          <div class="overflow-auto mt-2 mb-2" style="max-height: 500px;">
          <div class="cart-item d-flex justify-content-center" v-for="item in cart.carts" :key="item.id">
            <div class="product-image-container">
              <img :src="item.product.imageUrl" alt="產品圖片">
            </div>
            <div class="d-flex flex-column w-100 info">
              <div class="h-100 d-flex flex-column"  style="justify-content:space-evenly; padding:.5em;">
                <div class="d-flex flex-row">
                  <h5>{{ item.product.title }}</h5>
                  <button type="button" class="btn-close" aria-label="Close" @click="removeCartItem(item)"></button>
                </div>
                <h6 class="text-start price">單價：NT$ {{ item.product.price }}</h6>
                <div class="d-flex">
                  <div class="change-qty">
                    <button type="button" class="btn qty-handler" @click="decrementQuantity(item,item.qty)" :disabled="item.qty === 1">-</button>
                    <input type="number" v-model.number="item.qty" readonly min="1" :max="item.product.unit" @change="updateCart(item)"/>
                    <button type="button" class="btn qty-handler" @click="incrementQuantity(item,item.qty)">+</button>
                  </div>
                  <div class="d-flex" style="display: flex; align-items:end;">
                    <div>NT$ {{ $filters.currency(item.product.price*item.qty) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="total">
            <div class="d-flex w-100 justify-content-between" v-if="cart.carts.length !== 0">
              <h6>小計</h6>
              <h6>NT$ {{ $filters.currency(cart.total) }}</h6>
            </div>
            <div class="d-flex w-100 justify-content-between" v-if="cart.total < 3000 && cart.carts.length !== 0">
              <h6>運費</h6>
              <h6> +$120</h6>
            </div>
            <div class="d-flex w-100 justify-content-between" v-if="cart.total >= 3000 && cart.carts.length !== 0">
              <h6>運費</h6>
              <h6> +$0</h6>
            </div>
            <div class="d-flex w-100 justify-content-between" v-if="cart.total < 3000 && cart.carts.length !== 0">
              <h5>總計</h5>
              <h5>NT$ {{ $filters.currency(parseInt(cart.total)+120) }}</h5>
            </div>
            <div class="d-flex w-100 justify-content-between" v-if="cart.total >= 3000">
              <h5>總計</h5>
              <h5>NT$ {{ $filters.currency(cart.total) }}</h5>
            </div>
          </div>
        </div>
      </div>
      <!-- 購物須知 -->
      <div class="col-12 col-md-6 shop-notice">
        <div class="shop-notice-frame">
          <div style="text-align: center;margin-bottom: 2em;">
            <h3>購物須知</h3>
          </div>
          <p>親愛的咖啡愛好者們：</p>
          <p>為確保您愉快順利的購物體驗，請細讀以下內容，以更清楚瞭解我們的購物流程和付款方式。同時，請務必確認您填寫的聯繫信息正確無誤，
            以便我們能夠及時聯絡您。祝您在選購美味咖啡的過程中享受愉快的時光，購物順利！</p>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item mb-2">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  購物流程
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample" aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                  <ol>
                    <li><strong>瀏覽商品：</strong>在網站上瀏覽各式咖啡商品，點擊您感興趣的商品了解詳情。</li>
                    <li><strong>加入購物車：</strong>在商品頁面中，選擇您喜歡的咖啡，調整數量，然後點擊「加入購物車」。</li>
                    <li><strong>檢查購物車：</strong>進入購物車頁面，檢查所選商品、數量，並可進行修改。確認無誤後，點擊「結帳」。</li>
                    <li><strong>填寫配送信息：</strong>在結帳頁面，輸入您的配送地址和相關聯絡信息。請確保資料正確，以便順利配送。</li>
                    <li><strong>選擇付款方式：</strong>選擇您方便的付款方式，可能包括信用卡、支付寶等。填寫相應的付款信息。</li>
                    <li><strong>確認訂單：</strong>在確認頁面，檢查所有訂單詳情，包括商品、金額、配送信息等。確認無誤後，點擊「確認訂單」。</li>
                    <li><strong>完成訂單：</strong>完成付款後，您將收到訂單確認郵件，表示訂單已成功。我們將開始處理並安排配送。</li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="accordion-item mb-2">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  付款方式
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample" aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body">
                  <ul>
                    <li><strong>宅配貨到付款：</strong>您可以在商品送達時現場支付給宅配人員。</li>
                    <li><strong>銀行轉帳/ATM：</strong>您可以透過銀行轉帳或ATM進行支付。</li>
                    <li><strong>信用卡：</strong>方便快捷的信用卡支付，保障您的付款安全。</li>
                    <li><strong>APPLE Pay：</strong>使用APPLE Pay進行簡便的支付。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 前往路徑 -->
      <div class="col-12 mt-3 route">
        <router-link class="nav-link" to="/user/shopping" @click.prevent="scrollToTop">
          <button type="button" class="previous">繼續購物</button>
        </router-link>
        <router-link class="nav-link" to="/user/form" @click.prevent="scrollToTop">
          <button type="button" class="next" :disabled="cart.total===0" >確認訂單</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import scrollButton from '@/mixins/scrollButton'
import { mapState, mapActions } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
    }
  },
  inject: ['emitter'],
  mixins: [scrollButton],
  computed: {
    ...mapState(cartStore, ['cart', 'isLoading'])
  },
  methods: {
    ...mapActions(favoriteStore, ['loadFavoritesFromLocalStorage']),
    ...mapActions(cartStore, ['getCart', 'updateCart', 'clearCart', 'removeCartItem', 'decrementQuantity', 'incrementQuantity'])
  },
  created () {
    this.getCart()
    this.loadFavoritesFromLocalStorage()
  }
}
</script>
