export default {
  namespaced: true,
  state: {
    id: null,
    name: null
  },
  mutations: {
    setWorkspace: function (state, data) {
      state.id = data.id;
      state.name = data.name;
    },
  },
  getters: {
    id: state => {
      return state.id
    },

    name: state => {
      return state.name
    },
  }
}