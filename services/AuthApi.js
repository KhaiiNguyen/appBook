import axiosClient from "../api/api";

const authAPI = {
  login: (data) => {
    const url = `/api/v1/user/login`;
    return axiosClient.post(url, data);
  },
  register: (data) => {
    const url = `/api/v1/user/register`;
    return axiosClient.post(url, data);
  },
  info: (token) => {
    console.log("test", token);
    const url = `/api/v1/user/info`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
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

export default authAPI;
