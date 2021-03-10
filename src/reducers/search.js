import {
  FETCHING_RESTAURANT_TYPES,
  FETCHING_RESTAURANT_TYPES_FAILED,
  FETCH_RESTAURANT_TYPES,
  FETCH_RESTAURANTS,
  FETCHING_RESTAURANTS,
  FETCHING_RESTAURANTS_FAILED
} from "../actions/types";

const INITIAL_STATE = {
  restaurantTypes: null,
  error: false
};

export const search = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_RESTAURANTS:
      return {
        ...state,
        restaurants: payload,
        loading:true
      };
    case FETCHING_RESTAURANTS:
      return {
        ...state,
        loading: true
      };
    case FETCHING_RESTAURANTS_FAILED:
      return {
        ...state,
        loading: false
      };
    case FETCH_RESTAURANT_TYPES:
      return {
        ...state,
        loading: false,
        restaurantTypes: payload
      };
    case FETCHING_RESTAURANT_TYPES:
      return {
        loading: true,
        error: false
      };
    case FETCHING_RESTAURANT_TYPES_FAILED:
      return {
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
