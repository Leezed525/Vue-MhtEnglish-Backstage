// 刚刚封装的axios
import request from "./axios";
import qs from "qs";

//获取单词列表
const getAllAdminWord = data => {
  return request({
    // 表单数据加这个请求头
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "admin/word/getAllAdminWord",
    method: "post",
    data: qs.stringify(data)
  });
};

//更新单词信息
const updateAdminWord = data => {
  return request({
    url: "admin/word/updateAdminWord",
    method: "post",
    data: data
  });
};

//添加
const addAdminWord = data => {
  return request({
    url: "admin/word/addAdminWord",
    method: "post",
    data: data
  });
};

const toWord = data =>{
  return request({
    url: "admin/system/toWord",
    method: "get",
  });
}

//删除单词
const deleteAdminWordByIds = data => {
  return request({
    headers: {
      "Content-Type": "application/json"
    },
    url: "admin/word/deleteAdminWordByIds",
    method: "post",
    data: JSON.stringify(data)
  });
};


var WordApi = {
  toWord,
  getAllAdminWord,
  updateAdminWord,
  addAdminWord,
  deleteAdminWordByIds
};
export default WordApi;
