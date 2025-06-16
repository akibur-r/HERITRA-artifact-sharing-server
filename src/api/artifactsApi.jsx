import useAxiosSecure from "@/hooks/useAxiosSecure";

const useArtifactsApi = () => {
  const axiosSecure = useAxiosSecure();

  const topSixArtifactsPromise = () => {
    return axiosSecure
      .get(`/artifacts?limit=6&sort_by=likeCount`)
      .then((res) => {
        return res.data
      });
  };

  return {
    topSixArtifactsPromise,
  };
};

export default useArtifactsApi;
