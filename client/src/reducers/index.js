import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import auth from './auth';
import profile from './profile';
export default combineReducers({ modal, alert, auth, profile });
