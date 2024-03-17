import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LoginForm from "./components/LoginForm.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SignUp from "./components/SignUp.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "",
        element: <PrivateRoute component={Home} />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },

      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
