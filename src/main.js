import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'bootstrap'

import axios from 'axios'

// import global styles for use
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter)

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

import { store } from './store/store'

// import components for the routes
import Dashboard from '@/components/Dashboard'
import Pages from '@/components/Pages'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/pages', component: Pages }
]

const router = new VueRouter({
  routes
})

new Vue({
  store, router,
  render: h => h(App),
}).$mount('#app')
