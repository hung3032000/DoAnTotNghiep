import axiosClient from './axiosClient';
const voucherApi = {
  getAll() {
    const url = 
    '/coupons';
    return axiosClient.get(url);
  },
};
export default voucherApi;
