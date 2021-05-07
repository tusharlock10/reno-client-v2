import {
  FETCHING_RES_ORDER_DATA,
  FETCH_RES_ORDER_DATA,
  FETCH_RES_ORDER_ERROR,
  USER_HAS_ACTIVE_ORDER,
} from './types';
import axios from '../api';

export const indexCreateOrder = (id, date) => async (dispatch) => {
  try {
    dispatch({type: FETCHING_RES_ORDER_DATA});
    const response = await axios({
      url: `/restaurant/${id}`,
      headers: {date},
    });
    dispatch({type: FETCH_RES_ORDER_DATA, payload: response.data});
  } catch (error) {
    errorHandler(error, FETCH_RES_ORDER_ERROR, dispatch);
  }
};

export const updateUserActiveOrder = (value) => ({
  type: USER_HAS_ACTIVE_ORDER,
  payload: value,
});

export const confirmBooking = (data, onSuccess, onError) => async (
  dispatch,
) => {
  const res = await axios.post('/confirmBooking', data);
  if (res.data.confirmed) {
    dispatch(updateUserActiveOrder(true));
    onSuccess(res.data);
  } else onError();
};

function errorHandler(err, type, dispatch) {
  const errors = err.response.data.errors;
  if (errors) {
    errors.forEach((error) => {
      console.error(error);
    });
    dispatch({type});
  }
}
