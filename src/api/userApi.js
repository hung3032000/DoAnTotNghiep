import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '/users';
    return axiosClient.post(url, data);
  },
  login(data, params) {
    const url = '/auth';
    return axiosClient.post(url, data, { params });
  },
  updateInformationUser: (data) => {
    const url = '/users/update';
    return axiosClient.put(url, data);
  },
  loginGoogle: (data) => {
    const url = '/googlelogin';
    return axiosClient.post(url, data);
  },
  ChangePassword: (data) => {
    const url = '/users/update/password';
    return axiosClient.put(url, data);
  },
  addAddress: (data) => {
    const url = '/addresses';
    return axiosClient.post(url, data);
  },
  getAddress: () => {
    const url = '/addresses';
    return axiosClient.get(url);
  },
  updateAddress:(id,data) => {
    const url = `/addresses/${id}`;
    return axiosClient.put(url,data);
  },
  updateDefaultAddress:(id,data) => {
    const url = `/addresses/${id}`;
    return axiosClient.put(url,data);
  },
  deleteAddress:(id) => {
    const url = `/addresses/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
