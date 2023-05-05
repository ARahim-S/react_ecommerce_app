import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage } from "./routes/Routes.js";
import { useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { server } from "./server.js";

const App = () => {
  useEffect(() => {
    axios
      .get(`${server}/user/getuser`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  //3:52 de kaldım

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/activation/:activationToken"
            element={<ActivationPage />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
