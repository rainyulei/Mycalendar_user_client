/*
 * @Author: yu-lei
 * @Date: 2020-04-11 10:53:11
 * @Last Modified by: yu-lei
 * @Last Modified time: 2020-04-26 09:36:09
 */

import {
  EventTypes,
  UserTypes,
  ErrorTypes,
  WebSetting,
  Weather,
} from './actionTypes';
import moment from 'moment';
import store from 'store2';
import { DeviceInfo } from '../../utiles';
import { nanoid } from 'nanoid';
import {
  userLogin,
  userLogout,
  regiest,
  syncData,
  loadStoreByDate,
  checkToken,
  updateUserMessage,
  updateUserSetting,
  avaterUpload,
  getWeather,
} from '../../connect';
// 添加一个event
export const addEvent = ({ date, event }) => {
  const startTime = event.startAt.format('YYYY-MM-DD');
  let events = store.get(startTime) ? store.get(startTime) : [];
  const lated = moment(event.startAt).isBefore(moment());
  const staledated = moment(event.endAt).isBefore(moment());
  event = {
    ...event,
    lated,
    staledated,
    finished: false,
    focus: false,
    latedshow: false,
    staleshow: false,
  };
  events.push(event);
  store.set(startTime, events);
  const nowEvents = store.get(date) ? store.get(date) : [];
  return {
    type: EventTypes.ADD_EVENT,
    payload: {
      date,
      events: nowEvents,
    },
  };
};
export const editEvent = ({ date, event }) => {
  const startTime = event.startAt.format('YYYY-MM-DD');
  let events = store.get(startTime) ? store.get(startTime) : [];
  const newevents = events.map(item => {
    if (item.id === event.id) {
      return event;
    }
    return item;
  });
  store.set(startTime, newevents);
  const nowEvents = store.get(date) ? store.get(date) : [];
  return {
    type: EventTypes.EDIT_EVENT,
    payload: {
      date,
      events: nowEvents,
    },
  };
};
export const deleteEvent = ({ date, id }) => {
  let events = store.get(date) ? store.get(date) : [];
  const contains = (arr, id) => {
    let len = arr.length;
    while (len--) {
      if (arr[len].id === id) {
        return len;
      }
    }
    return false;
  };
  events.splice(contains(events, id), 1);
  if (events.length > 0) {
    store.set(date, events);
  } else {
    store.remove(date);
  }
  return {
    type: EventTypes.DELETE_EVENT,
    payload: {
      date,
      events: events,
    },
  };
};

export const findEvent = date => {
  let events = store.get(date) ? store.get(date) : [];
  return {
    type: EventTypes.FIND_EVENT,
    payload: {
      date,
      events,
    },
  };
};

/**
 *
 * user actions
 */
/**
 * 新增一个User
 * @param {*用户} user
 */
export const addUser = user => async dispatch => {
  const result = await regiest(user);
  if (result.code && result.code === 1000) {
    // TODO 对请求结果进行验证

    console.log(result, '==========114 actions =====result');
    store.set('token', result.data.token);
    const usermessage = {
      ...result.data.user,
      loginStatus: true,
      localstorageIsNew: true,
    };
    store.set('usermessage', usermessage);
    dispatch({
      type: UserTypes.ADD_USER,
      payload: usermessage,
    });
    return true;
  } else {
    return { message: result.error };
  }
};
/**
 * 修改一个用户
 * @param {用户} user
 */
export const editUserSetting = user => async dispatch => {
  console.log(user, '==============================action editor user');
  const resp = await updateUserSetting(user);
  console.log(resp);
  if (resp.code && resp.code === 1000) {
    const usermessage = {
      ...resp.data,
      loginStatus: true,
      localstorageIsNew: true,
    };
    store.set('usermessage', usermessage);
    dispatch({
      type: UserTypes.EDIT_USER,
      payload: usermessage,
    });
    return true;
  } else {
    return { message: resp.error };
  }
};
/**
 * 修改一个用户 信息
 * @param {用户} user
 */
export const editUserMessage = user => async dispatch => {
  const resp = await updateUserMessage(user);
  console.log(resp);
  if (resp.code && resp.code === 1000) {
    const usermessage = {
      ...resp.data,
      loginStatus: true,
      localstorageIsNew: true,
    };
    store.set('usermessage', usermessage);
    dispatch({
      type: UserTypes.EDIT_USER,
      payload: usermessage,
    });
    return true;
  } else {
    return { message: resp.error };
  }
};
/**
 * 用户登录
 * @param {用户} user
 * 登录的同时验证本地是否有数据  如果有最新的数据则 更新到远程
 * 否则 从远程更新到本地
 */
