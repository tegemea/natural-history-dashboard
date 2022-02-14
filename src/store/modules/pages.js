import axios from 'axios'

export default {
  state: {
    pages: []
  },
  getters: {
    pages: state => { return state.pages }
  },
  mutations: {
    SET_PAGES: (state, pages) => {
      state.pages = pages
    }
  },
  actions: {
    getPages: async ({ commit, rootState }) => {
      const { data } = await axios.get(`${rootState.settings.apiURL}/pages`)
      if(data.length) commit('SET_PAGES', data)
    }
  }
}