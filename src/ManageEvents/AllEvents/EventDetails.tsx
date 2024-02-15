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
import parse from "html-react-parser";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import logo from "/logo.png";
import { TypeAnimation } from "react-type-animation";

const EventDetails: React.FC = () => {
  // hooks and states
  const { _id, title, duration, desc, eventType, events, camera, mic } = useLoaderData() as EventType;
  const parsedDesc = parse(desc);
  const { userData } = useContext(AuthContext);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const dateCellRender = (value: Dayjs) => {
    const data = events ? events[value.format("DDMMYY")] || [] : [];

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
    <div className="mb-5 select-none">
      <h1 className="flex pl-2 my-5 items-center gap-2 ">
        <img className="w-12" src={logo} alt="logo" />
        <br />{" "}
        <span className="text-[#5E47EF] text-3xl font-bold">
          <TypeAnimation
            preRenderFirstString={false}
            sequence={[`TimeForge`, 500, ""]}
            speed={10}
            repeat={Infinity}
          ></TypeAnimation>{" "}
        </span>
      </h1>
      <div className="max-w-full mx-1 lg:px-2 lg:m-5 flex flex-col md:flex-row gap-5">
        {/* event information */}
        <div className="md:w-2/3 lg:w-1/3 p-6 md:p-2 border border-[#d6d1ff] shadow-md rounded-md lg:relative">
          <div className="px-2">
            <h2 className="text-2xl text-[#7c3aed] font-bold border border-[#d6d1ff] w-full px-3 py-1.5 mt-3 rounded-md">{title}</h2>
            <div className="flex items-center gap-2 text-lg text-gray-600 font-medium mt-5 border border-[#d6d1ff] w-full px-3 py-1.5 rounded-md">
              <FaArchive size={20}></FaArchive>
              <span className="text-gray-500 text-sm">{eventType}</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-gray-600 font-medium mt-5 border border-[#d6d1ff] w-full px-3 py-1.5 rounded-md">
              <FaClock size={20}></FaClock>
              <span className="text-gray-500 text-sm">{duration} minutes</span>
            </div>
            <div className="flex items-center gap-4 mt-5 text-lg font-medium border border-[#d6d1ff] w-full px-3 py-1.5 rounded-md">
              <div className="flex items-center gap-1">
                <FaCamera color="gray" size={20}></FaCamera>
                {camera ? (
                  <FaCheck size={10} color="green"></FaCheck>
                ) : (
                  <FaTimes size={10} color="red"></FaTimes>
                )}
              </div>
              <div className="flex items-center gap-1">
                <FaMicrophone color="gray" size={20}></FaMicrophone>
                {mic ? (
                  <FaCheck size={10} color="green"></FaCheck>
                ) : (
                  <FaTimes size={10} color="red"></FaTimes>
                )}
              </div>
            </div>
            <div className="text-gray-600 mt-5 border border-[#d6d1ff] w-full min-h-80 px-3 py-1.5 rounded-md">{parsedDesc}</div>
          </div>

          {/* author info */}

          <div className="mt-5 lg:absolute lg:bottom-28 lg:left-6">
            <h4 className="font-bold text-sm text-gray-400">Author Info</h4>
            <div className="flex items-center gap-3 mt-5  border border-[#d6d1ff] w-full px-3 py-1.5 rounded-md">
              <img
                className="w-12 rounded-full"
                src={userData?.img_profile}
                alt="author-image"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold text-gray-500">
                  {userData?.name}
                </h2>
                <h3 className="text-xs font-medium text-gray-500">
                  {userData?.email}
                </h3>
              </div>
            </div>
          </div>

          <Link to={`/dashboard/updateEvent/${_id}`}>
            <button className="lg:absolute lg:bottom-4 lg:right-4  flex items-center gap-2 px-4 py-2 mt-5 border border-[#d6d1ff] hover:border-orange-800 text-lg rounded-md text-gray-500 hover:text-orange-800 hover:bg-orange-800/10 hover:transition-all hover:duration-300">
              <FaPencilAlt></FaPencilAlt>
              <p>Update</p>
            </button>
          </Link>
        </div>

        {/* calender area */}
        <div className="sm:w-3/4 p-2 mt-2 md:mt-0 overflow-hidden border border-[#d6d1ff] shadow-md rounded-md">
          <Calendar
            className="min-h-full min-w-full overflow-hidden"
            cellRender={cellRender}
            onPanelChange={onPanelChange} />
        </div>
      </div>

      {/* participants area */}
      <div className="w-dvw sm:w-full mx-2 pr-3">
        <AllParticipants id={_id}></AllParticipants>
      </div>
    </div>
  );
};

export default EventDetails;
