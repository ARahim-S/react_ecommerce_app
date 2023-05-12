import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

//Register User
const register = async (newForm, config) => {
  await axios
    .post(`${server}/user/create-user`, newForm, config)
    .then((res) => toast.success(res.data.message))
    .catch((error) => {
      console.log(error);
      return error.response.data.message;
    });
};

//Login User
const login = async (userData) => {
  await axios
    .post(`${server}/user/login-user`, userData, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data.user;
    })
    .catch((err) => {
      return err.response.data.message;
    });
};

//Load User
const loadCurrentUser = async () => {
  const { data } = await axios.get(`${server}/user/getuser`, {
    withCredentials: true,
  });
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
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