export const login = user => async dispatch => {
  const resp = await userLogin(user);
  if (resp.code && resp.code === 1000) {
    store.set('token', resp.data.token);
    const usermessage = {
      ...resp.data.user,
      loginStatus: true,
      localstorageIsNew: true,
    };
    store.set('usermessage', usermessage);
    dispatch({
      type: UserTypes.LOGIN,
      payload: usermessage,
    });
    return true;
  } else {
    return { message: resp.error };
  }
};
/**
 * 登出 登出的同时 将本地的数据同步到远程服务器
 */
export const logout = id => async dispatch => {
  const resp = await userLogout(id);
  // localstorage 中的用户配置信息删除
  console.log(resp);
  if (resp.code && resp.code === 1001) {
    store.remove('token');
    let usermessage = store.get('usermessage');
    usermessage = {
      ...usermessage,
      username: '',
      avater: '',
      email: '',
      _id: '',
      loginStatus: false,
      localstorageIsNew: true,
    };
    store.set('usermessage', usermessage);
    console.log(usermessage);
    dispatch({
      type: UserTypes.LOGOUT,
      payload: usermessage,
    });
  }
};
/**
 *  从本地同步数据到 远程服务器
 */
export const pushDatatoServer = () => async dispatch => {
  const data = store.getAll();

  const result = await syncData(data);
  if (result) {
    //TODO 数据验证 更新到本地localstorage  dispatch 一个刷新数据
    dispatch({});
  }
};
/**
 *  获取天气
 * 天气 两种 情况   1 用户设置城市  ===> 获取城市 ,根据城市显示天气 2 用户没有设置城市 ， 根据IP 显示chengshi
 * @param {*} city
 */
export const getweatherAction = city => async dispatch => {
  
  city = city ||  store.get('city') ;
  const res = await getWeather(city);

  const weather = res.data
  store.set('city', weather.city);
  dispatch({
    type: Weather.GET_WEATHER,
    payload: weather,
  });
};

/**
 * 信息初始化 获取
 */
/**
 * 初始化当前的浏览器信息
 */
export const initDeviceInfo = () => {
  const webmessage = DeviceInfo.getDeviceInfo({ domain: '' });
  return {
    type: WebSetting.SET_WEB_SETTING,
    payload: webmessage,
  };
};
/**
 * 初始化检查当前Token 信息
 */
export const initTokenCheck = () => async dispatch => {
  const token = store.get('token');
  if (token) {
    const usermessage = store.get('usermessage');
    const result = await checkToken(token);
    if (result.code !== 1000) {
      // 重新登录  提示用户登录过期重新登录
      await logout(usermessage._id);
    } else {
      // TODO 上传 用户的 event 数据
      // 并且 下载当前的用户信息数据更新本地usermessage
      const usermessage = {
        ...result.data.user,
        loginStatus: true,
        localstorageIsNew: true,
      };
      store.set('usermessage', usermessage);
      dispatch({
        type: UserTypes.LOGIN,
        payload: usermessage,
      });
      return true;
    }
  }
};
/**
 * 初始化的本地设置
 * 包括 本地的颜色 形态 等等设置
 */
export const initlocalsetting = () => {};

export const initSetting = () => async dispatch => {
  const DeviceInfoReducer = initDeviceInfo();
  dispatch(DeviceInfoReducer);
  // dispatch(initlocalsetting())
  const token = store.get('token');
  if (token) {
    const usermessage = store.get('usermessage');
    const result = await checkToken(token);
    if (result.code !== 1000) {
      // TODO 重新登录  提示用户登录过期重新登录
      await logout(usermessage._id);
    } else {
      // TODO 上传 用户的 event 数据
      store.set('usermessage', usermessage);
      dispatch({
        type: UserTypes.INITSETTING,
        payload: { ...usermessage, ...result.data },
      });
      return true;
    }
  }
};
// TODO 加载全局的 主题设置
export const loadLayoutEdit = () => {};
/**
 * error actions
 */

/**
 * 添加一个新的错误提醒
 * @param {*error {code , message, level="warning"||error}} param0
 */
export const AddError = ({ code, message, level }) => {
  const id = nanoid(6);
  const errorTime = moment();
  const errorCode = code || 400;
  const errorMsg = message || 'found a error!';
  const errorLevel = level || 'warning';
  return {
    type: ErrorTypes.ADD_ERROR,
    payload: {
      errorID: id,
      errorCode,
      errorMsg,
      errorTime,
      errorLevel,
    },
  };
};

/**
 * 删除一个错误
 * @param {*{errors：当前维护的错误列表，ID：需要删除的错误的ID}} param0
 */
export const DelleteError = ({ errors, id }) => {
  const newErrors = errors.filter(item => item.errorID !== id);
  return {
    type: ErrorTypes.DELETE_ERROR,
    payload: {
      errors: newErrors,
    },
  };
};
