import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userTable: [],

    user:window.sessionStorage.getItem("user")? JSON.parse(window.sessionStorage.getItem("user")):"",
    token:window.sessionStorage.getItem("token")?window.sessionStorage.getItem("token"):"",
    editableTabsS:window.sessionStorage.getItem("editableTabs")?window.sessionStorage.getItem("editableTabs"):""
  },
  getters : {
    getToken(state){
      if(state.isLogin){
        return state.token;
      }else{
        return "";
      }
    }
  },
  mutations: {
    usermsg(state, user) {
      state.user = user
      window.sessionStorage.setItem("user",JSON.stringify(user))
    },
    seteditableTabs(state,e){
      state.editableTabsS = e
      window.sessionStorage.setItem("editableTabs",JSON.stringify(e))
    },
    SetToken(state,token){  //设置token
      state.token = token;
      window.sessionStorage.setItem("token",token);
    }
  },
  actions: {
    setToken({commit},token){
      commit('SetToken',token);  //与mutations里的名称对应
    }
  },
  modules: {}
});
