import { GET_PROFILE, PROFILE_ERORR } from './types';
import axios from 'axios';

export const loadMyProfile = () => async dispatch => {
  const res = await axios.get('/api/profile/me').catch(err => {
    console.log('Faild to Enter Server ');
  });
  try {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERORR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
