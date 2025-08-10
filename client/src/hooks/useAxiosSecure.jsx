import axios from "axios";
import useAuth from "./useAuth";
import { baseURL } from "@/utils/baseURL";

const useAxiosSecure = () => {
  const { user } = useAuth();

  const axiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.interceptors.request.use((config) => {
    if (user) {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      config.headers.user_email = user.email;
    }
    return config;
  });

  return axiosInstance;
};

export default useAxiosSecure;
