import { GET_ROBES, ADD_ROBE, REMOVE_ROBE } from '../actionTypes';

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_ROBES:
      return [...action.robes];
    case ADD_ROBE:
      return [...state, action.robe];
    case REMOVE_ROBE:
      return state.filter(robe => robe._id !== action.robeId);
    default:
      return state;
  }
};
