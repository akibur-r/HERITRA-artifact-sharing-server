import useAxiosSecure from "@/hooks/useAxiosSecure";

const useArtifactsApi = () => {
  const axiosSecure = useAxiosSecure();

  const topSixArtifactsPromise = () => {
    return axiosSecure
      .get(`/artifacts?limit=6&sort_by=likeCount`)
      .then((res) => {
        return res.data;
      });
  };

  const addArtifactPromise = (newArtifact) => {
    return axiosSecure.post("/artifacts", newArtifact).then((res) => res.data);
  };

  return {
    topSixArtifactsPromise,
    addArtifactPromise,
  };
};

export default useArtifactsApi;
