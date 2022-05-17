import StorageKeys from 'constants/storage-keys';

const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    dataCart: JSON.parse(localStorage.getItem(StorageKeys.CART)) || [],
  },

  reducers: {
    addToCart: (state, action) => {
      const { dataCart } = state;
      const { product, quantity, color, size } = action.payload;
      const fileIndex = (dataCart, id, colors,sizes) => {
        let result = -1;
        dataCart.forEach((productCart, index) => {
          if (productCart.product._id === id && productCart.color === colors && productCart.size === sizes) {
            result = index;
          }
        });
        return result;
      };

      const index = fileIndex(dataCart, product._id, color, size);
      if (index !== -1) {
        dataCart[index].quantity += quantity;
      } else {
        dataCart.unshift({
          color: color,
          size: size,
          product,
          quantity: quantity,
        });
      }

      localStorage.setItem(StorageKeys.CART, JSON.stringify(dataCart));
    },

    updateCartProduct(state, action) {
      const { dataCart } = state;
      const { index, quantity } = action.payload;
      const indexState = dataCart.findIndex((product, indexCart) => indexCart === index);
      if (indexState !== -1) {
        dataCart[indexState].quantity = quantity;
      }
      localStorage.setItem(StorageKeys.CART, JSON.stringify(dataCart));
    },

    removeFromCart(state, action) {
      const { dataCart } = state;
      const index = action.payload;
      const indexState = dataCart.findIndex((product, indexCart) => indexCart === index);
      if (indexState !== -1) {
        dataCart.splice(indexState, 1);
      }

      localStorage.setItem(StorageKeys.CART, JSON.stringify(dataCart));
    },
    emptyCart(state) {
      localStorage.removeItem(StorageKeys.CART);
      state.dataCart = [];
    },
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, updateCartProduct, removeFromCart, emptyCart } = actions; // named export
export default reducer; // default export
