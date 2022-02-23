import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import orderApi from 'api/orderApi';
import StorageKeys from 'constants/storage-keys';

export const addOrderUser = createAsyncThunk('addOrderUser', async (values) => {
  const response = await orderApi.add(values);
  return response;
});

export const getOrderAdmin = createAsyncThunk('getOrderAdmin', async (params) => {
  const response = await adminAPI.listOrder(params);
  return response;
});
export const getOrderCompleteAdmin = createAsyncThunk('getOrderCompleteAdmin', async (params) => {
  const response = await adminAPI.listOrderComplete(params);
  return response;
});
export const addOrderCompleteAdmin = createAsyncThunk('addOrderCompleteAdmin', async (data) => {
  const response = await adminAPI.addOrderComplete(data);
  return response;
});
export const deleteOrderAdmin = createAsyncThunk('deleteOrderAdmin', async (id) => {
  const response = await adminAPI.deletOrder(id, { status: 'Cancel' });
  return response;
});
export const statusOrderComplete = createAsyncThunk('statusOrderComplete', async (id,data) => {
  const response = await adminAPI.statusOrderComplete(id,data);
  return response;
});


export const getOrder = createAsyncThunk('getOrder', async (params) => {
  const response = await orderApi.getAll(params);
  return response;
});

const ListCategorySlice = createSlice({
  name: 'order',
  initialState: {
    data: [],
    dataComplete: [],
  },
  reducers: {
    checkout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.CART);
      state.data = [];
    },
  },
  extraReducers: {
    [getOrderAdmin.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getOrderCompleteAdmin.fulfilled]: (state, action) => {
      state.dataComplete = action.payload;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});
const { actions,reducer } = ListCategorySlice;
export const { checkout } = actions;
export default reducer;
