export default {
  state: {
    // apiURL: 'https://naturalhistorysafari.com/core/api/v1',
    apiURL: 'http://localhost:8000/api/v1',
    // baseURL: 'https://dashboard.naturalhistorysafari.com'
    baseURL: 'http://localhost:8000'
  },
  getters: {
    apiURL: state => { return state.apiURL },
    baseURL: state => { return state.baseURL }
  }
}