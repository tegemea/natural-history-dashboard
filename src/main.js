import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import CKEditor from '@ckeditor/ckeditor5-vue2'
import 'bootstrap'

import axios from 'axios'
import jQuery from 'jquery';

// import styles for global use
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueRouter)
Vue.use(CKEditor)
Vue.use(VueSweetalert2)

Vue.prototype.$axios = axios;
Vue.prototype.$jQuery = jQuery;

Vue.config.productionTip = false

import { store } from './store/store'

// import components for the routes
import Dashboard from '@/components/Dashboard'
import Pages from '@/components/Pages'
import WhatToDoWhen from '@/components/WhatToDoWhen'
import NaturalAdventure from '@/components/NaturalAdventures'
import Photos from '@/components/Photos'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/pages', component: Pages },
  { path: '/natural-adventures', component: NaturalAdventure },
  { path: '/what-to-do-when', component: WhatToDoWhen },
  { path: '/photos', component: Photos },
]

const router = new VueRouter({
  routes
})

new Vue({
  store, router,
  render: h => h(App),
}).$mount('#app')
