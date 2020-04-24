import event from './events';
import error from './error';
import user from './user';

import { combineReducers } from 'redux';
export default combineReducers({ event, error, user });
