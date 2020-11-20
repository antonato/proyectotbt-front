import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAxios from 'vue-axios';
import Axios from 'axios';

Vue.config.productionTip = false
Vue.use(vuetify);
Vue.use(VueAxios, Axios);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')