import axios from "axios";

export default axios.create({
  baseURL: __DEV__?"http://192.168.0.103:5000/api/v1":"https://renoapp.herokuapp.com/api/v1",
});