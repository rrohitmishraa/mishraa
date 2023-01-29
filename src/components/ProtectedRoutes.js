import React from "react";
import { Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Login from "./Login";

function ProtectedRoutes() {
  const { user } = UserAuth();
  return <div>{user ? <Outlet /> : <Login />}</div>;
}

export default ProtectedRoutes;
