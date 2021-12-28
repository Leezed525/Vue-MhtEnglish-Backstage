import request from "./axios";
import qs from "qs";

const getAllRoles = data => {
  return request({
    url: "/admin/role/getAllRoles",
    method: "post"
  });
};

const AdminRoleApi = {
  getAllRoles
};
export default AdminRoleApi;
