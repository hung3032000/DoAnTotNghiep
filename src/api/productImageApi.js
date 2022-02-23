import axiosClient from './axiosClient';


const productImageApi = {
  getAll(params) {
    const url = '/products';
    return axiosClient.get(url, {params});
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};
export default productImageApi;
