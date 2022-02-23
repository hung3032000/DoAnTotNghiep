import axiosClient from './axiosClient';


const categoryCApi = {
  getAll(id,params) {
    const url = `/categories/${id}`;
    return axiosClient.get(url, {params});

  },
  get(id) {
    const url = 
    `/subcategories/${id}`;
    return axiosClient.get(url);
  },
};
export default categoryCApi;
