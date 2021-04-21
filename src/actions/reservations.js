import {Alert, PermissionsAndroid} from 'react-native';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import {getPermission} from '../utils/permissions';

import {
  RESERVATIONS_FETCH,
  RESERVATIONS_FETCH_ERROR,
  UPDATE_UPCOMING_RESERVATION,
} from './types';

import axios from '../api';

export const getMyReservations = () => async (dispatch) => {
  try {
    const response = await axios.get('/orders');

    const orders = response.data;
    const upcomingOrders = [];
    const completedOrders = [];

    orders.forEach((order) => {
      const orderTime = order.timeDiscount.time.split('-')[1];
      const hours = orderTime.split(':')[0];
      const minutes = orderTime.split(':')[1];
      const orderDate = moment(order.date)
        .set('hours', hours)
        .set('minutes', minutes);

      if (order.cancelled) {
        completedOrders.unshift(order);
      } else if (orderDate < moment()) {
        if (order.unlockActive && !order.confirmed) {
          // check if order was unlocked but not paid, then its an upcoming order
          upcomingOrders.push(order);
        } else {
          completedOrders.unshift(order);
        }
        // console.log(order);
      } else {
        upcomingOrders.push(order);
        // console.log(order);
      }
    });

    dispatch({
      type: RESERVATIONS_FETCH,
      payload: {upcomingOrders, completedOrders},
    });
  } catch (error) {
    errorHandler(error, RESERVATIONS_FETCH_ERROR, dispatch);
  }
};

export const unlockDeal = (orderId) => (dispatch) => {
  if (!getPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
    Alert.alert(
      'Location required',
      'We require your location to unlock the visit',
    );
  }

  Geolocation.getCurrentPosition((position) =>
    _unlockDeal(dispatch, {...position.coords, orderId}),
  );
};

export const cancelOrder = (orderId, onSuccess) => (dispatch) => {
  _cancelOrder(dispatch, orderId, onSuccess);
};

const _unlockDeal = async (dispatch, data) => {
  // private function
  const response = await axios.post('/unlockDeal', data);
  dispatch({type: UPDATE_UPCOMING_RESERVATION, payload: response.data});
};

const _cancelOrder = async (dispatch, orderId, onSuccess) => {
  await axios.post(`/cancelBooking/${orderId}`);
  onSuccess();
};

function errorHandler(err, type, dispatch) {
  const errors = err.response.data.errors;
  if (errors) {
    errors.forEach((error) => {
      //   dispatch(setAlert(error.msg, "danger"));
      console.error(error);
    });
    dispatch({type});
  }
}
