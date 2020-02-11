import { GET_SURVEY, SURVEY_ERROR, FILL_SURVEY_SUCC } from '../action/types';

const intialState = {
  surveys: [],
  survey: null,
  loading: true,
  user: null,
  period: null,
  isAdmin: false
};

export default (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SURVEY: {
      return {
        ...state,
        survey: payload,
        loading: false
      };
    }
    case SURVEY_ERROR: {
      return {
        ...state,
        survey: null,
        loading: false,
        user: null
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
