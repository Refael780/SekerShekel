import {
  PROMOT_QUSTION,
  PROMOT_PAGE,
  ADD_QUSTION_TO_SURVEY,
  CONFIRM_OPEN_QUSTION_TO_SURVY,
  CONFIRM_OPEN_QUSTION_TO_DATA,
  ADD_EXTRA_DETAILS,
  SUBMIT_CREATE_SURVEY
} from '../action/types';

const initialState = {
  title: '',
  surveyQuts: [], ///The REAL survey with the exact field like DB
  surveyPages: [], //This survey is for collect data on each page f
  currentPage: {
    page: 1,
    qustionNumber: 1,
    isChoosingAnswer: true,
    qut: '',
    answers: [],
    isCanReturn: false
  },
  qut: {},
  status: true,
  peroid: null,
  sekerImg: '',
  isSavedinDB: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROMOT_QUSTION:
      return {
        ...state,

        currentPage: {
          ...state.currentPage,
          qustionNumber: payload + 1
        }
      };
    case PROMOT_PAGE:
      return {
        ...state,

        currentPage: {
          ...state.currentPage,
          page: payload + 1
        }
      };
    case ADD_QUSTION_TO_SURVEY:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          qut: payload
        }
      };
    case CONFIRM_OPEN_QUSTION_TO_SURVY: {
      const data = payload;
      console.log(data.isChoosenAnswer);

      let surveyQutsTemp = state.surveyQuts;
      let Q = {};
      let qut = {};
      qut.qust = data.qut;
      qut.isChoosenAnswer = data.isChoosingAnswer;
      qut.index = data.qustionNumber;
      qut.answers = [];
      qut.answers = [...data.answers];
      console.log(data.answers);

      Q = {
        qut
      };

      surveyQutsTemp.push(Q);
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          qut: data.qut,
          isChoosingAnswer: data.isChoosingAnswer,

          answers: data.answers,
          isCanReturn: true
        },

        surveyQuts: surveyQutsTemp
      };
    }
    case CONFIRM_OPEN_QUSTION_TO_DATA: {
      let data = state.surveyPages;
      data.push(state.currentPage);

      return {
        ...state,
        surveyPages: data
      };
    }
    case ADD_EXTRA_DETAILS: {
      return {
        ...state,
        title: payload.title,
        sekerImg: payload.sekerImg,
        period: payload.period,
        surveyQuts: {
          ...state.surveyQuts
        }
      };
    }
    case SUBMIT_CREATE_SURVEY: {
      return {
        ...state,
        isSavedinDB: true
      };
    }

    default:
      return state;
  }
};
