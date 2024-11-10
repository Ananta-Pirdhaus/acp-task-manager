import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
  isRole?: String;
}

const PrivateRoute = ({
  element,
  isAuthenticated,
  isRole,
}: PrivateRouteProps) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  isAuthenticated = user !== null;
  const hasRequiredRole = isRole ? user?.role === isRole : true;
  return isAuthenticated && hasRequiredRole ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
