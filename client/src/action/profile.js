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

export const CreateOrUpdateProfile = profile => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log('+-=-=-=-=-=-=-=-=-=-=-=');

  console.log(profile);
  console.log('+-=-=-=-=-=-=-=-=-=-=-=');

  console.log({ ...profile });
  console.log('+-=-=-=-=-=-=-=-=-=-=-=');

  const body = JSON.stringify({ ...profile });
  console.log(body);
  console.log('+-=-=-=-=-=-=-=-=-=-=-=');

  try {
    const res = await axios.post('api/profile', body, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERORR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
