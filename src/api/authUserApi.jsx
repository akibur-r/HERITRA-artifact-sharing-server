import axios from "axios";

const authUserApi = () => {
  const addUserPromise = (newUser) => {
    return axios
      .post("http://localhost:3000/users", newUser)
      .then((res) => res.data);
  };

  return { addUserPromise };
};

export default authUserApi;
