import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const { userLogin, user } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await userLogin(email, password);
      navigate("/Dashboard");
    } catch (e) {
      if (e.message == "Firebase: Error (auth/user-not-found).") {
        alert("No User Found");
      } else if (e.message == "Firebase: Error (auth/wrong-password).") {
        alert("Wrong Password");
      } else {
        alert("Please check your internet connection and try again.");
      }
    }
  };

  if (user) {
    navigate("/dashboard");
  } else {
    return (
      <div className="box">
        <div className="signupContainer">
          <h1>Welcome!</h1>
          <h3>Sign in to Continue</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id=""
              placeholder="Email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name=""
              id=""
              placeholder="Password"
            />

            <button type="submit" className="btn">
              Login
            </button>
          </form>
          <br /> <br />
          <h2>
            <hr />
            OR <hr />
          </h2>
          <br /> <br />
          <h3 className="already">
            Don't have an account?&nbsp;
            <Link to="/signup" className="linkText">
              Signup
            </Link>
          </h3>
        </div>
      </div>
    );
  }
};

export default Login;
