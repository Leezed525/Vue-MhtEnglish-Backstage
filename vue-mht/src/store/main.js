import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//存取数据的位置
const state = {
  token: ""
};

//用来处理异步请求
const actions = {};

//写入state
const mutations = {};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
