import { apiCall } from '../../services/api';
import { SET_CART_ITEMS, ADD_TO_CART } from '../actionTypes';
import { removeError, addError } from './errors';
import { removeSuccess, addSuccess } from './success';

export const setCartItems = robes => ({
  type: SET_CART_ITEMS,
  robes
});

export const addToCart = robe => ({
  type: ADD_TO_CART,
  robe
});

export const fetchCartItems = () => (dispatch, getState) => {
  // Get items and convert them to an array.
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const { robes } = getState();

  // Check if all cart items are still "intact" (haven't been heavily edited).
  for (let i = 0; i < cartItems.length; i++) {
    let itemIsIntact = false;

    for (const robe of robes) {
      if (
        robe._id === cartItems[i]._id &&
        robe.price === cartItems[i].price &&
        robe.forMen === cartItems[i].forMen &&
        robe.colors.includes(cartItems[i].colors[0]) &&
        robe.sizes.includes(cartItems[i].sizes[0])
      ) {
        itemIsIntact = true;
      }
    }

    // If the item has been edited or removed, remove it from storage.
    if (!itemIsIntact) {
      cartItems.splice(i, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }

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

export const placeOrder = userData => (dispatch, getState) => {
  const { firstName, lastName, address, phoneNumber, email } = userData;
  const { cart } = getState();
  
  dispatch(addSuccess('Comanda este finalizata.'));

  const isUserDataValid = !!(
    firstName &&
    lastName &&
    address &&
    phoneNumber &&
    email
  );

  if (isUserDataValid) {
    const orderData = {
      userData: { ...userData },
      items: cart
    };

    return apiCall('post', 'api/order', orderData)
      .then(() => {
        // Clear cart
        localStorage.setItem('cartItems', '[]');
        dispatch(setCartItems([]));

        dispatch(removeError());
      })
      .catch(err => {
        dispatch(removeSuccess());
        dispatch(addError(err.message));
      });
  } else {
    dispatch(removeSuccess());
    dispatch(
      addError('Va rog completati tot formularul pentru a plasa comanda.')
    );
  }
};
