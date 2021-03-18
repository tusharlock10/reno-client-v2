import {
  RESERVATIONS_FETCH,
  RESERVATIONS_FETCH_ERROR,
  UPDATE_UPCOMING_RESERVATION,
} from './types';

import axios from '../api';

export const getMyReservations = () => async (dispatch) => {
  try {
    const response = await axios.get('/orders');
    dispatch({type: RESERVATIONS_FETCH, payload: response.data});
  } catch (error) {
    errorHandler(error, RESERVATIONS_FETCH_ERROR, dispatch);
  }
};

export const updateUpcomingReservation = (data) => {
  return {type: UPDATE_UPCOMING_RESERVATION, payload: data};
};

function errorHandler(err, type, dispatch) {
  const errors = err.response.data.errors;
  if (errors) {
    errors.forEach((error) => {
      //   dispatch(setAlert(error.msg, "danger"));
      console.error(error);
    });
    dispatch({type});
  }
}
