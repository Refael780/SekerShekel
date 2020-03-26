import {
  GET_SURVEY,
  SURVEY_ERROR,
  FILL_SURVEY_SUCC,
  GET_SORT_SURVEYS,
  GET_ALL_SURVEYS
} from '../action/types';

const intialState = {
  surveys: [],
  threeSurveys: [],
  survey: null,
  loading: true,
  user: null,
  period: null,
  isAdmin: false,
  status: null,
  alrtMsg: null
};

export default (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SURVEY: {
      return {
        ...state,
        survey: payload,
        loading: false,
        status: true
      };
    }
    case GET_SORT_SURVEYS: {
      return {
        ...state,
        loading: false,
        threeSurveys: [...payload]
      };
    }
    case GET_ALL_SURVEYS: {
      return {
        ...state,
        surveys: [...payload],
        loading: false
      };
    }
    case FILL_SURVEY_SUCC: {
      return {
        ...state,
        survey: payload,
        loading: false,
        status: true,
        alrtMsg: payload
      };
    }
    case SURVEY_ERROR: {
      return {
        ...state,
        survey: null,
        loading: false,
        user: null,
        alrtMsg: payload
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
