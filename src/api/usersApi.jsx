import useAxiosSecure from "@/hooks/useAxiosSecure";

const useUsersApi = () => {
  const axiosSecure = useAxiosSecure();

  // get apis
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
  const updateLikePromise = (artifact_id, user_email) => {
    return axiosSecure
      .put(`/users/likes?artifact_id=${artifact_id}&user_email=${user_email}`)
      .then((res) => res.data);
  };

  return {
    checkIfLikedPromise,
    updateLikePromise,
    getLikedArtifacts,
  };
};

export default useUsersApi;
