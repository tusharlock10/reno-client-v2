import {
  FETCHING_RES_ORDER_DATA,
  FETCH_RES_ORDER_DATA,
  FETCH_RES_ORDER_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  orderData: null,
  error: false,
  loading: false
};

export const createorder = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCHING_RES_ORDER_DATA:
      return {
        ...state,
        error: false,
        loading: true
      };
    case FETCH_RES_ORDER_DATA:
      return {
        ...state,
        orderData: payload,
        error: false,
        loading: false
      };
    case FETCH_RES_ORDER_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};
