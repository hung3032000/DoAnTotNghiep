import axiosClient from './axiosClient';


const orderApi = {
  getAll(params) {
    const url = '/orders';
    return axiosClient.get(url, {params});
  },
  get(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
  update(data) {
    const url = `/orders/${data.id}`;
    return axiosClient.patch(url,data);
  },
};
export default orderApi;
