import { UserTypes } from '../action/actionTypes';
const InitUser = {
  username: '',
  avater: '',
  email: '',
  _id: '',
  // TODO location
  location:'',
  loginStatus: false,
  localstorageIsNew: false, // 本地存储的信息是否是最新
  connectRange: 10, // 每隔多长时间和服务器进行一次数据同步  3 分钟  5 分钟 10 分钟  20 分钟
  upcomingEventRange: 24, // 监控即将到来的任务的监控报告时长  默认是一天 8 小时 16 小时 24 小时 48 小时
  eventremend: 20, // 5 10 20 40 60 分钟 提前提醒
  finished: false, // finished 任务是否监控 默认是false
  lated: true, //迟到的任务是否监控
  latedRange: 24, //迟到的任务监控的时长  默认是1天 8 小时 16 小时 24 小时 48 小时  1周
  staledated: true, //过期的任务监控 默认开启
  staledatedRange: 24, //默认是2天 默认是1天 8 小时 16 小时 24 小时 48 小时  1周
};

export default (state = InitUser, action) => {
  switch (action.type) {
    case UserTypes.ADD_USER:
      const newstate = action.payload;
      return newstate;
    case UserTypes.EDIT_USER:
      const editstate = { ...state, ...action.payload };
      return editstate;
    case UserTypes.LOGIN:
      const Loginstate = { ...state, ...action.payload };
      return Loginstate;
    case UserTypes.LOGOUT:
      const logoutstate = { ...action.payload };
      return logoutstate;
    case UserTypes.INITSETTING:
      const initstate = { ...action.payload };
      return initstate;
    default:
      return state;
  }
};
