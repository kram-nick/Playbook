import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface IProtectedRouteProps {
  path?: string;
  element?: React.ReactElement;
}

const NotAuthGuard: FC<IProtectedRouteProps> = (props) => {
  const location = useLocation();

  const hasToken = !!localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);

  const isUserAuthorized = hasToken ? true : false;

  if (isUserAuthorized) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
};
export default NotAuthGuard;
