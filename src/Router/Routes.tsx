import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import SignUp from "../AuthPage/SignUp";
import Login from "../AuthPage/Login";
import Title from "../Components/Title/Title";
import Dashboard from "../Dashboard/Layout/Dashboard";
import CreateEvents from "../CreateEvents/CreateEvents";
import OneEvent from "../CreateEvents/Events/OneEvent";
import UserProfile from "../Components/UserProfile/UserProfile";
import EventSlot from "../Components/EventSlot/EventSlot";
import CalendarPage from "../CreateEvents/Events/CalendarPage";
import AllEvents from "../ManageEvents/AllEvents/AllEvents";
import EventDetails from "../ManageEvents/AllEvents/EventDetails";
import Error from "../Error/Error";
import ContactUs from "../Contacts/ContactUs";
import AboutUs from "../AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/createEvent",
        element: <CreateEvents></CreateEvents>,
      },
      {
        path: "/createEvent/oneEvent",
        element: <OneEvent></OneEvent>,
      },
      {
        path: "/calendarPage",
        element: <CalendarPage></CalendarPage>,
      },
      {
        path: "/allEvents",
        element: <AllEvents></AllEvents>,
      },
      {
        path: "/eventDetails",
        element: <EventDetails></EventDetails>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
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
    path: "profile",
    element: <UserProfile />,
  },
  {
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <Title>TIME FORGE</Title>,
      },
      {
        path: "/dashboard/createEvent",
        element: <CreateEvents></CreateEvents>,
      },
      {
        path: "/dashboard/allEvents",
        element: <AllEvents></AllEvents>,
      },
    ],
  },
  {
    path: "/eventslot",
    element: <EventSlot></EventSlot>,
  },
]);
export default router;
