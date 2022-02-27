import request from "./axios";
import qs from "qs";

const toNotice = () => {
  return request({
    url: "admin/system/toNotice",
    method: "get"
  });
};

const getAllNotice = data => {
  return new request({
    url: "/admin/notice/getAllNotice",
    method: "post",
    data: qs.stringify(data)
  });
};

const updateNotice = data => {
  return new request({
    url: "/admin/notice/updateNotice",
    method: "post",
    data: data
  });
};

const addNotice = data => {
  return new request({
    url: "/admin/notice/addNotice",
    method: "post",
    data: data
  });
};

const deleteAdminNotice = data => {
  return new request({
    headers: {
      "Content-Type": "application/json"
    },
    url: "admin/notice/deleteAdminNotice",
    method: "post",
    data: JSON.stringify(data)
  });
};

const publishNotice = data => {
  return new request({
    url: "/admin/notice/publishNotice",
    method: "post",
    data: data
  });
};

const cancelNotice = data => {
  return new request({
    url: "/admin/notice/cancelNotice",
    method: "post",
    data: data
  });
};

const getAdminNoticeById = () => {
  return new request({
    url: "/admin/notice/getAdminNoticeById",
    method: "post"
  });
};
const confirmNotice = data => {
  return new request({
    url: "/admin/notice/confirmNotice",
    method: "post",
    data: data
  });
};

const AdminNoticeApi = {
  getAllNotice,
  updateNotice,
  addNotice,
  deleteAdminNotice,
  publishNotice,
  cancelNotice,
  getAdminNoticeById,
  confirmNotice,
  toNotice
};
export default AdminNoticeApi;
