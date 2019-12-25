// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import echarts from 'echarts'
import 'echarts/theme/wonderland.js'
import normalize from 'normalize.css'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(normalize)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://172.23.231.190/gisPro/public/api'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Xx8OKfayCncHTB0irzONqPCfhwP2g6A4'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
