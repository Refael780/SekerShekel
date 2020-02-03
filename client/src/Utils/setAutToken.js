import axios from 'axios';

const setAuthToken = token => {
  console.log(token);
  console.log('THERE /n');

  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    console.log('THERE ISNT TOKEN');

    delete axios.defaults.headers.common['x-auth-token'];
  }
};
export default setAuthToken;
