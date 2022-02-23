import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.dataCart;

// Count number of products in cart
export const cartItemsCountSelector = createSelector(cartItemsSelector, (dataCart) =>
  dataCart.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total of cart
export const cartTotalSelector = createSelector(cartItemsSelector, (dataCart) =>
  dataCart.reduce((total, item) => total + item.product.price * item.quantity, 0)
);
