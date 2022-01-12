import request from "./axios";
import qs from "qs";

const toLog = data =>{
  return request({
    url: "admin/system/toLog",
    method: "get",
  });
}

const getAllLogs = data => {
  return new request({
    url: "/admin/log/getAllLog",
    method: "post",
    data: qs.stringify(data)
  });
};

const deleteAdminLogByIds = data => {
  return request({
    headers: {
      "Content-Type": "application/json"
    },
    url: "admin/log/deleteAdminLogByIds",
    method: "post",
    data: JSON.stringify(data)
  });
};


const AdminLogApi = {
    getAllLogs,
    deleteAdminLogByIds,
    toLog
};
export default AdminLogApi;
