import { FETCH_FEATURED_ITEMS, ADD_TO_FEATURED, REMOVE_FROM_FEATURED } from '../actionTypes';

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_FEATURED_ITEMS:
      return [...action.robeIds];
    case ADD_TO_FEATURED:
      return [...state, action.robeId];
    case REMOVE_FROM_FEATURED:
      return state.filter(featured => featured !== action.robeId);
    default:
      return state;
  }
};
