import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogInMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const [logIn, { isLoading, isSuccess, isUninitialized }] = useLogInMutation();

  const navigate = useNavigate();

  const handleBtn = async (e) => {
    e.preventDefault();
    await logIn({ username, password });
  };

  useEffect(() => {
    if (!isUninitialized && !isLoading) {
      if (isSuccess) {
        navigate("/");
      } else {
        setShowFeedback(true);
      }
    }
  }, [isSuccess, isLoading, isUninitialized, navigate]);

  return (
    <div className="form-section mw-100 min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="form-section-center">
        <h1 className="mb-4 text-start fw-bold">Log In</h1>
        <form>
          <div className="form-item mb-3">
            <label htmlFor="username " className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
            />
          </div>
          <div className="form-item mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {showFeedback && (
            <p className="text-danger mb-4" style={{ fontSize: "0.9rem" }}>
              The username or the password is incorrect
            </p>
          )}
          <button className="btn btn-dark mb-2" onClick={handleBtn}>
            Log In
          </button>
          <p className="form-text">
            Don't have an account yet <Link to={"/register"}>click here.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;