import { apiCall } from '../../services/api';
import { GET_ROBES, ADD_ROBE } from '../actionTypes';
import { addError, removeError } from './errors';
import { addSuccess, removeSuccess } from './success';

export const setRobes = robes => ({
  type: GET_ROBES,
  robes
});

export const newRobe = robe => ({
  type: ADD_ROBE,
  robe
});

export const fetchRobes = () => dispatch => {
  return apiCall('get', 'api/robes')
    .then(data => {
      dispatch(setRobes(data));
      dispatch(removeError());
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err.message));
    });
};

export const addRobe = robe => dispatch => {
  return apiCall('post', 'api/admin/robes/new', robe)
    .then(data => {
      dispatch(newRobe(data));
      dispatch(removeError());
      dispatch(addSuccess('Halat adaugat.'));
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err.message));
    });
};
