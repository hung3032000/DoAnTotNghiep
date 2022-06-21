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

export const updateImageProduct = createAsyncThunk('updateImageProduct', async (values) => {
  const response = await adminAPI.updateImageProduct(values._id, values.data);
  return response;
});

export const updateMultipleImageProduct = createAsyncThunk('updateMultipleImageProduct', async (values) => {
  const response = await adminAPI.updateMultipleImageProduct(values._id, values.data);
  return response;
});

export const deleteProductDetail = createAsyncThunk('deleteProductDetail', async (id) => {
  const response = await adminAPI.deleteProduct(id);
  return response;
});
export const getRecommand = createAsyncThunk('getRecommand', async (values) => {
  const response = await productApi.getRecommand(values);
  return response;
});

const ListProductsSlice = createSlice({
  name: 'productId',
  initialState: {
    product: [],
    recommend: [],
  },
  reducers: {},
  extraReducers: {
    [getProductDetail.fulfilled]: (state, action) => {
      state.product = action.payload;
    },
    [updateProductDetail.fulfilled]: (state, action) => {
      state.product = action.payload;
    },
    [getRecommand.fulfilled]: (state, action) => {
      state.recommend = action.payload;
    },
  },
});
const { reducer } = ListProductsSlice;
export default reducer;
