import axios from 'axios';

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization =
        `Bearer ${localStorage.getItem("token")}`;

    return config;
});