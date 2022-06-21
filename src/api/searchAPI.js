import axiosClient from './axiosClient';
const searchAPI = {
  getSearch: (params) => {
    const url = '/search';
    return axiosClient.get(url, { params });
  },
  getSearchByWord: (params) => {
    const url = '/products/search/match';
    return axiosClient.get(url, { params });
  },
  getTopTrending: () => {
    const url = '/statistics/googleAnalytics';
    return axiosClient.get(url);
  },
};
export default searchAPI;
