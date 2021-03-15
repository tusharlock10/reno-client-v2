import {NEARBY_FETCH_ERROR, NEARBY_FETCH} from './types';

import axios from '../api';

export const getNearbyRestaurants = (data) => async (dispatch) => {
  // data = {longitude, latitude, city}
  try {
    const response = await axios.post('/nearby', data);
    dispatch({type: NEARBY_FETCH, payload: {response, ...data}});
  } catch (error) {
    errorHandler(error, NEARBY_FETCH_ERROR, dispatch);
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
