import React from "react";
import { UserAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const NavBar = () => {
    return (
      <ul>
        <li>
          <Link to="../">
            <img className="logo" src="./images/mishraa.webp" alt="" />
          </Link>
        </li>
        <li>
          <Link to="./Login" className="menu-item">
            LOGIN
          </Link>
        </li>
        <li>
          <Link to="./Signup" className="menu-item">
            SIGNUP
          </Link>
        </li>
      </ul>
    );
  };

  const NavBarLoggedIn = () => {
    return (
      <ul>
        <li>
          <Link to="./dashboard">
            <img className="logo" src="./images/mishraa.webp" alt="" />
          </Link>
        </li>
        <Link onClick={handleLogout} className="menu-item">
          LOGOUT
        </Link>
      </ul>
    );
  };

  if (user) {
    return (
      <div className="nav">
        <NavBarLoggedIn />
      </div>
    );
  } else {
    return (
      <div className="nav">
        <NavBar />
      </div>
    );
  }
}
