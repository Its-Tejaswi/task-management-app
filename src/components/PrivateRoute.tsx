import { Navigate } from "react-router-dom";
import React, { JSX } from "react";
const PrivateRoute = ({
  children,
  user,
}: {
  children: JSX.Element;
  user: any;
}) => {
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
