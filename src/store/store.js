import Vue from 'vue'
import Vuex from 'vuex'

// import store modules
import pages from './modules/pages'
import settings from './modules/settings'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    pages,
    settings
  }
})