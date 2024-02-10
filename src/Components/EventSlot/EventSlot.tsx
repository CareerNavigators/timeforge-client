import {
  FaArchive,
  FaCamera,
  FaCheck,
  FaClock,
  FaMicrophone,
  FaTimes,
} from "react-icons/fa";
import Logo from "/logo.png";
import parse from "html-react-parser";
import { Badge, Calendar } from "antd";
import type { CalendarProps } from "antd";
import { useLoaderData } from "react-router-dom";
import { EventType } from "../../ManageEvents/AllEvents/AllEvents";
import { Dayjs } from "dayjs";

const EventSlot = () => {
  // hooks and states
  const { title, duration, desc, eventType, events, camera, mic } =
    useLoaderData() as EventType;
  const parsedDesc = parse(desc);

  // console.log("user from database", userData);
  // console.log("events from details page", events);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const dateCellRender = (value: any) => {
    // console.log(selectedTimes);
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
    <>
      <div className="bg-gradient-to-r from-[#9181F4] to-[#5038ED] pt-24 p-5 lg:p-20 min-h-screen">
        <div className="lg:max-w-6xl bg-white mx-auto rounded-lg shadow-lg p-10 flex gap-10 lg:gap-0 flex-col lg:flex-row items-center lg:items-start justify-between">
          <div className="w-full">
            <div className="flex mb-5 items-center gap-4">
              <img className="h-10" src={Logo} alt="logo" />
              <h3 className="text-[#5E47EF] text-4xl font-bold">TimeForge</h3>
            </div>
            <div className="max-w-[1400px] mx-2 lg:mx-auto  rounded-md mt-5 flex flex-col md:flex-row">
            <div className="md:w-2/3 lg:w-1/3 p-2 border-r lg:relative">
          <div>
            <h2 className="text-2xl text-[#7c3aed] font-bold">{title}</h2>
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
            <div className="text-gray-600 mt-5">{parsedDesc}</div>
          </div>

          
        </div>
              {/* calender area */}
              <div className="sm:w-3/4 p-2 mt-2 md:mt-0">
                <div className="min-h-full min-w-full">
                  <Calendar
                    cellRender={cellRender}
                    onPanelChange={onPanelChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventSlot;
