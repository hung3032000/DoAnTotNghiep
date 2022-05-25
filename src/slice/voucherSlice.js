import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import voucherApi from 'api/voucherApi';
import adminAPI from 'api/adminAPI';

import StorageKeys from 'constants/storage-keys';
export const getAllVoucher = createAsyncThunk('voucher/getAllVoucher', async () => {
  const data = await voucherApi.getAll();
  return data;
});

export const getPriceAfterUsingVoucher = createAsyncThunk('voucher/getPriceAfterUsingVoucher', (data) => {
  localStorage.setItem(StorageKeys.VOUCHER, JSON.stringify(data));
  return data;
});

export const addVoucher = createAsyncThunk('addVoucher', async (data) => {
  const response = await adminAPI.addVoucher(data);
  return response;
});
export const updateVoucher = createAsyncThunk('updateVoucher', async (values) => {
  const response = await adminAPI.updateVoucher(values._id, values);
  return response;
});
export const deleteVoucher = createAsyncThunk('deleteVoucher', async (id) => {
  const response = await adminAPI.deleteVoucher(id);
  return response;
});

const voucherSlice = createSlice({
  name: 'voucher',
  initialState: {
    voucher: [],
    data: JSON.parse(localStorage.getItem(StorageKeys.VOUCHER)) || [],

  },
  reducers: {},
  extraReducers: {
    [getAllVoucher.fulfilled]: (state, action) => {
      state.voucher = action.payload;
    },
    [getPriceAfterUsingVoucher.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { reducer } = voucherSlice;
export default reducer;

