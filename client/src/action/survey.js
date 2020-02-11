import { GET_SURVEY, SURVEY_ERROR, FILL_SURVEY_SUCC } from './types';
import axios from 'axios';

export const loadSurveyToFill = title => async dispatch => {
  try {
    console.log('ENTER loadSurvey');
    console.log(title);

    const res = await axios.get(`/api/seker/ ${title}/data`);
    console.log(res);

    dispatch({
      type: GET_SURVEY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: SURVEY_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
