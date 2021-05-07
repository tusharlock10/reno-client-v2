import {
  RESERVATIONS_FETCH,
  RESERVATIONS_FETCH_ERROR,
  UPDATE_UPCOMING_RESERVATION,
} from '../actions/types';

const INITIAL_STATE = {
  orders: null,
  loading: true,
  error: false,
};

export const reservations = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case RESERVATIONS_FETCH:
      return {
        ...state,
        orders: payload,
        error: false,
        loading: false,
      };
    case RESERVATIONS_FETCH_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case UPDATE_UPCOMING_RESERVATION:
      const newUpcomingOrders = state.orders.upcomingOrders.map((order) => {
        if (action.payload.id === order.id) {
          return action.payload;
        }
        return order;
      });

      return {
        ...state,
        orders: {...state.orders, upcomingOrders: newUpcomingOrders},
      };

    default:
      return state;
  }
};
