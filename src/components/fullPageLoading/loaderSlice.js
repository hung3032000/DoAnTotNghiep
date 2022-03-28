import StorageKeys from 'constants/storage-keys';

const { createSlice } = require('@reduxjs/toolkit');

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    showLoader: false,
  },

  reducers: {
    showLoader: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.showLoader = true;
      },
  },
});

const { actions, reducer } = loaderSlice;
export const { showLoader,hideLoader} = actions; // named export
export default reducer; // default export
