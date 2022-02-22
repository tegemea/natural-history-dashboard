import axios from 'axios'

export default {
  state: {
    naturalAdventures: []
  },
  getters: {
    naturalAdventures: state => { return state.naturalAdventures }
  },
  mutations: {
    SET_NATURAL_ADVENTURES: (state, naturalAdventures) => {
      state.naturalAdventures = naturalAdventures
    },
    ADD_NATURAL_ADVENTURE: (state, naturalAdventure) => {
      state.naturalAdventures.push(naturalAdventure)
    },
    UPDATE_NATURAL_ADVENTURE: (state, naturalAdventure) => {
      let a2update = state.naturalAdventures.find(a => a.id === naturalAdventure.id);
      a2update.name = naturalAdventure.name;
      a2update.description = naturalAdventure.description;
      a2update.seo_title = naturalAdventure.seo_title;
      a2update.meta_description = naturalAdventure.meta_description;
      a2update.photo = naturalAdventure.photo;
    },
    DELETE_NATURAL_ADVENTURE: (state, payload) => {
      state.naturalAdventures.splice(payload.index, 1)
    }
  },
  actions: {
    getNaturalAdventures: async ({ commit, rootState }) => {
      const { data } = await axios.get(`${rootState.settings.apiURL}/natural-adventures`);
      if(data.length) commit('SET_NATURAL_ADVENTURES', data)
    },
    addNaturalAdventure: async ({ commit, rootState }, formData) => {
      const { data : { data } } = await axios.post(`${rootState.settings.apiURL}/natural-adventures`, formData);
      if(data) commit('ADD_NATURAL_ADVENTURE', data);
    },
    updateNaturalAdventure: async ({ commit, rootState }, formData) => {
      const { data : { data } } = await axios.post(`${rootState.settings.apiURL}/natural-adventures`, formData);
      if(data) commit('UPDATE_NATURAL_ADVENTURE', data)
    },
    removeNaturalAdventure: async ({ commit, rootState }, payload) => {
      const { data } = await axios.delete(`${rootState.settings.apiURL}/natural-adventures/${payload.adventureID}`);
      if(data) commit('DELETE_NATURAL_ADVENTURE', { data, index: payload.index })
    }
  }
}