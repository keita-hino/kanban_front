export default {
  namespaced: true,
  state: {
    email: null,
    last_name: null,
    first_name: null
  },
  mutations: {
    login: function (state, data) {
      state.email = data.user.email;
      state.last_name = data.user.last_name;
      state.first_name = data.user.first_name;
    },
    logout: function (state) {
      state.email = null;
      state.last_name = null;
      state.first_name = null;
    },
  },
}