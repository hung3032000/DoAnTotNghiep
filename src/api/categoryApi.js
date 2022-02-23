import axiosClient from './axiosClient';


const categoryApi = {
  getAll(params) {
    const url = '/categories/pagingcategory/paging';
    return axiosClient.get(url, {params});
  },
  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
};
export default categoryApi;
