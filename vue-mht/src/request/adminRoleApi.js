import request from "./axios";
import qs from "qs";

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

const AdminRoleApi = {
  getAllRoles,
  getAllRolesByUserId
};
export default AdminRoleApi;
