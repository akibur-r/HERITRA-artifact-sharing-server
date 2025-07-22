import useAxiosSecure from "@/hooks/useAxiosSecure";

const useCommentsApi = () => {
  const axiosSecure = useAxiosSecure();

  // get apis
  const getComments = (artifactId) => {
    return axiosSecure
      .get(`/comments?artifactId=${artifactId}`)
      .then((res) => res.data);
  };

  // post apis
  const addNewComment = (newComment) => {
    return axiosSecure.post("/comments", newComment).then((res) => res.data);
  };

  return {
    getComments,
    addNewComment,
  };
};

export default useCommentsApi;
