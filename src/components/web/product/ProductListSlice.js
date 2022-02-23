import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import productApi from 'api/productApi';

export const getListProduct = createAsyncThunk('listProduct', async (params) => {
  const response = await productApi.getAll(params);
  return response;
});

export const getListProductAdmin = createAsyncThunk('getListProductAdmin', async (params) => {
  const response = await productApi.getAll(params);
  return response;
});

export const addListProductAdmin = createAsyncThunk('addListProductAdmin', async (values) => {
  const response = await adminAPI.addProduct(values);
  return response;
});

const ListProductSlice = createSlice({
  name: 'productList',
  initialState: {
    data: [],
    dataA:[],
    length: 0,
    lengthA: 0,

  },
  reducers: {},
  extraReducers: {
    [getListProduct.fulfilled]: (state, action) => {
      state.length = action.payload.length;
      state.data = action.payload;
    },
    [getListProductAdmin.fulfilled]: (state, action) => {
      state.lengthA = action.payload.length;
      state.dataA = action.payload;
    },
  },
});
const { reducer } = ListProductSlice;
export default reducer;
