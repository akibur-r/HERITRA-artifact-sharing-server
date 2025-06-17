import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_baseURL || 'https://heritra-server.vercel.app'
})

const useAxiosSecure = () => {
    
    return axiosInstance;
};

export default useAxiosSecure;