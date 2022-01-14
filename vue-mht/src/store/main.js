import Vue from "vue";
import Vuex from "vuex";

import userApi from "../request/adminUserApi";

Vue.use(Vuex);

//存取数据的位置
const state = {
  token: localStorage.getItem("mhtToken")
    ? localStorage.getItem("mhtToken")
    : "",
  userInfo: localStorage.getItem("mhtUserInfo")
    ? JSON.parse(localStorage.getItem("mhtUserInfo"))
    : null,
  openTab: [], //所有打开的路由
  activeIndex: "/main" //激活状态
};

//用来处理异步请求
const actions = {
  setToken(context, token) {
    context.commit("SETTOKEN", token);
  },
  getUserInfoByUsername(context, username) {
    let data = {
      username
    };
    let userInfo;
    userApi
      .getAdminUserInfoByUsername(data)
      .then(res => {
        //获取用户信息
        userInfo = res.data;
        context.commit("SETUSERINFO", userInfo);
        window.localStorage.setItem("mhtUserInfo",JSON.stringify(userInfo));
      })
      .catch(error => {
      });
  },
  logout(context){
    window.localStorage.clear();
    context.commit("LOGOUT");
  }
};

//写入state
const mutations = {
  SETTOKEN(state, token) {
    state.token = token;
  },
  SETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  LOGOUT(state){
    state.token = ""
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
