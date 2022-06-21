import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import searchAPI from 'api/searchAPI';

export const getTopTrending = createAsyncThunk('getTopTrending', async () => {
  const response = await searchAPI.getTopTrending();
  return response;
});
export const getSearchByWord = createAsyncThunk('getSearchByWord', async (params) => {
  const response = await searchAPI.getSearchByWord(params);
  return response;
});


const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    data: [],
    dataSearch:[]
  },
  reducers: {},
  extraReducers: {
    [getTopTrending.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getSearchByWord.fulfilled]: (state, action) => {
      state.dataSearch = action.payload;
    },
  },
});
const { reducer } = SearchSlice;
export default reducer;
