import axios from 'axios';
import { AddError } from '../store/action/actions';
import store2 from 'store2';
import { tokenWhiteList as whiteList} from './api'
import store from 'store2';
const axiosEntery = axios.create({
  // baseURL: 'localhost:7001',
});
/**
 * 请求 拦截器
 */
axiosEntery.interceptors.request.use(
  (req) => {
    if (!whiteList.includes(req.url)) {
      // 添加token
      const token = store2.get('token');
      if (token) {
        req.headers['Authorization'] = 'Bearer ' + token;
      } else {
        // TODO 没有 token  直接 让其什么都不做  直接提示不可以请求 就OK了
      }
    }
    return req;
  },
  (error) => {
    // 服务器 请求次数超出 报错拒绝
    console.log(error);
    AddError({
      code: 403,
      message: 'bad request, 你的请求超出次数了，请过一会再试!',
      level: 'error',
    });
  }
);
/**
 * 相应拦截器
 */
axiosEntery.interceptors.response.use(
  (resp) => {
    if (resp.status === 404) {
      // 请求到404
      console.log(404);
    } else if (resp.status ===500) {
      // 请求到500 页面
      console.log(500);
    } else if (resp.status === 401) {
      AddError({
        code: 401,
        message: 'no auth!',
        level: 'error',
      });
    }else if (resp.status === 429) {
      AddError({
        code: 429,
        message: 'application time limit!',
        level: 'error',
      });
    }
    if (resp.headers.setauthenticationheader) { 
      const token = resp.headers.setauthenticationheader
      store.set('token',token)
    }
    return resp.data;
  },
  (error) => {
    console.log(error, '44行');
    AddError({
      code: 401,
      message: 'no auth!',
      level: 'error',
    });
  }
);
export default axiosEntery;
