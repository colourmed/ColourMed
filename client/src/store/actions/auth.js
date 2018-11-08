import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER, USER_LOGOUT } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.setItem('jwtToken', '');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch(userLogout());
  };
}

export function deleteAccount(userId) {
  return dispatch => {
    return apiCall('delete', `api/account/${userId}/delete_account`).catch(
      err => {
        dispatch(addError(err.message));
      }
    );
  };
}

export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall('post', `api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}
