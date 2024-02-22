<template>
  <div class="container-fluid subscription">
    <div class="row">
      <div class="col-12 col-md-6">
        <h2>訂閱我們</h2>
        <h5>好康情報不錯過！</h5>
        <Form v-slot="{ errors }" @submit="subscription">
          <div class="form-field">
            <Field id="email" name="email" type="email" class="form-control"
              :class="{ 'is-invalid': errors['email'] }" v-model="userEmail"
              placeholder="請輸入 Email" rules="email">
            </Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
            <button type="submit" :disabled="errors['email'] || userEmail === ''">訂閱</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userEmail: ''
    }
  },
  inject: ['emitter'],
  methods: {
    subscription () {
      this.userEmail = ''
      console.log('訂閱成功')
      this.emitter.emit('push-message', {
        style: 'success',
        title: '訂閱成功，感謝您的訂閱'
      })
    }
  }
}
</script>
