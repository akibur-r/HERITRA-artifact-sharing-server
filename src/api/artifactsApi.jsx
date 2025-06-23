import useAxiosOpen from "@/hooks/useAxiosOpen";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const useArtifactsApi = () => {
  const axiosSecure = useAxiosSecure();
  const axiosOpen = useAxiosOpen();

  // get apis

  const getArtifactsCountPromise = (searchQuery = "") => {
    return axiosOpen.get(`/artifactsCount?searchQuery=${searchQuery}`).then((res) => res.data);
  };

  const getArtifactsByPagePromise = (artifactsPerPage, currentPage, searchQuery="") => {
    return axiosOpen
      .get(`/artifacts?limit=${artifactsPerPage}&currentPage=${currentPage}&name=${searchQuery}`)
      .then((res) => res.data);
  };

  const topSixArtifactsPromise = () => {
    return axiosOpen.get(`/artifacts?limit=6&sort_by=likeCount`).then((res) => {
      return res.data;
    });
  };

  const getAllArtifactsPromise = () => {
    return axiosOpen.get("/artifacts").then((res) => res.data);
  };

  const getArtifactsBySearchPromise = (query) => {
    return axiosOpen.get(`/artifacts?name=${query}`).then((res) => res.data);
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
    getAllArtifactsPromise,
    getOneArtifactPromise,
    getArtifactsByEmailPromise,
    deleteArtifactPromise,
    updateArtifactPromise,
    getArtifactsBySearchPromise,
  };
};

export default useArtifactsApi;
