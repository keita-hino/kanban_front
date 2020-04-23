export default {
  namespaced: true,
  state: {
    id: null
  },
  mutations: {
    setWorkspace: function (state, id) {
      state.id = id;
    },
    logout: function (state) {
      state.uid = null;
      state.last_name = null;
      state.first_name = null;
    },
  },
}