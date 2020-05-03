import event from './events';
import error from './error';
import user from './user';
import weather from './weather';
import webmessage from './webmessage';

import { combineReducers } from 'redux';
export default combineReducers({ event, error, user, weather, webmessage });
