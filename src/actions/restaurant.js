import {
  INDEX_RESTAURANT,
  RESTAURANT_FETCH_ERROR,
  IS_INDEXING_BRAND_TILES,
  IS_INDEXING_RESTAURANT,
  INDEX_BRAND_TILES,
  BRAND_TILE_FETCH_ERROR,
} from './types';
import axios from '../api';

export const indexRestaurants = () => async (dispatch) => {
  try {
    dispatch({type: IS_INDEXING_RESTAURANT});
    const response = await axios.get('/restaurant');
    dispatch({type: INDEX_RESTAURANT, payload: response.data});
  } catch (error) {
    errorHandler(error, RESTAURANT_FETCH_ERROR, dispatch);
  }
};

export const brandTiles = (city) => async (dispatch) => {
  try {
    dispatch({type: IS_INDEXING_BRAND_TILES});
    const response = await axios.get('/brandTiles', {params:{city}});
    dispatch({type: INDEX_BRAND_TILES, payload: response.data});
  } catch (error) {
    errorHandler(error, BRAND_TILE_FETCH_ERROR, dispatch);
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
