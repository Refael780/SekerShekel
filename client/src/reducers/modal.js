import { SET_MODAL, REMOVE_MODAL } from '../action/types';

const intialState = [];

export default (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MODAL:
      return [...state, payload];
    case REMOVE_MODAL:
      return state.filter(modal => modal.id !== payload);
    default:
      return state;
  }
};
