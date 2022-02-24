import request from "./axios";
import qs from "qs";

const toLog = () =>{
  return request({
    url: "admin/system/toLog",
    method: "get",
  });
}

const getAllNotice = data => {
  return new request({
    url: "/admin/notice/getAllNotice",
    method: "post",
    data: qs.stringify(data)
  });
};

const updateNotice = data =>{
  return new request({
    url: "/admin/notice/updateNotice",
    method: "post",
    data: data
  })
}

const addNotice = data =>{
  return new request({
    url: "/admin/notice/addNotice",
    method: "post",
    data: data
  })
}


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
    getAllNotice,
    updateNotice,
    addNotice,
    toLog
};
export default AdminLogApi;
