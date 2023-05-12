import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Signup from "../components/Signup/Signup";
import { reset } from "../redux/auth/authSlice";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message, isAuthenticated, isSuccess } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user || isAuthenticated) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, isAuthenticated, message, navigate, dispatch]);
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignupPage;
