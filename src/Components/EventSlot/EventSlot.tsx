import {FaAddressBook,FaArchive,FaCamera,FaCheck,FaClock,FaMicrophone,FaTimes} from "react-icons/fa";
import Logo from "/logo.png";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Calendar } from "antd";
import type { CalendarProps } from "antd";
import { useLoaderData } from "react-router-dom";
import { EventType } from "../../ManageEvents/AllEvents/AllEvents";

const EventSlot = () => {
  dayjs.extend(customParseFormat);
  const { title, duration, desc, eventType, camera, mic } = useLoaderData() as EventType;
  
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <>
      <div className="bg-[#5E47EF] pt-24 p-5 lg:p-20 min-h-screen">
        <div className="lg:max-w-6xl bg-white mx-auto rounded-lg shadow-lg p-10 flex gap-10 lg:gap-0 flex-col lg:flex-row items-center lg:items-start justify-between">
          <div className="w-full">
            <div className="flex mb-5 items-center gap-4">
              <img className="h-10" src={Logo} alt="logo" />
              <h3 className="text-[#5E47EF] text-4xl font-bold">TimeForge</h3>
            </div>
            <div className="max-w-[1400px] mx-2 lg:mx-auto  rounded-md mt-5 flex flex-col md:flex-row">
              <div className="sm:w-1/3 px-6 py-4 border-r">
                <h2 className="text-3xl font-bold mt-2">{title}</h2>
                <div className="flex items-center gap-2 text-lg text-gray-600 font-medium mt-3">
                  <FaArchive></FaArchive>
                  <h4>
                    Event Type :{" "}
                    <span className="text-gray-400">{eventType}</span>
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-lg text-gray-600 font-medium mt-3">
                  <FaClock></FaClock>
                  <h4>
                    Duration : <span className="text-gray-400">{duration}</span>
                  </h4>
                </div>
                <div className="flex items-center gap-4 mt-2 text-lg font-medium">
                  <div className="flex items-center gap-1">
                    <FaCamera color="gray" size={25}></FaCamera>
                    {camera ? (
                      <FaCheck color="green"></FaCheck>
                    ) : (
                      <FaTimes color="red"></FaTimes>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMicrophone color="gray" size={25}></FaMicrophone>
                    {mic ? (
                      <FaCheck color="green"></FaCheck>
                    ) : (
                      <FaTimes color="red"></FaTimes>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-lg text-gray-600 font-medium mt-3">
                  <FaAddressBook></FaAddressBook>
                  <h4>
                    Description : <span className="text-gray-400">{desc}</span>
                  </h4>
                </div>
              </div>
              <div className="sm:w-3/4 px-6 py-4 mt-20 md:mt-0">
                <div className="h-full md:max-h-[600px]  w-full md:overflow-y-scroll">
                  <Calendar onPanelChange={onPanelChange} />
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
