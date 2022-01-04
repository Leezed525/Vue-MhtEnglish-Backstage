import axios from "axios";
import store from "../store/main";
import { MessageBox, Message } from 'element-ui'

//  让请求在浏览器中允许跨域携带cookie
axios.defaults.withCredentials = true;
// 使用自定义配置新建一个 axios 实例
const service = axios.create({
  // 基础的请求地址
  baseURL: "/api",
  // 设置超时时间 1s
  timeout: 1000
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
    let res = response.data;
    if(res.code === 401){
      Message.error({
        message:res.msg,
      }); 
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 500:{
          Message.error("服务器出错");
        }
        // 返回 401 清除token信息并跳转到登录页面（未授权返回）
        // store.commit(types.LOGOUT);
        // router.replace({
        //   path: "login",
        //   query: { redirect: router.currentRoute.fullPath }
        // });
        console.log(error.response.data)
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);
export default service;
