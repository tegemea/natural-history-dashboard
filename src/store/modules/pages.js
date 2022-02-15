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
    UPDATE_PAGE: (state, page) => {
      let pageToUpdate = state.pages.find(p => p.id === page.id);
      
      pageToUpdate.id = page.id;
      pageToUpdate.name = page.name;
      pageToUpdate.description = page.description;
      pageToUpdate.seo_title = page.seo_title;
      pageToUpdate.meta_description = page.meta_description;
      pageToUpdate.photo = page.photo;
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