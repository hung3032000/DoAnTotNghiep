import userReducer from 'slice/userSlice';
import productListReducer from 'slice/ProductListSlice';
import productReducer from 'slice/ProductSlice';
import categoryListReducer from 'slice/CategorySlice';
import categoryChildListReducer from 'slice/CategoryChildSlice';
import orderReducer from 'slice/OrderSlice';
import cartReducer from 'slice/CartSlice';
import voucherReducer from 'slice/voucherSlice';
import sizeAcolorReducer from 'slice/SizeAColor';
import saleReducer from 'slice/SaleSlice';
import staticReducer from 'slice/StaticSlice';
import searchReducer from 'slice/SearchSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  //user
  user: userReducer,
  search: searchReducer,
  voucher: voucherReducer,
  productList: productListReducer,
  categoryList: categoryListReducer,
  categoryChildList: categoryChildListReducer,
  product: productReducer,
  cart: cartReducer,
  //admin
  sizeAcolor: sizeAcolorReducer,
  order: orderReducer,
  sale: saleReducer,
  static: staticReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
