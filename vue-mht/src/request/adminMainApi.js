import request from "./axios";
import qs from "qs";

const getWordCount = data => {
  return new request({
    url: "/admin/system/getWordCount",
  });
};

const getOnlineUserCount = data =>{
  return new request({
    url: "/admin/system/getOnlineUserCount",
  });
}

const getRecentWeekHitCount = data =>{
  return new request({
    url: "/admin/system/getRecentWeekHitCount",
  });
}

const adminMainApi = {
    getWordCount,
    getOnlineUserCount,
    getRecentWeekHitCount
};
export default adminMainApi;
