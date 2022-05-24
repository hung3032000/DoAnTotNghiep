import userReducer from 'slice/userSlice';
import productListReducer from 'slice/ProductListSlice';
import productReducer from 'slice/ProductSlice';
import categoryListReducer from 'slice/CategorySlice';
import categoryChildListReducer from 'slice/CategoryChildSlice';
import orderReducer from 'slice/OrderSlice';
import cartReducer from 'slice/CartSlice';
import voucherReducer from 'slice/voucherSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {

  //user
  user: userReducer,
  voucher: voucherReducer,
  productList: productListReducer,
  categoryList: categoryListReducer,
  categoryChildList: categoryChildListReducer,
  product: productReducer,
  cart: cartReducer,
  //admin
  order: orderReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;