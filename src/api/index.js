import axios from "axios";

export default axios.create({
  // baseURL: "https://renoapp.herokuapp.com/api/v1",
  baseURL:"http://192.168.0.103:5000/api/v1"
});