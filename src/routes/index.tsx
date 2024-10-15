import { RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Main from "../pages/Main";

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
    element: <Layout />,
    children: [
      {
        children: [
          {
            path: "",
            element: <Main />,
          },
        ],
      },
    ],
  },
];

export default routes;
