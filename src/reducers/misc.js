import {MISC_LOADING, MISC_LOAD_DATA, MISC_ERROR} from '../actions/types';

const INITIAL_STATE = {
  misc: null,
  error: false,
  loading: true,
};

export const misc = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case MISC_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case MISC_LOAD_DATA:
      return {
        ...state,
        misc: payload,
        error: false,
        loading: false,
      };
    case MISC_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
