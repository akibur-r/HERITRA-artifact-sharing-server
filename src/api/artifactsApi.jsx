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

  const getOneArtifactPromise = (id) => {
    return axiosSecure.get(`/artifacts/findOne/${id}`).then((res) => res.data);
  };

  // post apis
  const addArtifactPromise = (newArtifact) => {
    return axiosSecure.post("/artifacts", newArtifact).then((res) => res.data);
  };

  return {
    topSixArtifactsPromise,
    addArtifactPromise,
    getAllArtifactsPromise,
    getOneArtifactPromise,
  };
};

export default useArtifactsApi;
