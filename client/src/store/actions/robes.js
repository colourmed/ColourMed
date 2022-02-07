import { apiCall } from '../../services/api';
import { GET_ROBES, ADD_ROBE, REMOVE_ROBE } from '../actionTypes';
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

export const deleteRobe = robeId => ({
  type: REMOVE_ROBE,
  robeId
});

export const fetchRobes = () => dispatch => {
  return apiCall('get', 'api/robes')
    .then(data => {
      dispatch(setRobes(data));
      dispatch(removeError());
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err?.message));
    });
};

export const addRobe = robe => dispatch => {
  return apiCall('post', 'api/admin/robes/new', robe)
    .then(data => {
      dispatch(newRobe(data));
      dispatch(removeError());
      dispatch(addSuccess('Produs adăugat.'));
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err?.message));
    });
};

export const editRobe = (updatedRobe, id) => dispatch => {
  return apiCall('put', `api/admin/robes/${id}`, updatedRobe)
    .then(res => {
      dispatch(deleteRobe(id));
      dispatch(newRobe(res));
      dispatch(removeError());
      dispatch(addSuccess(`Produs editat cu success.`));
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err));
    });
};

export const removeRobe = id => dispatch => {
  return apiCall('delete', `api/admin/robes/${id}`)
    .then(removedRobeId => {
      dispatch(deleteRobe(removedRobeId));
      dispatch(removeError());
      dispatch(addSuccess(`Produsul cu id-ul "${removedRobeId}" a fost șters.`));
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err));
    });
};
