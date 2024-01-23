import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";

import SignUp from "../AuthPage/SignUp";
import Login from "../AuthPage/Login";
import EventSlot from "../Components/EventSlot/EventSlot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/eventslot",
        element: <EventSlot></EventSlot>,
      }
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
]);
export default router;
