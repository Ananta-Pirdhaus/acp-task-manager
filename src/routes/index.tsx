import { RouteObject, Navigate } from "react-router-dom";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Main from "../pages/Main";
import Project from "../pages/Project";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../helpers/privateRoutes";
import NotificationBoard from "../pages/Notifications";
import Newsletter from "../pages/Admin/Analytics"; // Example admin-only pages
import Workflow from "../pages/Admin/WorkFlow";
import Analytics from "../pages/Admin/Analytics";

const routes = (isAuthenticated: boolean): RouteObject[] => [
  // Protected routes
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
      {
        path: "/boards",
        element: (
          <PrivateRoute
            element={<Boards />}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
      {
        path: "/project",
        element: (
          <PrivateRoute
            element={<Project />}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
      {
        path: "/notifications",
        element: (
          <PrivateRoute
            element={<NotificationBoard />}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
    ],
  },

  // Admin-only protected routes
  {
    path: "/admin",
    element: (
      <PrivateRoute
        element={<Layout />}
        isAuthenticated={isAuthenticated}
        isRole="Administrator"
      />
    ),
    children: [
      {
        path: "newsletter",
        element: (
          <PrivateRoute
            element={<Newsletter />}
            isAuthenticated={isAuthenticated}
            isRole="Administrator"
          />
        ),
      },
      {
        path: "workflow",
        element: (
          <PrivateRoute
            element={<Workflow />}
            isAuthenticated={isAuthenticated}
            isRole="Administrator"
          />
        ),
      },
      {
        path: "analytics",
        element: (
          <PrivateRoute
            element={<Analytics />}
            isAuthenticated={isAuthenticated}
            isRole="Administrator"
          />
        ),
      },
    ],
  },

  // Public routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Redirect for main route
  {
    path: "/main",
    element: <Navigate to="/" />,
  },
];

export default routes;
