import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosClient = axios.create({
    baseURL: "https://bungou-backend-production.up.railway.app/" ,
    headers: {
        'content-type': 'application/json',
    },
})
// Add a request interceptor

export default axiosClient
