import axiosClient from './axiosClient';
const voucherApi = {
  getAll() {
    const url = 
    '/coupons';
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/coupons';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/coupons/${id}`;
    return axiosClient.delete(url);
  },
  update(data) {
    const url = `/coupons/${data.id}`;
    return axiosClient.put(url,data);
  },
};
export default voucherApi;
