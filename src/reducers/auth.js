import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATING,
  AUTH_ERROR,
  USER_LOADED,
  AUTH_SUCCESS,
  AWAIT_AUTH,
  AUTH_CANCELED,
  AUTH_FAIL,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  LOGIN_SUCCESS,
  LOGOUT,
  RENO_PASS_PURCHASE,
  USER_HAS_ACTIVE_ORDER
} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
  token: null,
  isAuthenticated: null,
  loading: false,
  user: null,
};

async function setAsyncToken(token) {
  await AsyncStorage.setItem('jwtToken', token);
}

async function removeAsyncToken() {
  await AsyncStorage.removeItem('jwtToken');
}

export const auth = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };
    case AUTH_CANCELED:
      return {
        ...state,
        loading: false,
      };
    case AWAIT_AUTH:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      setAsyncToken(payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
    case CLEAR_PROFILE:
    case RENO_PASS_PURCHASE:
      return {
        ...state,
        user: {...state.user, renoPass: action.payload},
      };
    case USER_HAS_ACTIVE_ORDER:
      return {...state, user: {...state.user, hasActiveOrder: action.payload}};
    case LOGOUT:
      removeAsyncToken();
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};
