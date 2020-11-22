import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import router from './router'
import VueRouter from 'vue-router';


Vue.config.productionTip = false
Vue.use(vuetify);
Vue.use(VueRouter);
Vue.use(VueAxios, Axios);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')