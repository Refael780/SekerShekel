import { REG_MID_SUC, REG_SUC, REG_FAILD } from '../action/types';

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
    case REG_MID_SUC:
      return {
        ...state,
        ...payload,
        isMidAut: true,
        loading: false
      };

    case REG_SUC:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isFullAut: true,
        loading: false
      };
    case REG_FAILD:
      localStorage.removeItem('token');
      return {
        ...state,
        ...payload,
        isFullAut: false,
        loading: false
      };
    default:
      return state;
  }
};
