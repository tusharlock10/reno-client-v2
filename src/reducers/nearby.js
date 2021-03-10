import { NEARBY_FETCH, NEARBY_FETCH_ERROR } from "../actions/types";

const INITIAL_STATE = {
  restaurants: null,
  error: false,
  longitude:"",
  latitude:"",
  loading: true
};

export const nearby = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEARBY_FETCH:
      return {
        ...state,
        restaurants: payload.response,
        longitude: payload.longitude,
        latitude:payload.latitude,
        loading: false
      };
    case NEARBY_FETCH_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      };

    default:
      return state;
  }
};
