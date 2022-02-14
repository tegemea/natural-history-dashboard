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
    },
    ADD_PAGE: (state, page) => {
      state.pages.push(page)
    },
    UPDATE_PAGE: (state, pageID) => {
      const pageToUpdate = state.pages.find(p => p.id === pageID)
      pageToUpdate = page
    },
    DELETE_PAGE: (state, index) => {
      state.pages.splice(index, 1)
    }
  },
  actions: {
    getPages: async ({ commit, rootState }) => {
      const { data } = await axios.get(`${rootState.settings.apiURL}/pages`)
      if(data.length) commit('SET_PAGES', data)
    }
  }
}