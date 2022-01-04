import request from "./axios";
import qs from "qs";

const toRole = data =>{
  return request({
    url: "admin/system/toRole",
    method: "get",
  });
}

const getAllRoles = data => {
  return request({
    url: "/admin/role/getAllRoles",
    method: "post"
  });
};

const getAllRolesByUserId = data => {
  return request({
    url: "/admin/role/getAllRolesByUserId",
    method: "post",
    data: qs.stringify(data)
  });
};

const getAllAdminRole = data => {
  return new request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "admin/role/getAllAdminRole",
    method: "post",
    data: qs.stringify(data) //用 qs 将js对象转换为字符串
  });
};

const updateAdminRole = data => {
  return new request({
    url: "admin/role/updateAdminRole",
    method: "post",
    data: data
  });
};

const checkRolenameUnique = data => {
  return request({
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    url: "admin/role/checkRolenameUnique",
    method: "post",
    data: qs.stringify(data)
  });
};

const addAdminRole = data => {
  return request({
    url: "admin/role/addAdminRole",
    method: "post",
    data: data
  });
};


const deleteAdminRoleByIds = data => {
  return request({
    headers: {
      "Content-Type": "application/json"
    },
    url: "admin/role/deleteAdminRoleByIds",
    method: "post",
    data: JSON.stringify(data)
  });
};

const reassignPermission = data =>{
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "admin/role/reassignPermission",
    method: "post",
    data: qs.stringify(data, { arrayFormat: "repeat" })
  });
}

const AdminRoleApi = {
  toRole,
  getAllRoles,
  getAllRolesByUserId,
  getAllAdminRole,
  updateAdminRole,
  checkRolenameUnique,
  addAdminRole,
  deleteAdminRoleByIds,
  reassignPermission
};
export default AdminRoleApi;
