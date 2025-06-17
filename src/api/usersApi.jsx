import useAxiosSecure from "@/hooks/useAxiosSecure";

const useUsersApi = () => {
  const axiosSecure = useAxiosSecure();

  // get apis
  const checkIfLikedPromise = (artifact_id, user_email) => {
    return axiosSecure
      .get(`/users/likes?artifact_id=${artifact_id}&user_email=${user_email}`)
      .then((res) => res.data);
  };

  // post apis
  const addUserPromise = (newUser) => {
    return axiosSecure.post("/users", newUser).then((res) => res.data);
  };

  //   put apis
  const updateLikePromise = (artifact_id, user_email) => {
    return axiosSecure
      .put(`/users/likes?artifact_id=${artifact_id}&user_email=${user_email}`)
      .then((res) => res.data);
  };

  return {
    addUserPromise,
    checkIfLikedPromise,
    updateLikePromise,
  };
};

export default useUsersApi;
