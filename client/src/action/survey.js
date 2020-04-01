import {
  GET_SURVEY,
  GET_ALL_SURVEYS,
  GET_SORT_SURVEYS,
  SURVEY_ERROR,
  FILL_SURVEY_SUCC
} from './types';
import axios from 'axios';

export const fillSurveyCom = (title, survey) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const Survey = {
    title: title,
    surveyQuts: [...survey]
  };
  console.log(Survey);

  const body = JSON.stringify(survey);
  try {
    console.log('in The Action');

    const res = await axios.post(`api/seker/${title}`, body, config);
    dispatch({
      type: FILL_SURVEY_SUCC,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: SURVEY_ERROR,
      payload: errors
    });
  }
};
export const loadAllSurvey = () => async dispatch => {
  try {
    const res = await axios.get('/api/seker/');
    let allSurvey = [...res.data];
    const sortedActivitSurvey = allSurvey.sort(
      (a, b) =>
        new Date(b.period.end) -
        new Date(Date.now()) -
        (new Date(a.period.end) - new Date(Date.now()))
    );

    ///TO Do
    // Remove element if its pariod is expired
    //***Psuodo****
    // forehch  sortedActivitSurvey
    /// if element.period== o =>delete elment

    console.log(sortedActivitSurvey);

    dispatch({
      type: GET_ALL_SURVEYS,
      payload: res.data
    });
    dispatch({
      type: GET_SORT_SURVEYS,
      payload: sortedActivitSurvey
    });
  } catch (error) {
    dispatch({
      type: SURVEY_ERROR
    });
  }
};

export const loadSurveyToFill = title => async dispatch => {
  try {
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
