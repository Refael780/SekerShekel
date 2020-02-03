import { SET_MODAL, REMOVE_MODAL } from './types';
import uuid from 'uuid';
export const setModal = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_MODAL,
    payload: { msg, alertType, id }
  });
};

export const remModel = id => dispatch => {
  dispatch({
    type: REMOVE_MODAL,
    payload: id
  });
};
