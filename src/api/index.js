import axios from "axios";

export default axios.create({
  // baseURL: "https://limitless-falls-89813.herokuapp.com/api/v1",
  baseURL:"http://192.168.0.103:5000/api/v1"
});