import useAxiosSecure from "@/hooks/useAxiosSecure";

const useNotificationsApi = () => {
  const axiosSecure = useAxiosSecure();

  // get apis
  const getNotifications = () => {
    return axiosSecure.get(`/notifications`).then((res) => res.data);
  };

  return {
    getNotifications,
  };
};

export default useNotificationsApi;
