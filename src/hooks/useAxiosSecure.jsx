import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // || 'https://heritra-server.vercel.app'
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
