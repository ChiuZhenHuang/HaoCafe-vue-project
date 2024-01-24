<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
    <div class="container" style="margin-top:85px">
      <div class="row mt-4">
        <!-- 填寫資料表格 -->
      <div class="col">
        <div class="my-5 row justify-content-center">
        <Form class="col-md-6" v-slot="{ errors }"
              @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入 Email" rules="email|required"
                    v-model="form.user.email"></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <Field id="name" name="姓名" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required"
                    v-model="form.user.name"></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <Field id="tel" name="電話" type="tel" class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話" :rules="isPhone"
                    v-model="form.user.tel"></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <Field id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required"
                    v-model="form.user.address"></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="" id="message" class="form-control" cols="30" rows="10"
                      v-model="form.message"></textarea>
          </div>
          <div class="text-end">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </Form>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
// import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      // pagination: {},
      isLoading: false
    }
  },
  // components: { Pagination },
  inject: ['emitter'],
  methods: {
    // 驗證電話是否正確
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data
          this.isLoading = false
          console.log('購物車產品', this.cart)
        })
    },
    // 送出訂單表單
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.isLoading = true
      const order = this.form
      // 將用戶建立訂單資料傳到api
      this.$http.post(url, { data: order }).then((res) => {
        console.log('送出訂單資料', res)
        this.$httpMessageState(res, '訂單送出')
        this.getCart()
        // 前往付款頁面
        this.$router.push(`/user/checkout/${res.data.orderId}`)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
