import {
  FaArchive,
  FaCamera,
  FaCheck,
  FaClock,
  FaMicrophone,
  FaPencilAlt,
  FaTimes,
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import { EventType } from "./AllEvents";
import { Dayjs } from "dayjs";
import { Badge, Calendar } from "antd";
import type { CalendarProps } from "antd";
import AllParticipants from "../AllParticipants/AllParticipants";
import parse from 'html-react-parser';
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
// import logo from "/logo.png"

const EventDetails: React.FC = () => {
  // hooks and states
  const { _id, title, duration, desc, eventType, events, camera, mic } = useLoaderData() as EventType;
  const parsedDesc = parse(desc);
  const { userData } = useContext(AuthContext);
  // console.log("user from database", userData);
  // console.log("events from details page", events);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const dateCellRender = (value: any) => {
    // console.log(selectedTimes);
    const data = events
      ? events[value.format("DDMMYY")] || []
      : [];

    return (
      <ul className="events">
        {data?.map((item: any, index: any) => (
          <li key={index}>
            <Badge status="success" text={item} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };


  return (
    <div className="mb-10">
      <div className="max-w-full lg:px-2 lg:m-5 shadow-md rounded-md flex flex-col md:flex-row">

        {/* event information */}
        <div className="md:w-2/3 lg:w-1/3 p-2 border-r lg:relative">
          {/* <div className="flex mb-5 items-center gap-4">
            <img className="h-10" src={logo} alt="logo" />
            <h3 className="text-[#5E47EF] text-4xl font-bold">TimeForge</h3>
          </div> */}
          <div>
            <h2 className="text-2xl text-[#5038ED] font-bold">{title}</h2>
            <div className="flex items-center gap-4 text-lg text-gray-600 font-medium mt-5">
              <FaArchive size={30}></FaArchive>
              <span className="text-gray-500">{eventType}</span>
            </div>
            <div className="flex items-center gap-4 text-lg text-gray-600 font-medium mt-5">
              <FaClock size={30}></FaClock>
              <span className="text-gray-500">{duration}</span>
            </div>
            <div className="flex items-center gap-4 mt-5 text-lg font-medium">
              <div className="flex items-center gap-1">
                <FaCamera color="gray" size={30}></FaCamera>
                {camera ? (
                  <FaCheck size={10} color="green"></FaCheck>
                ) : (
                  <FaTimes size={10} color="red"></FaTimes>
                )}
              </div>
              <div className="flex items-center gap-1">
                <FaMicrophone color="gray" size={30}></FaMicrophone>
                {mic ? (
                  <FaCheck size={10} color="green"></FaCheck>
                ) : (
                  <FaTimes size={10} color="red"></FaTimes>
                )}
              </div>
            </div>
            <div className="text-gray-600 mt-5">
              {parsedDesc}
            </div>
          </div>

          {/* author info */}

          <div className="mt-5 lg:absolute lg:bottom-28 lg:left-6">
            <h4 className="font-bold text-sm text-gray-400">Author Info</h4>
            <div className="flex items-center gap-3 mt-5">
              <img
                className="w-12 rounded-full"
                src={userData?.img_profile}
                alt="author-image" />
              <div className="flex flex-col">
                <h2 className="font-semibold text-gray-500">{userData?.name}</h2>
                <h3 className="text-sm font-medium text-gray-500">{userData?.email}</h3>
              </div>
            </div>
          </div>

          <Link to={`/dashboard/updateEvent/${_id}`}>
            <button
              className='lg:absolute lg:bottom-4 lg:right-4  flex items-center gap-2 px-4 py-2 mt-5 border text-lg rounded-md text-gray-500 hover:text-orange-800 hover:bg-orange-800/10 hover:transition-all hover:duration-300'>
              <FaPencilAlt></FaPencilAlt>
              <p>Update</p>
            </button>
          </Link>
        </div>

        {/* calender area */}
        <div className="sm:w-3/4 p-2 mt-2 md:mt-0">
          <div className="min-h-full min-w-full">
            <Calendar cellRender={cellRender} onPanelChange={onPanelChange} />
          </div>
        </div>
      </div>

      {/* participants area */}
      <AllParticipants id={_id}></AllParticipants>
    </div>
  );
};

export default EventDetails;
