import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import staticApi from 'api/staticAPI';

export const getProductList = createAsyncThunk('getProductList', async (params) => {
  const response = await staticApi.getProduct(params);
  return response;
});

export const getOrderList = createAsyncThunk('getOrderList', async (params) => {
  const response = await staticApi.getOrder(params);
  return response;
});

export const getLastedOrder = createAsyncThunk('getLastedOrder', async () => {
  const response = await staticApi.getLastedOrder();
  return response;
});

export const getTopProduct = createAsyncThunk('getTopProduct', async () => {
  const response = await staticApi.getTopProduct();
  return response;
});
export const getTotalField = createAsyncThunk('getTotalField', async () => {
  const response = await staticApi.getTotalField();
  return response;
});

const StaticSlice = createSlice({
  name: 'static',
  initialState: {
    productListStatic: [],
    orderListStatic: [],
    orderLasted: [],
    topProduct: [],
    totalField: [],
  },
  reducers: {},
  extraReducers: {
    [getProductList.fulfilled]: (state, action) => {
      state.productListStatic = action.payload;
    },
    [getOrderList.fulfilled]: (state, action) => {
      state.orderListStatic = action.payload;
    },

    [getLastedOrder.fulfilled]: (state, action) => {
      state.orderLasted = action.payload;
    },
    [getTopProduct.fulfilled]: (state, action) => {
      state.topProduct = action.payload;
    },
    [getTotalField.fulfilled]: (state, action) => {
      state.totalField = action.payload;
    },
  },
});
const { reducer } = StaticSlice;
export default reducer;
