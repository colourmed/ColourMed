import { ADD_SUCCESS, REMOVE_SUCCESS } from '../actionTypes';

export const addSuccess = success => ({
  type: ADD_SUCCESS,
  success
});

export const removeSuccess = () => ({
  type: REMOVE_SUCCESS
});
