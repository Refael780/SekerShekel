import {
  PROMOT_QUSTION,
  PROMOT_PAGE,
  ADD_QUSTION_TO_SURVEY,
  CONFIRM_OPEN_QUSTION_TO_SURVY,
  CONFIRM_OPEN_QUSTION_TO_DATA,
  ADD_EXTRA_DETAILS,
  SUBMIT_CREATE_SURVEY
} from './types';
import axios from 'axios';
export const promotQustion = qustionNumber => async dispatch => {
  await dispatch({
    type: PROMOT_QUSTION,
    payload: qustionNumber
  });
};
export const promotPage = page => dispatch => {
  dispatch({
    type: PROMOT_PAGE,
    payload: page
  });
};
/**
 *  currentPage: {
    page: 1,
    qustionNumber: 1,
    isChoosingAnswer: true,
    qut: '',
    answers: [],
    isCanReturn: false
 */

export const confirmQustionToSurvey = (
  qut,
  isChoosingAnswer,
  qustionNumber,
  answers = [
    {
      answer: 'fill this answer',
      optionAnswerNumber: 1,
      choosen: false
    }
  ]
) => async dispatch => {
  let pay = {
    qut: qut,
    isChoosingAnswer: isChoosingAnswer,
    qustionNumber: qustionNumber,
    answers: answers
  };

  await dispatch({
    type: CONFIRM_OPEN_QUSTION_TO_SURVY,
    payload: pay
  });
  await dispatch({
    type: CONFIRM_OPEN_QUSTION_TO_DATA,
    payload: pay
  });
};
export const addQustionToSurvey = qustion => dispatch => {
  dispatch({
    type: ADD_QUSTION_TO_SURVEY,
    payload: qustion
  });
};

export const addExtraDetails = (title, sekerImg, period) => async dispatch => {
  let p = { title: title, sekerImg: sekerImg, period: period };
  dispatch({
    type: ADD_EXTRA_DETAILS,
    payload: p
  });
};

export const submitCreateSurveyQuts = (
  surveyQuats,
  title,
  sekerImg,
  period
) => async dispatch => {
  console.log('ENTER to submitCreateSurveyQuts');
  console.log(surveyQuats);
  const survey = {
    title: title,
    sekerImg: sekerImg,
    peroid: period,
    surveyQuts: [...surveyQuats]
  };

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({
      ...survey
    });
    console.log('submitCreateSurveyQuts');

    const res = await axios.post('/api/seker', body, config);
    console.log('submitCreateSurveyQuts2');

    dispatch({
      type: SUBMIT_CREATE_SURVEY,
      payload: res.data
    });
  } catch (err) {
    console.log('ERORR in submitCreateSurveyQuts');

    console.log(err);
  }
};
