import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Signup from "../components/Signup/Signup";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isError, isAuthenticated, message, navigate, dispatch]);
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignupPage;
