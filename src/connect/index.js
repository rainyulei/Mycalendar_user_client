import $http from './axios';
import api from './api';
import qs from 'qs';
/**
 * 从服务器同步数据到本地 localstorage
 *
 * @param {*日期} date
 */
//TODO 重写这个方法
export const loadStoreByDate = async (date) => {
  const store = await $http.post('/api/login', { date });
  return store;
};
// 同步数据到服务器
export const syncData = async (data) => {
  return await $http.get('/api/syncData', {
    params: data,
  });
};
/**
 * 根据IP 或者自己设定的城市位置 获取天气信息
 */
export const getWeather = async (city = {}) => {
  return await $http.get('/api/weather', {
    params: city,
  });
};
/**
 *
 * @param {* 用户名密码} user
 * @return 返回值为今天的事件和 昨天的事件
 */
export const userLogin = async (user) => {
  return await $http.post('/api/login', user);
};
/**
 * 上传头像
 * @param {文件流} file
 */
export const avaterUpload = async (file) => {
  return await $http.post('/api/avaterupload', file);
};
/**
 * 注册
 * @param {用户} user
 */
export const regiest = async (user) => {
  return await $http.post('/api/regiest', user);
};
/**
 * 登出
 * 只需要提供登出信号救好了
 * @param {用户} user
 */
export const userLogout = async (id) => {
  return await $http.get('/api/logout', id);
};

export const updateUserSetting = async (user) => {
  return await $http.put('/api/editusersetting', user);
};
export const updateUserMessage = async (user) => {
  return await $http.put('/api/editusermessage', user);
};
/**
 * 查看email  是否已经存在
 * @param {*} email
 */
export const checkEmail = async (email) => {
  return await $http.get(`/api/checkemail?email=${email}`);
};
/**
 * 查看token有效性
 * @param {*} token
 */
export const checkToken = async (token) => {
  return await $http.post(`/api/checktoken`, { token });
};
/**
 * 查看用户名是否存在
 * @param {username} username
 */
export const checkUsername = async (username) => {
  return await $http.get(`/api/checkusername?username=${username}`);
};
