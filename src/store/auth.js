export default {
  namespaced: true,
  state: {
    uid: null,
    last_name: null,
    first_name: null
  },
  mutations: {
    login: function (state, data) {
      state.uid = data.user.uid;
      state.last_name = data.user.last_name;
      state.first_name = data.user.first_name;
    },
    logout: function (state) {
      state.uid = null;
      state.last_name = null;
      state.first_name = null;
    },
  },
}