import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import productApi from 'api/productApi';

export const getListProduct = createAsyncThunk('listProduct', async (params) => {
  const response = await productApi.getAll(params);
  return response;
});
export const getListSize = createAsyncThunk('getListSize', async (id) => {
  const response = await productApi.getSizeByProductId(id);
  return response;
});
export const getListProductAdmin = createAsyncThunk('getListProductAdmin', async (params) => {
  const response = await productApi.getAll(params);
  return response;
});
export const getListProductSearch = createAsyncThunk('getListProductSearch', async (params) => {
  const response = await productApi.getAllSearch(params);
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
    dataA: [],
    search: [],
    size: [],
  },
  reducers: {},
  extraReducers: {
    [getListProduct.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getListProductAdmin.fulfilled]: (state, action) => {
      state.dataA = action.payload;
    },
    [getListSize.fulfilled]: (state, action) => {
      state.size = action.payload;
    },
    [getListProductSearch.fulfilled]: (state, action) => {
      state.search = action.payload;
    },
  },
});
const { reducer } = ListProductSlice;
export default reducer;
