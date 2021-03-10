import { combineReducers } from "redux";
// import alert from './alert';
import { auth } from "./auth";
import { restaurants } from "./restaurant";
import { nearby } from "./nearby";
import { reservations } from "./reservations";
import { search } from "./search";
import { createorder } from "./createorder";

export default combineReducers({
  auth,
  restaurants,
  nearby,
  reservations,
  search,
  createorder
});
