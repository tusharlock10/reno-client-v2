import {
  USER_LOADED,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_ERROR,
  AWAIT_AUTH,
  AUTH_CANCELED,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import axios from "../api";
import setAuthToken from "../utils/setAuthToken";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../utils/navigationService";

//await auth
export const awaitAuth = authState => async dispatch => {
  authState
    ? dispatch({ type: AWAIT_AUTH })
    : dispatch({ type: AUTH_CANCELED });
};

//get user data
export const loadUser = () => async dispatch => {
  const token = await AsyncStorage.getItem("jwtToken");
  if (token) {
    setAuthToken(token);
  }
  try {
    const response = await axios.get("/user-profile");
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
  }
};

//user auth
export const facebookAuth = data => async dispatch => {
  console.log(data);
  const user = {
    facebookID: data.id,
    email: data.email,
    firstname: data.first_name,
    lastname: data.last_name
  };
  try {
    const response = await axios.post("/auth", user);
    // console.log(response);
    dispatch({ type: AUTH_SUCCESS, payload: response.data });
    dispatch(loadUser());
    NavigationService.navigate("ChooseLocation");
  } catch (err) {
    errorHandler(err, AUTH_FAIL, dispatch);
  }
};

export const googleAuth = data => async dispatch => {
  const user = {
    facebookID: data.user.id,
    email: data.user.email,
    firstname: data.user.givenName,
    lastname: data.user.familyName
  };
  try {
    const response = await axios.post("/auth", user);
    // console.log(response);
    dispatch({ type: AUTH_SUCCESS, payload: response.data });
    dispatch(loadUser());
    NavigationService.navigate("ChooseLocation");
  } catch (err) {
    errorHandler(err, AUTH_FAIL, dispatch);
  }
};

//logout user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
  //   history.push("/");
};
//sign jwt
// function jwtSign(payload) {
//   var jwt_token;
//   jwt.sign(
//     payload,
//     "dfjiksofgjnfgkmitmhibytjhijjjihiytjhybinyithjiyjhihtihjiiohtjyyyyhjtoyhjytohjoyj@21343//",
//     { expiresIn: 360000 },
//     (err, token) => {
//       console.log(token);
//       jwt_token = token;
//     }
//   );

//   return jwt_token;
// }

//error handler ***most important :)
function errorHandler(err, type, dispatch) {
  const errors = err.response.data.errors;
  if (errors) {
    errors.forEach(error => {
      //   dispatch(setAlert(error.msg, "danger"));
      console.log(error);
    });
    dispatch({ type });
  }
}
