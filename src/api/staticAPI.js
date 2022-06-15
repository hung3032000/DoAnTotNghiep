import axiosClient from "./axiosClient";
const staticAPI = {
  getProduct: (params) => {
    const url = '/statistics/products/time';
    return axiosClient.get(url, { params });
  },
  getOrder: (params) => {
    const url = '/statistics';
    return axiosClient.get(url, { params });
  },
  getTotalField: () => {
    const url = '/dashboards/totalField';
    return axiosClient.get(url);
  },
  getLastedOrder: () => {
    const url = '/dashboards/latestorder';
    return axiosClient.get(url);
  },
  getTopProduct: () => {
    const url = '/dashboards/fiveproduct';
    return axiosClient.get(url);
  },
};
export default staticAPI;