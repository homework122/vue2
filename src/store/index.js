import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userTable: [],

    user: window.sessionStorage.getItem("user")
      ? JSON.parse(window.sessionStorage.getItem("user"))
      : "",
    token: window.sessionStorage.getItem("token")
      ? window.sessionStorage.getItem("token")
      : "",
    editableTabsS: window.sessionStorage.getItem("editableTabs")
      ? window.sessionStorage.getItem("editableTabs")
      : "",
    tabIndex: window.sessionStorage.getItem("tabIndex")
      ? window.sessionStorage.getItem("tabIndex")
      : "",
    editableTabsValue: window.sessionStorage.getItem("editableTabsValue")
      ? window.sessionStorage.getItem("editableTabsValue")
      : ""
  },
  getters: {
    getToken(state) {
      if (state.isLogin) {
        return state.token;
      } else {
        return "";
      }
    }
  },
  mutations: {
    usermsg(state, user) {
      state.user = user;
      window.sessionStorage.setItem("user", JSON.stringify(user));
    },
    seteditableTabs(state, e) {
      state.editableTabsS = e;
      window.sessionStorage.setItem("editableTabs", JSON.stringify(e));
    },
    seteditableTabsValue(state, e) {
      state.editableTabsValue = e;
      window.sessionStorage.setItem("editableTabsValue", JSON.stringify(e));
    },
    settabIndex(state, e) {
      state.tabIndex = e;
      window.sessionStorage.setItem("tabIndex", JSON.stringify(e));
    },
    SetToken(state, token) {
      //设置token
      state.token = token;
      window.sessionStorage.setItem("token", token);
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit("SetToken", token); //与mutations里的名称对应
    }
  },
  modules: {}
});
