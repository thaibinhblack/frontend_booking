import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
Vue.use(VueAxios,axios)
Vue.use(VueAxios)
Vue.config.productionTip = false
// Vue.$http.headers.common['Access-Control-Allow-Origin'] = true
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
