import {MISC_LOADING, MISC_LOAD_DATA, MISC_ERROR} from './types';
import axios from '../api';

export const getMiscData = () => async (dispatch) => {
  try {
    dispatch({type: MISC_LOADING});
    const {data} = await axios({url: `/misc`});
    dispatch({type: MISC_LOAD_DATA, payload: data});
  } catch (error) {
    errorHandler(error, MISC_ERROR, dispatch);
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
