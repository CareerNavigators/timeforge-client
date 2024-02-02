import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import SignUp from "../AuthPage/SignUp";
import Login from "../AuthPage/Login";
import Title from "../Components/Title/Title";
import Dashboard from "../Dashboard/Layout/Dashboard";
import CreateEvents from "../CreateEvents/CreateEvents";
import OneEvent from "../CreateEvents/Events/OneEvent";
import EventSlot from "../Components/EventSlot/EventSlot";
import CalendarPage from "../CreateEvents/Events/CalendarPage";
import AllEvents from "../ManageEvents/AllEvents/AllEvents";
import EventDetails from "../ManageEvents/AllEvents/EventDetails";
import Error from "../Error/Error";
import Pricing from "../Pages/Pricing";
import ContactUs from "../Contacts/ContactUs";
import AboutUs from "../AboutUs/AboutUs"
import About from "../Contacts/About";
import { Profile } from "../Dashboard/Profile/Profile";

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
        element: (
          <CalendarPage
            selectedTimes={{}}
            onSelectTime={function (): void {}}></CalendarPage>
        ),
      },
      {
        path: "/allEvents",
        element: <AllEvents></AllEvents>,
      },
      {
        path: "/eventDetails/:id",
        element: <EventDetails></EventDetails>,
        loader: ({ params }) => fetch(`https://timeforge-server.vercel.app/meeting?id=${params.id}&type=single`)
      },
      {
        path: "/pricing",
        element: <Pricing></Pricing>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/about",
        element: <About></About>,
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
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/eventslot/:id",
    element: <EventSlot></EventSlot>,
    loader: ({ params }) => fetch(`https://timeforge-server.vercel.app/meeting?id=${params.id}&type=single`)
  },
]);
export default router;
