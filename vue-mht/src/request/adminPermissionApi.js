import request from "./axios";
import qs from "qs";

const getAllPermissions = data => {
  return new request({
    url: "/admin/permission/getAllAdminPermission",
    method: "post",
    data: qs.stringify(data)
  });
};

const getAllMenu = data => {
  return new request({
    url: "/admin/permission/getAllMenu",
    method: "get"
  });
};

const updateAdminPermission = data => {
  return new request({
    url: "admin/permission/updateAdminPermission",
    method: "post",
    data: data
  });
};

const addAdminPermission = data => {
  return request({
    url: "admin/permission/addAdminPermission",
    method: "post",
    data: data
  });
};

const checkTitleUnique = data => {
  return request({
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    url: "admin/permission/checkTitleUnique",
    method: "post",
    data: qs.stringify(data)
  });
};
const deleteAdminPermissionByIds = data => {
  return request({
    headers: {
      "Content-Type": "application/json"
    },
    url: "admin/permission/deleteAdminPermissionByIds",
    method: "post",
    data: JSON.stringify(data)
  });
};

const getPermissionTree = () => {
  return request({
    url: "admin/permission/getPermissionTree",
    method: "get"
  });
};

const getPermissionByRoleId = data =>{
  return request({
    url: "admin/permission/getPermissionByRoleId",
    method: "post",
    data: qs.stringify(data),
  });
}

const AdminPermissionApi = {
  getAllPermissions,
  getAllMenu,
  updateAdminPermission,
  addAdminPermission,
  checkTitleUnique,
  deleteAdminPermissionByIds,
  getPermissionTree,
  getPermissionByRoleId
};
export default AdminPermissionApi;
