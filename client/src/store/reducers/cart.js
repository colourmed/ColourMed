import { SET_CART_ITEMS, ADD_TO_CART, REMOVE_FROM_CART } from '../actionTypes';

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.robes;
    case ADD_TO_CART:
      return [...state, action.robe];
    case REMOVE_FROM_CART:
      return action.remainingRobes;
    default:
      return state;
  }
};
