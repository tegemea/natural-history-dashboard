import axios from 'axios'

export default {
  state: {
    photos: []
  },
  getters: {
    photos: state => { return state.photos }
  },
  mutations: {
    SET_PHOTOS: (state, photos) => {
      state.photos = photos
    },
    ADD_PHOTO: (state, payload) => {
      state.photos.push(payload.data)
    },
    UPDATE_PHOTO: (state, photo) => {
      let photoToUpdate = state.photos.find(p => +p.id === +photo.data.id);
      
      photoToUpdate.id = photo.data.id;
      photoToUpdate.name = photo.data.name;
      photoToUpdate.description = photo.data.description;
      photoToUpdate.photo = photo.data.photo;
    },
    REMOVE_PHOTO: (state, payload) => {
      state.photos.splice(payload.index, 1)
    }
  },
  actions: {
    getPhotos: async ({ commit, rootState }) => {
      const { data } = await axios.get(`${rootState.settings.apiURL}/photos`)
      if(data.length) commit('SET_PHOTOS', data)
    },
    addPhoto: async ({ commit, rootState }, formData) => {
      const { data } = await axios.post(`${rootState.settings.apiURL}/photos`, formData)
      if(data) commit('ADD_PHOTO', data)
    },
    updatePhoto: async ({ commit, rootState }, formData) => {
      const { data } = await axios.post(`${rootState.settings.apiURL}/photos`, formData)
      if(data) commit('UPDATE_PHOTO', data)
    },
    removePhoto: async ({ commit, rootState }, payload) => {
      const { data } = await axios.delete(`${rootState.settings.apiURL}/photos/${payload.photoID}`)
      if(data) commit('REMOVE_PHOTO', { data, index: payload.index })
    }
  }
}