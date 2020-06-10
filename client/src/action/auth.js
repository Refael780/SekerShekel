import axios from 'axios';
import { setAlert } from './alert';
import setAutToken from '../Utils/setAutToken';
import {
  REG_MID_SUC,
  REG_FAILD,
  REG_SUC,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUC,
  LOGIN_FAILD,
  LOG_OUT,
  CLEAR_PROFILE
} from './types';

export const loadUser = () => async dispatch => {
  console.log('action: TRY LOAD USER');

  // if (localStorage.token) {
  //   setAutToken(localStorage.token);
  // }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
export const logout = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOG_OUT
  });
};

export const loginUser = (email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({
      email,
      password
    });

    console.log('CLIENT' + email + password);

    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUC,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');

    console.log(err.response);
    console.log(err);
    console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAILD
    });
  }
};

export const regM = ({
  name,
  email,
  password,
  adress,
  phonNumber
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const password2 = '21231233';
  const body = JSON.stringify({ name, email, password2, adress, phonNumber });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REG_MID_SUC,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REG_FAILD
    });
  }
};

export const regS = (mailToken, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ password });
  try {
    const res = await axios.post(`/api/users/${mailToken}`, body, config);
    dispatch({
      type: REG_SUC,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REG_FAILD
    });
  }
};
