import {NEARBY_FETCH_ERROR, NEARBY_FETCH} from './types';

import axios from '../api';

export const getNearbyRestaurants = (longitude, latitude) => async (
  dispatch,
) => {
  try {
    const response = await axios.post('/nearby', {
      longitude,
      latitude,
    });
    dispatch({type: NEARBY_FETCH, payload: {response, longitude, latitude}});
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
