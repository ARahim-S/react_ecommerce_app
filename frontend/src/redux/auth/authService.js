import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

//Register User
const register = async (newForm, config) => {
  const response = await axios.post(
    `${server}/user/create-user`,
    newForm,
    config
  );

  return response.data;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(`${server}/user/login-user`, userData, {
    withCredentials: true,
  });

  return response.data;
};

//Load User
const loadCurrentUser = async () => {
  const response = await axios.get(`${server}/user/getuser`, {
    withCredentials: true,
  });
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

//Logout User
// const logout = () => {
//   localStorage.removeItem("user");
// };

const authService = {
  register,
  login,
  loadCurrentUser,
  // logout,
};

export default authService;
