import axios from 'axios';

export default axios.create({
  baseURL: __DEV__
    ? 'http://192.168.0.103:5000/api/v1'
    : 'http://65.1.155.16:5000/api/v1',
  timeout: 10000,
});
