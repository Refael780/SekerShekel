import {
  REG_MID_SUC,
  REG_SUC,
  REG_FAILD,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUC,
  LOGIN_FAILD,
  LOG_OUT
} from '../action/types';

const intialState = {
  token: localStorage.getItem('token'),
  isMidAut: null,
  isFullAut: null,
  loading: true,
  admin: null,
  user: null
};

export default (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isFullAut: true,
        loading: false,
        user: payload
      };
    case REG_MID_SUC:
      return {
        ...state,
        ...payload,
        isMidAut: true,
        loading: false
      };
    case LOGIN_SUC:
    case REG_SUC:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isFullAut: true,
        loading: false
      };
    case LOG_OUT:
    case LOGIN_FAILD:
    case AUTH_ERROR:
    case REG_FAILD:
      localStorage.removeItem('token');
      return {
        ...state,
        ...payload,
        isFullAut: false,
        loading: false,
        token: null
      };
    default:
      return state;
  }
};
