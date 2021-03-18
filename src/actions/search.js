import {
  FETCHING_RESTAURANT_TYPES,
  FETCHING_RESTAURANT_TYPES_FAILED,
  FETCH_RESTAURANT_TYPES,
  FETCH_RESTAURANTS,
  FETCHING_RESTAURANTS,
  FETCHING_RESTAURANTS_FAILED,
} from './types';
import axios from '../api';

export const indexRestaurantTypes = () => async (dispatch) => {
  try {
    dispatch({type: FETCHING_RESTAURANT_TYPES});
    const response = await axios.get('restaurant/types');
    dispatch({type: FETCH_RESTAURANT_TYPES, payload: response});
  } catch (error) {
    errorHandler(error, FETCHING_RESTAURANT_TYPES_FAILED, dispatch);
  }
};

export const indexSearchRestaurants = () => async (dispatch) => {
  try {
    dispatch({type: FETCHING_RESTAURANTS});
    const response = await axios.get('/restaurant');
    dispatch({type: FETCH_RESTAURANTS, payload: response.data});
  } catch (error) {
    errorHandler(error, FETCHING_RESTAURANTS_FAILED, dispatch);
  }
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
