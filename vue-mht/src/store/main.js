import Vue from "vue";
import Vuex from "vuex";

import userApi from "../request/userApi";

Vue.use(Vuex);

//存取数据的位置
const state = {
  token: localStorage.getItem("mhtToken")
    ? localStorage.getItem("mhtToken")
    : ""
};

//用来处理异步请求
const actions = {
  setToken(context, token) {
    context.commit("SETTOKEN", token);
  },
  getUserInfoByUsername(context, username) {
    console.log(username);
  }
};

//写入state
const mutations = {
  SETTOKEN(state, token) {
    window.localStorage.setItem("mhtToken", token);
    state.token = token;
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
