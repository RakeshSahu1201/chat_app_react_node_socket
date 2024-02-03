import React, { createContext, useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Context = createContext();

export default function (props) {
  // server url
  const url = "http://localhost:5000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(Context);

  const navigate = useNavigate();

  const loginHandler = async () => {
    const login = {
      password,
      email,
    };

    context.socket.emit("create_user", { login });
    localStorage.setItem("user", JSON.stringify(login));
    navigate("/chat");
    context.socket.emit("get_users");
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet? <span className="link-primary">Sign Up</span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={loginHandler}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
