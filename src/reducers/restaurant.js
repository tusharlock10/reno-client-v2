import {
  INDEX_RESTAURANT,
  RESTAURANT_FETCH_ERROR,
  INDEX_BRAND_TILES,
  IS_INDEXING_BRAND_TILES,
  IS_INDEXING_RESTAURANT,
  BRAND_TILE_FETCH_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  restaurants: null,
  error: false,
  gotBrandTiles: false,
  gotRestaurantData: false,
  showHomeScreen: true
};

export const restaurants = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case IS_INDEXING_BRAND_TILES:
      return {
        ...state,
        gotRestaurantData: false
      };
    case IS_INDEXING_RESTAURANT:
      return {
        ...state,
        gotBrandTiles: false
      };
    case INDEX_RESTAURANT:
      return {
        ...state,
        restaurants: payload,
        gotRestaurantData: true
      };
    case RESTAURANT_FETCH_ERROR:
      return {
        ...state,
        error: true,
        gotRestaurantData: false
      };
    case INDEX_BRAND_TILES:
      return {
        ...state,
        brandTiles: payload,
        gotBrandTiles: true
      };
    case BRAND_TILE_FETCH_ERROR:
      return {
        ...state,
        error: true,
        gotBrandTiles: false
      };
    default:
      return state;
  }
};
