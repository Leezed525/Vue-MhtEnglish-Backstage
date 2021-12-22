import axios from "axios";
import store from "../store/main";

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
    if (store.state.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  error => {
    console.log(error); // for debug 11
    Promise.reject(error);
  }
);

// response 拦截器
// service.interceptors.response.use(
//   response => {
//     if (response.config.responseType == "blob") {
//       if (response.status == 200) {
//         return response;
//       } else {
//         return Promise.reject(error);
//       }
//     } else {
//       const res = response.data;
//       if (res.code === 200) {
//         return response.data;
//       } else if (res.code === 407) {
//         // console.log("Token失效跳转登陆页面");
//         // sessionStorage.clear();
//         // location.href="/ecloud-sp/logout";
//       } else {
//         Message({
//           message: res.message,
//           type: "error",
//           duration: 5 * 1000
//         });
//         return Promise.reject("error");
//       }
//     }
//   },
//   error => {
//     console.log("err" + error); // for debug

//     // if (axios.isCancel(error)) {
//     //   // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
//     //   return new Promise(() => {});
//     // } else {
//     Message({
//       message: error.message,
//       type: "error",
//       duration: 5 * 1000
//     });
//     return Promise.reject(error);
//     // }
//   }
// );

// http response 拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        // 返回 401 清除token信息并跳转到登录页面（未授权返回）
        // store.commit(types.LOGOUT);
        // router.replace({
        //   path: "login",
        //   query: { redirect: router.currentRoute.fullPath }
        // });
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);
export default service;
