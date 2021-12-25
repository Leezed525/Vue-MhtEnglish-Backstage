import Vue from "vue";
import Vuex from "vuex";

import userApi from "../request/userApi";

Vue.use(Vuex);

//存取数据的位置
const state = {
  token: localStorage.getItem("mhtToken")
    ? localStorage.getItem("mhtToken")
    : "",
  userInfo: localStorage.getItem("mhtUserInfo")
    ? localStorage.getItem("mhtUserInfo")
    : "",
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
  SETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 添加tabs
  add_tabs (state, data) {
    this.state.openTab.push(data);
  },
  // 删除tabs
  delete_tabs (state, route) {
    let index = 0;
    for (let option of state.openTab) {
      if (option.route === route) {
        break;
      }
      index++;
    }
    this.state.openTab.splice(index, 1);
  },
  // 设置当前激活的tab
  set_active_index (state, index) {
    this.state.activeIndex = index;
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
