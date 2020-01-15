import { REG_MID_SUC, REG_FAILD, REG_SUC } from './types';
import axios from 'axios';

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
    console.log({ name, email, password, adress, phonNumber });
    console.log(body);

    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REG_MID_SUC,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);

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
    dispatch({
      type: REG_FAILD
    });
  }
};
