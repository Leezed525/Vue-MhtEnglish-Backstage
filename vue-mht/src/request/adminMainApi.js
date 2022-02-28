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

const getAllRecentWeekWordsLearnCount = data =>{
  return new request({
    url: "/admin/system/getAllRecentWeekWordsLearnCount",
  });
}

const adminMainApi = {
    getWordCount,
    getOnlineUserCount,
    getRecentWeekHitCount,
    getAllRecentWeekWordsLearnCount
};
export default adminMainApi;
