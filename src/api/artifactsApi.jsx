import useAxiosSecure from "@/hooks/useAxiosSecure";

const useArtifactsApi = () => {
  const axiosSecure = useAxiosSecure();

  // get apis
  const topSixArtifactsPromise = () => {
    return axiosSecure
      .get(`/artifacts?limit=6&sort_by=likeCount`)
      .then((res) => {
        return res.data;
      });
  };

  const getAllArtifactsPromise = () => {
    return axiosSecure.get("/artifacts").then((res) => res.data);
  };

  const getArtifactsBySearchPromise = (query) => {
    return axiosSecure.get(`/artifacts?name=${query}`).then((res) => res.data);
  };

  const getArtifactsByEmailPromise = (user_email) => {
    return axiosSecure
      .get(`/artifacts?user_email=${user_email}`)
      .then((res) => res.data);
  };

  const getOneArtifactPromise = (id) => {
    return axiosSecure.get(`/artifacts/findOne/${id}`).then((res) => res.data);
  };

  // post apis
  const addArtifactPromise = (newArtifact) => {
    return axiosSecure.post("/artifacts", newArtifact).then((res) => res.data);
  };

  // put apis
  const updateArtifactPromise = (id, updatedArtifact) => {
    return axiosSecure
      .put(`/artifacts/${id}`, updatedArtifact)
      .then((res) => res.data);
  };

  // delete apis
  const deleteArtifactPromise = (id) => {
    return axiosSecure.delete(`/artifacts/${id}`).then((res) => res.data);
  };

  return {
    topSixArtifactsPromise,
    addArtifactPromise,
    getAllArtifactsPromise,
    getOneArtifactPromise,
    getArtifactsByEmailPromise,
    deleteArtifactPromise,
    updateArtifactPromise,
    getArtifactsBySearchPromise
  };
};

export default useArtifactsApi;
