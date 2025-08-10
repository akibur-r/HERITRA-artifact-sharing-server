import useAxiosOpen from "@/hooks/useAxiosOpen";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const useArtifactsApi = () => {
  const axiosSecure = useAxiosSecure();
  const axiosOpen = useAxiosOpen();

  // get apis

  const getArtifactsCountPromise = (searchQuery = "") => {
    return axiosOpen
      .get(`/artifactsCount?searchQuery=${searchQuery}`)
      .then((res) => res.data);
  };

  const getArtifactsByPagePromise = (
    artifactsPerPage,
    currentPage,
    searchQuery = "",
    sortingValue = "",
    sortingOrder = 1
  ) => {
    return axiosOpen
      .get(
        `/artifacts?limit=${artifactsPerPage}&currentPage=${currentPage}&name=${searchQuery}&sort_by=${sortingValue}&order=${sortingOrder}`
      )
      .then((res) => res.data);
  };

  const topSixArtifactsPromise = () => {
    return axiosOpen.get(`/artifacts?limit=6&sort_by=likeCount&order=-1`).then((res) => {
      return res.data;
    });
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
    getArtifactsCountPromise,
    getArtifactsByPagePromise,
    topSixArtifactsPromise,
    addArtifactPromise,
    getOneArtifactPromise,
    getArtifactsByEmailPromise,
    deleteArtifactPromise,
    updateArtifactPromise,
  };
};

export default useArtifactsApi;
