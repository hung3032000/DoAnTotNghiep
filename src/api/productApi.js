import axiosClient from './axiosClient';
const productApi = {
  getAll(params) {
    const url = '/products/paging';
    return axiosClient.get(url, { params });
  },
  getAllSearch() {
    const url = '/products';
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  getSizeByProductId(id) {
    const url = `/sizes/product/${id}`;
    return axiosClient.get(url);
  },
  getRecommand(values) {
    const url = `/recomentdations`;
    return axiosClient.post(url, values);
  },
};
export default productApi;
