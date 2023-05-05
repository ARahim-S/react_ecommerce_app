import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { toast } from "react-toastify";
const ActivationPage = () => {
  const [error, setError] = useState(false);
  const { activationToken } = useParams();

  useEffect(() => {
    if (activationToken) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activationToken,
          })
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activationToken]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;

//3:24 te kaldık