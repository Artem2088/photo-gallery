import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import client from "./apolo/client";
import "./index.css";
import {
  App,
  ListsEagle,
  ListsLions,
  ListsBears,
  Admin,
} from "../src/components/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/eagles",
    element: <ListsEagle />,
  },
  {
    path: "/lions",
    element: <ListsLions />,
  },
  {
    path: "/bears",
    element: <ListsBears />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/eagles",
    element: <ListsEagle />,
  },
  {
    path: "/admin/lions",
    element: <ListsLions />,
  },
  {
    path: "/admin/bears",
    element: <ListsBears />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
