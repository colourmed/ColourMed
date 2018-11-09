import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import success from './success'
import robes from './robes';

const appReducer = combineReducers({
  currentUser,
  errors,
  success,
  robes
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
