import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosClient = axios.create({
    baseURL: "http://localhost:3000" ,
    headers: {
        'content-type': 'application/json',
    },
})
// Add a request interceptor

export default axiosClient
