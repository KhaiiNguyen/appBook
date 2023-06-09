import axiosClient from "../api/api";

const bookApi = {
  getBooks: () => {
    const url = `/api/v1/book/?limit=100`;
    return axiosClient.get(url);
  },

  // updateProfile: (data) => {
  //     const url = `/api/v1/users/me`
  //     return axiosClient.patch(url, data)
  // },
  //
  // getProfile: () => {
  //     const url = `/api/v1/users/me`
  //     return axiosClient.get(url)
  // },
  // getUserProfile: (id) => {
  //     const url = `/api/v1/users/${id}`
  //     return axiosClient.get(url)
  // },
};

export default bookApi;
