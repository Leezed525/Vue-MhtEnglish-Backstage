import request from "./axios";
import qs from "qs";

const getWordCount = data => {
  return new request({
    url: "/admin/system/getWordCount"
  });
};

const getOnlineUserCount = data => {
  return new request({
    url: "/admin/system/getOnlineUserCount"
  });
};

const getRecentWeekHitCount = data => {
  return new request({
    url: "/admin/system/getRecentWeekHitCount"
  });
};

const getAllRecentWeekWordsLearnCount = data => {
  return new request({
    url: "/admin/system/getAllRecentWeekWordsLearnCount"
  });
};

const getRecentWeekNewUserCount = data => {
  return new request({
    url: "/admin/system/getRecentWeekNewUserCount"
  });
};

const getRecentWeekActiveUserCount = data => {
  return new request({
    url: "/admin/system/getRecentWeekActiveUserCount"
  });
};

const getRecentWeekAllUserCount = data => {
  return new request({
    url: "/admin/system/getRecentWeekAllUserCount"
  });
};

const adminMainApi = {
  getWordCount,
  getOnlineUserCount,
  getRecentWeekHitCount,
  getAllRecentWeekWordsLearnCount,
  getRecentWeekNewUserCount,
  getRecentWeekActiveUserCount,
  getRecentWeekAllUserCount
};
export default adminMainApi;
