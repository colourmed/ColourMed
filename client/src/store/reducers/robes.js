import { GET_ROBES, ADD_ROBE } from '../actionTypes';

const DEFAULT_STATE = {
  robes: []
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_ROBES:
      return [...action.robes];
    case ADD_ROBE:
      return [...state, action.robe];
    default:
      return state;
  }
};
