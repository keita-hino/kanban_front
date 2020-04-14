import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import vuex from './store/index'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  router,
  axios,
  vuex,
  render: h => h(App)
}).$mount('#app')
