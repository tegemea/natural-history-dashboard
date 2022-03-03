export default {
  state: {
    apiURL: 'https://naturalhistorysafari.com/core/api/v1',
    baseURL: 'https://dashboard.naturalhistorysafari.com'
  },
  getters: {
    apiURL: state => { return state.apiURL },
    baseURL: state => { return state.baseURL }
  }
}