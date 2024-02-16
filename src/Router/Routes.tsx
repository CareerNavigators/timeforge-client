import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import SignUp from "../AuthPage/SignUp";
import Login from "../AuthPage/Login";
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
import AboutUs from "../AboutUs/AboutUs";
import About from "../Contacts/About";
import { Profile } from "../Dashboard/Profile/Profile";
// import TextNote from "../Dashboard/Page/TextNote";
import UpdateEvent from "../UpdateEvent/UpdateEvent";
import Note from "../Dashboard/Page/Note";
// import AllUser from "../Components/AllUser/AllUser";
import NewAttendee from "../Components/EventSlot/NewAttendee";
import AllUser2 from "../Dashboard/Admin/AllUser/AllUser2";
import AllMeetings from "../Dashboard/Admin/AllMeetings/AllMeetings";
import AllAttendess from "../Dashboard/Admin/AllAttendees/AllAttendess";
import Note2 from "../Dashboard/Note/Note2";

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
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/createEvent",
        element: <CreateEvents></CreateEvents>,
      },
      {
        path: "/dashboard/userEvent",
        element: <AllEvents></AllEvents>,
      },
      {
        path: "dashboard/eventDetails/:id",
        element: <EventDetails></EventDetails>,
        loader: ({ params }) =>
          fetch(
            `https://timeforge-server.vercel.app/meeting?id=${params.id}&type=single`
          ),
      },
      {
        path: "dashboard/updateEvent/:id",
        element: <UpdateEvent></UpdateEvent>,
        loader: ({ params }) =>
          fetch(
            `https://timeforge-server.vercel.app/meeting?id=${params.id}&type=single`
          ),
      },
      {
        path: "/dashboard/textNote",
        element: <Note2></Note2>,
      },
      {
        path: "/dashboard/note",
        element: <Note></Note>
      },
      {
        path:"/dashboard/alluser",
        element:<AllUser2></AllUser2>
      },
      {
        path:"/dashboard/allevents",
        element:<AllMeetings></AllMeetings>
      },
      {
        path:"/dashboard/allateendee",
        element:<AllAttendess />
      }
    ],
  },
  {
    path: "/eventSlot/:id",
    element: <EventSlot></EventSlot>,
    loader: ({ params }) =>
      fetch(
        `https://timeforge-server.vercel.app/meeting?id=${params.id}&type=single`
      ),
  },
  {
    path: "/eventSlot/:id/newAttendee/",
    element: <NewAttendee></NewAttendee>,
    loader: ({ params }) =>
      fetch(
        `https://timeforge-server.vercel.app/meeting?id=${params.id}&type=single`
      ),
  },
  
]);
export default router;
