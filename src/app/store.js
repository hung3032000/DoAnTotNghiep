import userReducer from 'components/web/auth/userSlice';
import productListReducer from 'components/web/product/ProductListSlice';
import productReducer from 'components/web/product/ProductSlice';
import categoryListReducer from 'components/web/category/CategorySlice';
import categoryChildListReducer from 'components/web/category/CategoryChildSlice';
import orderReducer from 'components/admin/order/OrderSlice';
import cartReducer from 'components/web/cart/CartSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {

  //user
  user: userReducer,
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