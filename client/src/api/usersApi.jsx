import useAxiosSecure from "@/hooks/useAxiosSecure";

const useUsersApi = () => {
  const axiosSecure = useAxiosSecure();

  // get apis

  const getUserInfoPromise = () => {
    return axiosSecure.get("/users").then((res) => res.data);
  };

  const checkIfLikedPromise = (artifact_id, user_email) => {
    return axiosSecure
      .get(`/users/likes?artifact_id=${artifact_id}&user_email=${user_email}`)
      .then((res) => res.data);
  };

  const getLikedArtifacts = (user_email) => {
    return axiosSecure
      .get(`/users/likes/${user_email}`)
      .then((res) => res.data);
  };

  // post apis

  //   put apis
  const updateUserPromise = (updatedUser) => {
    return axiosSecure.put("/users", updatedUser).then((res) => res.data);
  };

  const updateLikePromise = (artifact_id, user_email) => {
    return axiosSecure
      .put(`/users/likes?artifact_id=${artifact_id}&user_email=${user_email}`)
      .then((res) => res.data);
  };

  // delete apis
  const deleteUserPromise = () => {
    return axiosSecure.delete("/users").then((res) => res.data);
  };

  return {
    getUserInfoPromise,
    checkIfLikedPromise,
    updateUserPromise,
    updateLikePromise,
    getLikedArtifacts,
    deleteUserPromise,
  };
};

export default useUsersApi;
