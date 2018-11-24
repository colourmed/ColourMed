import { apiCall } from '../../services/api';
import { FETCH_FEATURED_ITEMS, ADD_TO_FEATURED, REMOVE_FROM_FEATURED } from '../actionTypes';
import { removeError, addError } from './errors';
import { removeSuccess, addSuccess } from './success';

export const fetchFeaturedItems = robeIds => ({
  type: FETCH_FEATURED_ITEMS,
  robeIds
})

export const addItemToFeatured = robeId => ({
  type: ADD_TO_FEATURED,
  robeId
});

export const removeItemFromFeatured = robeId => ({
  type: REMOVE_FROM_FEATURED,
  robeId
});

export const fetchFeatured = () => dispatch => {
  return apiCall('get', 'api/featured')
    .then(data => {
      const robeIds = data.map(item => item.robeRef);

      dispatch(fetchFeaturedItems(robeIds));
      dispatch(removeError());
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err.message));
    });
};

export const addToFeatured = newRobeId => dispatch => {
  return apiCall('post', `api/admin/featured/add/${newRobeId}`)
    .then(() => {
      dispatch(addItemToFeatured(newRobeId));
      dispatch(removeError());
      dispatch(addSuccess("Produs adaugat la recomandate."))
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err.message));
    });
};

export const removeFromFeatured = robeId => dispatch => {
  return apiCall('delete', `api/admin/featured/remove/${robeId}`)
    .then(removedId => {
      dispatch(removeItemFromFeatured(removedId));
      dispatch(removeError());
      dispatch(addSuccess("Produs eliminat din 'Recomandate'."))
    })
    .catch(err => {
      dispatch(removeSuccess());
      dispatch(addError(err.message));
    });
};
