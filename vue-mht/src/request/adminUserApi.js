// 刚刚封装的axios
import request from "./axios";
import qs from "qs";
// form请求格式;

// return request({
//   // 表单数据加这个请求头
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   url: "admin/system/login",
//   method: "post",
//   data: qs.stringify(data) //用 qs 将js对象转换为字符串
// });

// json请求格式
// return request({
//   url: "admin/system/login",
//   method: "post",
//   data: data
// });

//登录
const login = data => {
  return request({
    // 表单数据加这个请求头
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "admin/system/login",
    method: "post",
    data: qs.stringify(data) //用 qs 将js对象转换为字符串
  });
};

const toUser = data =>{
  return request({
    url: "admin/system/toUser",
    method: "get",
  });
}

//获取系统用户信息
const getAdminUserInfoByUsername = data => {
  return request({
    url: "admin/user/getAdminUserInfoByUsername",
    method: "get",
    params: data
  });
};

//获取系统用户列表
const getAllAdminUser = data => {
  return request({
    // 表单数据加这个请求头
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "admin/user/getAllAdminUser",
    method: "post",
    data: qs.stringify(data) //用 qs 将js对象转换为字符串
  });
};
//更新系统用户信息
const updateAdminUser = data => {
  return request({
    url: "admin/user/updateAdminUser",
    method: "post",
    data: data
  });
};

//删除系统用户
const deleteAdminUserByIds = data => {
  return request({
    headers: {
      "Content-Type": "application/json"
    },
    url: "admin/user/deleteAdminUserByIds",
    method: "post",
    data: JSON.stringify(data)
  });
};

const restPassword = data => {
  return request({
    url: "admin/user/restPassword",
    method: "post",
    data: qs.stringify(data)
  });
};

const reassignRoles = data => {
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "admin/user/reassignRoles",
    method: "post",
    data: qs.stringify(data, { arrayFormat: "repeat" })
  });
};

const checkUsernameUnique = data => {
  return request({
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    url: "admin/user/checkUsernameUnique",
    method: "post",
    data: qs.stringify(data)
  });
};

const addAdminUser = data => {
  return request({
    url: "admin/user/addAdminUser",
    method: "post",
    data: data
  });
};


const changePassword = data => {
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "admin/user/changePassWord",
    method: "post",
    data: qs.stringify(data)
  });
}

var userApi = {
  login,
  toUser,
  getAdminUserInfoByUsername,
  getAllAdminUser,
  updateAdminUser,
  deleteAdminUserByIds,
  restPassword,
  reassignRoles,
  checkUsernameUnique,
  addAdminUser,
  changePassword
};
export default userApi;
