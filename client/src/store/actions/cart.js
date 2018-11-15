import { SET_CART_ITEMS, ADD_TO_CART, REMOVE_FROM_CART } from '../actionTypes';
import { removeError } from './errors';
import { addSuccess } from './success';

export const setCartItems = robeIds => ({
  type: SET_CART_ITEMS,
  robeIds
});

export const addToCart = robeId => ({
  type: ADD_TO_CART,
  robeId
});

export const removeFromCart = robeId => ({
  type: REMOVE_FROM_CART,
  robeId
});

export const fetchCartItems = () => dispatch => {
  // Get item ids and convert them to an array.
  const cartItemIds = localStorage.getItem('cartItemIds');
  const cartItemIdsList = cartItemIds ? cartItemIds.split(',') : [];

  // Set array to redux store.
  dispatch(setCartItems(cartItemIdsList));
  dispatch(removeError());
};

export const addItemToCart = id => dispatch => {
  // Get item ids, push the new id and set them back to localStorage.
  const cartItemIds = localStorage.getItem('cartItemIds');
  const cartItemIdsList = cartItemIds ? cartItemIds.split(',') : [];

  cartItemIdsList.push(id);
  localStorage.setItem('cartItemIds', cartItemIdsList);

  dispatch(addToCart(id));
  dispatch(removeError());
  dispatch(addSuccess('Produs adaugat in cos.'));
};

export const removeItemsFromCart = id => dispatch => {
  // Get item ids.
  const cartItemIds = localStorage.getItem('cartItemIds');
  let cartItemIdsList = cartItemIds ? cartItemIds.split(',') : [];

  // Remove all items with given id.
  cartItemIdsList = cartItemIdsList.filter(itemId => itemId !== id);

  // Set the updated cart to localStorage.
  localStorage.setItem('cartItemIds', cartItemIdsList);

  dispatch(removeFromCart(id));
  dispatch(removeError());
  dispatch(addSuccess('Produs eliminat din cos.'));
};
