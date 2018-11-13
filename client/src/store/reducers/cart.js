import { SET_CART_ITEMS, ADD_TO_CART, REMOVE_FROM_CART } from '../actionTypes';

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.robeIds;
    case ADD_TO_CART:
      return [...state, action.robeId];
    case REMOVE_FROM_CART:
      return state.filter(robeId => robeId !== action.robeId);
    default:
      return state;
  }
};
