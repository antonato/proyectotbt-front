import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import routes from './router/';
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(vuetify);
Vue.use(VueAxios, Axios);
Vue.use(VueRouter)

const router = new VueRouter({
  base: 'public', 
  mode: 'history',
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')