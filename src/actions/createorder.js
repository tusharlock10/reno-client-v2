import {
  FETCHING_RES_ORDER_DATA,
  FETCH_RES_ORDER_DATA,
  FETCH_RES_ORDER_ERROR,
} from './types';
import axios from '../api';

export const indexCreateOrder = (id, date) => async (dispatch) => {
  try {
    dispatch({type: FETCHING_RES_ORDER_DATA});
    const response = await axios({
      url: `/restaurant/${id}`,
      headers: {date},
    });
    dispatch({type: FETCH_RES_ORDER_DATA, payload: response});
  } catch (error) {
    errorHandler(error, FETCH_RES_ORDER_ERROR, dispatch);
  }
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
