import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import adminAPI from 'api/adminAPI';

import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  const data = await userApi.register(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload, { status: true });
  if (data.error) {
    return null;
  }
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return data.user;
});

export const update = createAsyncThunk('user/update', async (payload) => {
  const data = await userApi.updateInformationUser(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data));
  return data;
});

export const getAllUser = createAsyncThunk('admin/getAllUser', async (params) => {
  const data = await adminAPI.getAllUser(params);
  return data;
});
export const addUser = createAsyncThunk('admin/addUser', async (params) => {
  const data = await adminAPI.addUser(params);
  return data;
});

export const updateUser = createAsyncThunk('admin/updateUser', async (values) => {
  const data = await adminAPI.updateUser(values._id, values);
  return data;
});
export const deleteUser = createAsyncThunk('admin/deleteUser', async (id) => {
  const data = await adminAPI.deleteAccountUser(id);
  return data;
});

export const loginGoogle = createAsyncThunk('user/loginGoogle', async (payload) => {
  const data = await userApi.loginGoogle(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return data.user;
});
export const ChangePassword = createAsyncThunk('user/ChangePassword', async (values) => {
  const data = await userApi.ChangePassword(values);
  return data;
});

export const addAddress = createAsyncThunk('user/addAddress', async (values) => {
  const data = await userApi.addAddress(values);
  return data;
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    jwt: localStorage.getItem(StorageKeys.TOKEN) || {},
    userList: [],
    userListDetail: [],
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [update.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.userList = action.payload;
    },
    [loginGoogle.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
