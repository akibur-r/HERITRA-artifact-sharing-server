import useAxiosOpen from "@/hooks/useAxiosOpen";

const useAuthUserApi = () => {
  const axiosOpen = useAxiosOpen();

  const addUserPromise = (newUser) => {
    return axiosOpen.post("/users", newUser).then((res) => res.data);
  };

  return { addUserPromise };
};

export default useAuthUserApi;
