import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import productApi from 'api/productApi';

export const getProductDetail = createAsyncThunk('ProductDetail', async (id) => {
  const response = await productApi.get(id);
  return response;
});


export const addProductProductDetail = createAsyncThunk('addProductProductDetail', async (data) => {
  const response = await adminAPI.addProduct(data);
  return response;
});
export const updateProductDetail = createAsyncThunk('updateProductDetail', async (values) => {
  const response = await adminAPI.updateProduct(values._id, values);
  return response;
});
export const deleteProductDetail = createAsyncThunk('deleteProductDetail', async (id) => {
  const response = await adminAPI.deleteProduct(id);
  return response;
});




const ListProductsSlice = createSlice({
  name: 'productId',
  initialState: {
    product: [],
  },
  reducers: {},
  extraReducers: {
    [getProductDetail.fulfilled]: (state, action) => {
      state.product = action.payload;
    },
    [updateProductDetail.fulfilled]: (state, action) => {
      state.product = action.payload;
    },
    // case types.UPDATE_SERVICE:
		// 	const newServices = state.services.map((service) =>
		// 		service._id === payload._id ? payload : service
		// 	);
		// 	return {
		// 		...state,
		// 		services: newServices,
		// 	};

  },
});
const { reducer } = ListProductsSlice;
export default reducer;
