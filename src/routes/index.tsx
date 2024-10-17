import { RouteObject, Navigate } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Main from "../pages/Main";
import Project from "../pages/Project";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const routes: RouteObject[] = [
  {
    path: "/boards",
    element: <Layout />,
    children: [
      {
        children: [
          {
            path: "",
            element: <Boards />,
          },
        ],
      },
    ],
  },
  {
    path: "/main",
    element: <Navigate to="/" />, // Redirect /main to /
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        children: [
          {
            path: "",
            element: <Main />, // Main component now accessible from "/"
          },
        ],
      },
    ],
  },
  {
    path: "/project",
    element: <Layout />,
    children: [
      {
        children: [
          {
            path: "",
            element: <Project />,
          },
        ],
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
