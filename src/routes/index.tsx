import { RouteObject, Navigate } from "react-router-dom";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Main from "../pages/Main";
import Project from "../pages/Project";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../helpers/privateRoutes";
import NotificationBoard from "../pages/Notifications";

const routes = (isAuthenticated: boolean): RouteObject[] => [
  {
    path: "/boards",
    element: (
      <PrivateRoute element={<Layout />} isAuthenticated={isAuthenticated} />
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute
            element={<Boards />}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
    ],
  },
  {
    path: "/main",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute element={<Layout />} isAuthenticated={isAuthenticated} />
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute element={<Main />} isAuthenticated={isAuthenticated} />
        ),
      },
    ],
  },
  {
    path: "/project",
    element: (
      <PrivateRoute element={<Layout />} isAuthenticated={isAuthenticated} />
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute
            element={<Project />}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
    ],
  },
  {
    path: "/notifications",
    element: (
      <PrivateRoute element={<Layout />} isAuthenticated={isAuthenticated} />
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute
            element={<NotificationBoard />}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default routes;
