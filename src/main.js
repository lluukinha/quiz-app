import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import i18n from './internacionalization';

import './animate.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(VueI18n);

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app');
