import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import searchAPI from 'api/searchAPI';

export const getTopTrending = createAsyncThunk('getTopTrending', async () => {
  const response = await searchAPI.getTopTrending();
  return response;
});



const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getTopTrending.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});
const { reducer } = SearchSlice;
export default reducer;
