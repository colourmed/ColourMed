import { SET_CART_ITEMS, ADD_TO_CART } from '../actionTypes';
import { removeError } from './errors';
import { addSuccess } from './success';

export const setCartItems = robes => ({
  type: SET_CART_ITEMS,
  robes
});

export const addToCart = robe => ({
  type: ADD_TO_CART,
  robe
});

export const fetchCartItems = () => dispatch => {
  // Get items and convert them to an array.
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  dispatch(setCartItems(cartItems));
  dispatch(removeError());
};

export const addItemToCart = newItem => dispatch => {
  // Get items and convert them to an array.
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  let isNewItemInCart = false;
  let itemIndexInCart = 0;

  // Loop through cart to see if newItem is already in cart.
  for (let i = 0; i < cartItems.length; i++) {
    const areItemsEqual =
      cartItems[i].id === newItem.id &&
      cartItems[i].colors[0] === newItem.colors[0] &&
      cartItems[i].sizes[0] === newItem.sizes[0];

    if (areItemsEqual) {
      isNewItemInCart = true;
      itemIndexInCart = i;
    }
  }

  if (isNewItemInCart) {
    // if newItem is already in cart, add to its quantity
    cartItems[itemIndexInCart].quantity = (
      Number(cartItems[itemIndexInCart].quantity) + Number(newItem.quantity)
    ).toString();

    dispatch(setCartItems(cartItems));
    dispatch(removeError());
    dispatch(addSuccess('Cantitate adaugata la produsul din cos.'));
  } else {
    // if newItem is not already in cart, push it into the cart
    cartItems.push(newItem);
    dispatch(addToCart(newItem));
    dispatch(removeError());
    dispatch(addSuccess('Produs adaugat in cos.'));
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeItemsFromCart = itemToRemove => dispatch => {
  // Get items and convert them to an array.
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  let remainingCartItems = [];

  // Loop through cart items.
  for (let i = 0; i < cartItems.length; i++) {
    const currentItem = cartItems[i];

    const areItemsEqual =
      cartItems[i].id === itemToRemove.id &&
      cartItems[i].colors[0] === itemToRemove.colors[0] &&
      cartItems[i].sizes[0] === itemToRemove.sizes[0];

    // Push to a new array all items that do not match itemToRemove.
    if (!areItemsEqual) {
      remainingCartItems.push(currentItem);
    }
  }

  // Set the updated cart to localStorage.
  localStorage.setItem('cartItems', JSON.stringify(remainingCartItems));

  dispatch(setCartItems(remainingCartItems));
  dispatch(removeError());
  dispatch(addSuccess('Produse eliminate din coș.'));
};
