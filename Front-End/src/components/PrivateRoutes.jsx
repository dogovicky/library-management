import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
