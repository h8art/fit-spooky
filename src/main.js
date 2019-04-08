import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import store from './store'
import VueNativeNotification from 'vue-native-notification'
import 'ant-design-vue/dist/antd.css'

Vue.use(VueNativeNotification, {
  requestOnNotify: true
})
Vue.use(Antd)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
