import Vue from "vue";
import Vuex from "vuex";

import userApi from "../request/userApi";

Vue.use(Vuex);

//存取数据的位置
const state = {
  token: localStorage.getItem("mhtToken")
    ? localStorage.getItem("mhtToken")
    : "",
  userInfo : localStorage.getItem("mhtUserInfo")
  ? localStorage.getItem("mhtUserInfo")
  : ""
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
      })
      .catch(error => {
        alert("服务器错误");
      });
  }
};

//写入state
const mutations = {
  SETTOKEN(state, token) {
    state.token = token;
  },
  SETUSERINFO(state,userInfo){
    state.userInfo = userInfo;
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
