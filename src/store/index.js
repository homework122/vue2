import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userTable: [],

<<<<<<< HEAD
    user: {
      user_name: "",
      user_pwd: "",
      user_email: "",
      user_phone: "",
      user_no: "",
      user_img: "",
      user_status: "",
      rememberMe: ""
    }
  },
  mutations: {
    usermsg(state, user) {
      state.user = user;
    },
    user_img(state, user_img) {
      state.user.user_img = user_img;
    },

    user_status(state, user) {
      state.user.user_status = user;
    },
    rememberMe(state, rememberMe) {
      state.user.rememberMe = rememberMe;
    },
    user_no(state, user_no) {
      state.user.user_no = user_no;
    },

    user_name(state, user) {
      state.user.user_name = user;
    },
    user_pwd(state, user) {
      state.user.user_pwd = user;
    },
    user_email(state, user) {
      state.user.user_email = user;
    },
    user_phone(state, user) {
      state.user.user_phone = user;
    }
=======
    user:JSON.parse(window.sessionStorage.getItem("user"))
  },
  mutations: {
    usermsg(state, user) {
      state.user = user
      window.sessionStorage.setItem('user',JSON.stringify(user))
    },
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
  },
  actions: {},
  modules: {}
});
