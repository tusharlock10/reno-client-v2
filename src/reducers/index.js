import {combineReducers} from 'redux';
import {auth} from './auth';
import {restaurants} from './restaurant';
import {nearby} from './nearby';
import {reservations} from './reservations';
import {search} from './search';
import {createorder} from './createorder';
import {misc} from './misc';

export default combineReducers({
  auth,
  restaurants,
  nearby,
  reservations,
  search,
  createorder,
  misc,
});
