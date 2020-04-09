export default {
  namespaced: true,
  state: {
    uid: null
  },
  mutations: {
    login: function (state, data) {
      state.uid = data.uid;
    },
    logout: function (state) {
      state.uid = null;
    },
  },

}