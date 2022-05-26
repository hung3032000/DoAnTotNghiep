import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';

export const getSizeProduct = createAsyncThunk('getSizeProduct', async (id) => {
  const response = await adminAPI.getSizeProduct(id);
  return response;
});
export const getSizeById = createAsyncThunk('getSizeById', async (id) => {
  const response = await adminAPI.getSizeById(id);
  return response;
});
export const addSizeAColor = createAsyncThunk('addSizeAColor', async (data) => {
  const response = await adminAPI.addSizeAColor(data);
  return response;
});
export const deleteSizeAColor = createAsyncThunk('deleteSizeAColor', async (id) => {
  const response = await adminAPI.deleteSizeAColor(id);
  return response;
});
export const updateSizeAColor = createAsyncThunk('updateSizeAColor', async (id,data) => {
  const response = await adminAPI.updateSizeAColor(id,data);
  return response;
});

const SizeAColorSlice = createSlice({
  name: 'sizeAcolor',
  initialState: {
    size: [],
    sizeA: [],
  },
  reducers: {},
  extraReducers: {
    [getSizeProduct.fulfilled]: (state, action) => {
      state.size = action.payload;
    },
    [getSizeById.fulfilled]: (state, action) => {
      state.sizeA = action.payload;
    },
  },
});
const { reducer } = SizeAColorSlice;
export default reducer;
