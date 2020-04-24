import { ErrorTypes } from '../action/actionTypes';

const initError = {
  errorNum: 0, //error的现存数量
  errors: [], // error的数组
  // const error = {
  //     errorID:"",//6位短ID
  //     errorCode: "",// 错误的异常码
  //     errorMsg: "",// 错误信息
  //     errorTime: "", // 错误时间
  //     errorLevel:"" , // worning error
  // }
};

export default (state = initError, action) => {
  switch (action.type) {
    case ErrorTypes.ADD_ERROR:
      const AdderrorNum = state.errorNum + 1;
      const Adderrors = [...state.errors, action.payload];
      return {
        errorNum: AdderrorNum,
        errors: Adderrors,
      };
    case ErrorTypes.DELETE_ERROR:
      const deleteErrorNum = state.errorNum - 1;
      return {
        errorNum: deleteErrorNum,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};
