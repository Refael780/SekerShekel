import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import auth from './auth';
import profile from './profile';
import survey from './survey';
import createSurvey from './createSurvey';
export default combineReducers({
  modal,
  alert,
  auth,
  profile,
  survey,
  createSurvey
});
