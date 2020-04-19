const initialState = {
  title: '',
  surveyPages: [],
  currentPage: {
    page: 1,
    isChoosingAnswer: true,
    qut: '',
    answers: [],
    isCanReturn: false
  },
  status: true,
  peroid: null,
  isSavedinDB: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case typeName:
      return { ...state, ...payload };

    default:
      return state;
  }
};
