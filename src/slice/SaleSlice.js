import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';

export const getSale = createAsyncThunk('getSale', async (id) => {
  const response = await adminAPI.getSaleByProductId(id);
  return response;
});

export const addSale = createAsyncThunk('addSale', async (data) => {
  const response = await adminAPI.addSale(data);
  return response;
});
export const deleteSale = createAsyncThunk('deleteSale', async (id) => {
  const response = await adminAPI.deleteSale(id);
  return response;
});
export const updateSale = createAsyncThunk('updateSale', async (id, data) => {
  const response = await adminAPI.updateSale(id, data);
  return response;
});

const SaleSlice = createSlice({
  name: 'Sale',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getSale.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});
const { reducer } = SaleSlice;
export default reducer;
