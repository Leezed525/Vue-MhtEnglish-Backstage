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


const deleteAdminNoticeByIds = data => {
  return new request({
    headers: {
      "Content-Type": "application/json"
    },
    url: "admin/notice/deleteAdminNoticeByIds",
    method: "post",
    data: JSON.stringify(data)
  });
};

const publishNotice = data =>{
  return new request({
    url: "/admin/notice/publishNotice",
    method: "post",
    data: data
  })
}

const cancelNotice = data =>{
  return new request({
    url: "/admin/notice/cancelNotice",
    method: "post",
    data: data
  })
}


const AdminLogApi = {
    getAllNotice,
    updateNotice,
    addNotice,
    deleteAdminNoticeByIds,
    publishNotice,
    cancelNotice,
    toLog
};
export default AdminLogApi;
