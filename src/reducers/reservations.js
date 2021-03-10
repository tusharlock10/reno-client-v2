import { RESERVATIONS_FETCH, RESERVATIONS_FETCH_ERROR } from "../actions/types";

const INITIAL_STATE = {
    orders:null,
    loading:true,
    error:false
};

export const reservations = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESERVATIONS_FETCH:
      return {
        ...state,
        orders:payload,
        error:false,
        loading: false
      };
    case RESERVATIONS_FETCH_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      };

    default:
      return state;
  }
};
