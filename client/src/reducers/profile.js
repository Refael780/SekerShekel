import { GET_PROFILE, PROFILE_ERORR, CLEAR_PROFILE } from '../action/types';

const intialState = {
  myProfile: null,
  allProfile: [],
  sekers: [],
  loading: true,
  error: {}
};

export default (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        myProfile: payload,
        loading: false
      };
    case PROFILE_ERORR:
      return {
        ...state,
        profile: null,
        loading: false,
        error: payload.error
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
};
