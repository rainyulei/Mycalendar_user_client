import { EventTypes } from '../action/actionTypes';
const InitEvents = {
  date: "", //date 日期
  events: [
    // {    id:"", // event 的ID uuid
    //     title: "",//string 标题
    //    finished:"", // true false 是否已经完成
    //     startAt: '', //time 开始时间
    //     endAt:'', // 结束时间
    //     description: '', // string 描述
    //     important: '',//true false  是否是重要事项
    //     focus:'',// true false 是否是关注事项
    //     lated: '',// true false 是否已经迟到
    //     latedshow:'', // true false 迟到是否已经提示过
    //     staledated: '',//true false 是否已经越期
    //     staleshow:'',// true false 过期是否已经提醒过了
    //  后续
    //     是否是外出
    //     目的地  
    // 查询目的地天气
    // }
  ],
};

export default (state = InitEvents, action) => {
  switch (action.type) {
    case EventTypes.ADD_EVENT:
      const newstate = action.payload;
      return newstate;
    case EventTypes.DELETE_EVENT:
      return action.payload;
    case EventTypes.EDIT_EVENT:
      return action.payload;
    case EventTypes.FIND_EVENT:
      return action.payload;
    default:
      return state;
  }
};
