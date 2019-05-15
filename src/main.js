/*
Este projeto foi feito por Lucas
https://github.com/lluukinha

Se for utilizá-lo, favor mencionar no seu projeto.
Obrigado!
*/

import './animate.css'
import './style.css'
import './font-awesome'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* eslint-disable */
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
