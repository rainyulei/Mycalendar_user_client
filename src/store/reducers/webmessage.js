import {} from '../action/actions';
import { WebSetting } from '../action/actionTypes';
const initState = {
  browserInfo: '',
  deviceType: '',
  fingerprint: '',
  language: '',
  netWork: '',
  orientation: '',
  os: '',
  osVersion: '',
  screenHeight: 0,
  screenWidth: 0,
  userAgent: '',
  wbHeight: 0,
  wbWidth: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case WebSetting.SET_WEB_SETTING:
      return { ...action.payload };
    default:
      return state;
  }
};
