import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { baseURL } from "@/utils/baseURL";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${user.accessToken}`;
        return config;
      });
    }
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;
