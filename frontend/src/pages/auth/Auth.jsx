import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Auth = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    try {
      const result = await axios.post(`${SERVER_URL}/user/register-user`, {
        user: name,
      });
      if (result.data.error) {
        console.log("error while creating user ", result.data.error);
        alert(result.data.error);
        return;
      }
      navigate("/chat", { state: result.data });
    } catch (error) {
      console.log("auth.jsx error : ", error.message);
    }
  };

  const handleLoginClick = async () => {
    try {
      const result = await axios.post(`${SERVER_URL}/user/login-user`, {
        user: name,
      });
      const user = await result.data;
      if (result.data.error) {
        console.log("error while login user ", result.data.error);
        alert(result.data.error);
        return;
      }
      navigate("/chat", { state: user });
    } catch (error) {
      console.log("auth.jsx login error : ", error.message);
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h2 className="heading">
          <img
            className="logo"
            src="https://image.flaticon.com/icons/svg/2950/2950581.svg"
            alt="logo"
          />{" "}
          ChatGram
        </h2>
        <div>
          <input
            placeholder="Name"
            className="joinInput input-box"
            type="text"
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>

        <button
          className="button mt-20"
          type="submit"
          onClick={handleRegisterClick}
        >
          Register
        </button>
        <button
          className="button mt-20"
          type="submit"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
