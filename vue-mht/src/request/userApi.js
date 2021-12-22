// 刚刚封装的axios
import request from "./axios";

import qs from "qs";

// // 1.获取图片验证码
// export const getImgCode = () => {
//   return request({
//     url: "/image/code",
//     method: "get",
//     // 图片验证码 response类型设置成blob，图片才能显示出来
//     responseType: "blob"
//   });
// };

// // 2.获取手机验证码
// export const getPhoneCode = query => {
//   return request({
//     url: "/user/messageCode",
//     method: "post",
//     data: query
//   });
// };

// // 3. 获取用户任务列表
// export const getUserTask = query => {
//   return request({
//     url: "/task/select",
//     method: "get",
//     params: query
//   });
// };
// // 4. 搜索任务接口
// export const queryTask = (query1, query2) => {
//   return request({
//     url: "/task/query",
//     method: "post",
//     data: query1,
//     params: query2
//   });
// };

export const getCompleteWords = data => {
  return request({
    url: "/word/getCompleteWordsByUserId",
    method: "get",
    params: data
  });
};

// form请求格式;

// return request({
//   // 表单数据加这个请求头
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   url: "admin/user/login",
//   method: "post",
//   data: qs.stringify(data) //用 qs 将js对象转换为字符串
// });

export const login = data => {
  return request({
    // 表单数据加这个请求头
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "admin/user/login",
    method: "post",
    data: qs.stringify(data) //用 qs 将js对象转换为字符串
  });
};
