import axiosClient from "./axiosClient";
const searchAPI = {
  getSearch: (params) => {
    const url = '/search';
    return axiosClient.get(url, { params });
  }
};
export default searchAPI;