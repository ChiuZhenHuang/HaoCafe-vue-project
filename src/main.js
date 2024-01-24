import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// 引入bootstrap的js功能
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'popper.js'

// 表單驗證vee-validate套件
import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
// import VeeValidateRules from '@vee-validate/rules'
import * as rules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import App from './App.vue'
import router from './router'

import { currency, date } from './methods/filters'
import $httpMessageState from './methods/pushMessageState'

Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)
// 將currency方法帶入全域屬性，讓各個頁面都能直接使用
app.config.globalProperties.$filters = { currency, date }
// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
// 正常來說不建議太多方法掛Global，這裡也可以用provide處理
app.config.globalProperties.$httpMessageState = $httpMessageState

app.use(VueAxios, axios)
app.use(router)
// 全域註冊loading套件，因可能很多地方都會用到
app.component('LoadingComponent', Loading)
// 全域註冊表單驗證
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
