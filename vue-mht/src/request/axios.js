import axios from "axios";
import store from "../store/main";
import router from "../router";
// import { Message } from "element-ui";

//  让请求在浏览器中允许跨域携带cookie
axios.defaults.withCredentials = true;
// 使用自定义配置新建一个 axios 实例
const service = axios.create({
  // 基础的请求地址
  baseURL: "/mhtApi",
  // 设置超时时间 5s
  timeout: 5000
});

// request拦截器
service.interceptors.request.use(
  config => {
    // let url = config.url.replace(config.baseURL, "");
    // let code = config.code;
    // config.headers = getHeader(url, code); // 让每个请求携带自定义签名
    let token = store.state.token.trim();
    if (token != null && token != "") {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.AccessToken = store.state.token;
    }
    console.log(config);
    return config;
  },
  error => {
    // console.log(error); // for debug 11
    Promise.reject(error);
  }
);

// http response 拦截器
service.interceptors.response.use(
  response => {
    console.log(response);
    let res = response.data;
    if (res.code === 401) {
      Vue.prototype.$message.error({
        message: res.msg
      });
    }
    if (res.data) {
      if (res.data.code === -2) {
        Vue.prototype.$message.error({
          message: res.msg
        });
      }
    }
    return response;
  },
  error => {
    console.log(error.response);
    if (error.response) {
      switch (error.response.status) {
        case 500:
          Vue.prototype.$message.error("服务器出错");
          break;
        case 403:
          // 返回 403 清除token信息并跳转到登录页面（token非法或token过期）
          store.commit("LOGOUT");
          Vue.prototype.$message.error({
            message: error.response.data.msg
          });
          router.replace({
            path: "login",
            query: { redirect: router.currentRoute.fullPath }
          });
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);
export default service;
