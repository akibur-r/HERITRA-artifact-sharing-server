import useAxiosOpen from "@/hooks/useAxiosOpen";

const useArtifactsOpenApi = () => {
  const axiosOpen = useAxiosOpen();

  const getOneArtifactPromise = (id) => {
    return axiosOpen.get(`/artifacts/findOne/${id}`).then((res) => res.data);
  };

  return { getOneArtifactPromise };
};

export default useArtifactsOpenApi;
