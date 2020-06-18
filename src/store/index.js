import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userTable: [],

    user: JSON.parse(window.sessionStorage.getItem("user"))
  },
  mutations: {
    usermsg(state, user) {
      state.user = user;
      window.sessionStorage.setItem("user", JSON.stringify(user));
    }
  },
  actions: {},
  modules: {}
});
