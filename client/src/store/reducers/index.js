import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import success from './success'
import robes from './robes';
import cart from './cart';
import featured from './featured';

const appReducer = combineReducers({
  currentUser,
  errors,
  success,
  robes,
  cart,
  featured
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
