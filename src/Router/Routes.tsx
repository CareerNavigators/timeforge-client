import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";

import SignUp from "../AuthPage/SignUp";
import Login from "../AuthPage/Login";
import Title from "../Components/Title/Title";
import Dashboard from "../Dashboard/Layout/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [{
      path:"/dashboard",
      element:<Title>TIME FORGE</Title>
    }],
  },
]);
export default router;
