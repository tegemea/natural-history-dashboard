import axios from "axios"

export default {
  state: {
    whatToDoWhens: []
  },
  getters: {
    whatToDoWhens: state => { return state.whatToDoWhens }
  },
  mutations: {
    SET_WHAT_TO_DO_WHENS: (state, whatToDoWhens) => {
      state.whatToDoWhens = whatToDoWhens
    },
    ADD_WHAT_TO_DO_WHEN: (state, whatToDoWhen) => {
      state.whatToDoWhens.push(whatToDoWhen)
    },
    UPDATE_WHAT_TO_DO_WHEN: (state, whatToDoWhen) => {
      let eventToUpdate = state.whatToDoWhens.find(e => e.id === whatToDoWhen.id)

      eventToUpdate.name = whatToDoWhen.name;
      eventToUpdate.seo_title = whatToDoWhen.seo_title;
      eventToUpdate.meta_description = whatToDoWhen.meta_description;
      eventToUpdate.description = whatToDoWhen.description;
      eventToUpdate.photo = whatToDoWhen.photo;
    },
    DELETE_WHAT_TO_DO_WHEN: (state, index) => {
      state.whatToDoWhens.splice(index, 1)
    }
  },
  actions: {
    getWhatToDoWhens: async ({ commit, rootState }) => {
      const { data } = await axios.get(`${rootState.settings.apiURL}/what-to-do-when`)
      if(data.length) commit('SET_WHAT_TO_DO_WHENS', data)
    }
  }
}