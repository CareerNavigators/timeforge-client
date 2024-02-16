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
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import logo from "/logo.png";
import { TypeAnimation } from "react-type-animation";
import { LoadingOutlined } from "@ant-design/icons";

const EventDetails: React.FC = () => {
  // hooks and states
  const items = useLoaderData() as EventType;
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
        <span className="text-[#7c3aed] text-3xl font-bold">
          <TypeAnimation
            preRenderFirstString={false}
            sequence={[`TimeForge`, 500, ""]}
            speed={10}
            repeat={Infinity}
          ></TypeAnimation>{" "}
        </span>
      </h1>
      <div className="lg:max-w-full mx-1 lg:px-2 lg:m-5 flex flex-col md:flex-row">
        {/* event information */}
        <div className="md:w-2/3 lg:w-1/3 p-6 md:p-2 shadow-md rounded-md lg:relative">
          <div className="p-2">
            <h2 className="text-2xl dark:text-dw w-fit text-[#7c3aed] font-bold mt-3">
              {title}
            </h2>
            <div className="flex justify-between mt-5 items-center px-3">
              <div className="flex items-center gap-2 text-lg text-gray-600 font-medium rounded-md">
                <FaArchive size={15}></FaArchive>
                <span className="text-gray-500 dark:text-dw text-sm">
                  {eventType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg text-gray-600 font-medium rounded-md">
                <FaClock size={15}></FaClock>
                <span className="text-gray-500 dark:text-dw text-sm">
                  Duration: {duration} minutes
                </span>
              </div>

              <div className="flex items-center gap-4 text-lg font-medium">
                <div className="flex items-center gap-1">
                  <FaCamera color="gray" size={15}></FaCamera>
                  {camera ? (
                    <FaCheck size={10} color="green"></FaCheck>
                  ) : (
                    <FaTimes size={10} color="red"></FaTimes>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <FaMicrophone color="gray" size={15}></FaMicrophone>
                  {mic ? (
                    <FaCheck size={10} color="green"></FaCheck>
                  ) : (
                    <FaTimes size={10} color="red"></FaTimes>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="flex items-center gap-4 mt-5 text-lg font-medium w-full px-3 rounded-md">
              <div className="flex items-center gap-1">
                <FaCamera color="gray" size={15}></FaCamera>
                {camera ? (
                  <FaCheck size={10} color="green"></FaCheck>
                ) : (
                  <FaTimes size={10} color="red"></FaTimes>
                )}
              </div>
              <div className="flex items-center gap-1">
                <FaMicrophone color="gray" size={15}></FaMicrophone>
                {mic ? (
                  <FaCheck size={10} color="green"></FaCheck>
                ) : (
                  <FaTimes size={10} color="red"></FaTimes>
                )}
              </div>
            </div>
            <div
              className="text-gray-600 mt-5 border border-[#d6d1ff] w-full min-h-80 px-3 py-1.5 rounded-md">
              <ReactQuill
                theme="snow"
                value={items?.desc}
                modules={{ toolbar: false }}
                readOnly
              />
            </div>
          </div>

          {/* timeline */}
          <section className="dark:text-gray-100">
            <div className="container max-w-5xl lg:py-4 mx-auto">
              <div className="grid lg:gap-16 gap-3 mx-5 sm:grid-cols-12">
                <div className="col-span-12 w-[300px] sm:col-span-3">
                  <div className="text-center sm:text-left lg:mb-14 before:block before:w-14 before:h-2 before:mb-3 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-[#7c3aed]">
                    <h3 className="text-xl font-semibold">Event Timeline</h3>
                  </div>
                </div>
                <div className="relative col-span-12 px-4 sm:col-span-9">
                  <div className="col-span-12 space-y-3 relative px-4 sm:col-span-8 sm:space-y-4 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-dw">
                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-[#7c3aed]">
                      <h3 className="text-lg font-semibold tracki">
                        Chairman will give speech
                      </h3>
                      <p className="text-sm text-gray-400">
                        mdsakibchy071@gmail.com
                      </p>
                      <time className="text-xs tracki uppercase text-[#7c3aed] dark:text-gray-400">
                        10:00AM
                      </time>
                    </div>

                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-[#7c3aed]">
                      <h3 className="text-lg font-semibold tracki">
                        Chairman will give speech
                      </h3>
                      <p className="text-sm text-gray-400">
                        mdsakibchy071@gmail.com
                      </p>
                      <time className="text-xs tracki uppercase text-[#7c3aed] dark:text-gray-400">
                        10:00AM
                      </time>
                    </div>

                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-[#7c3aed]">
                      <h3 className="text-lg font-semibold tracki">
                        Chairman will give speech
                      </h3>
                      <p className="text-sm text-gray-400">
                        mdsakibchy071@gmail.com
                      </p>
                      <time className="text-xs tracki uppercase text-[#7c3aed] dark:text-gray-400">
                        10:00AM
                      </time>
                    </div>

                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-[#7c3aed]">
                      <h3 className="text-lg font-semibold tracki">
                        Chairman will give speech
                      </h3>
                      <p className="text-sm text-gray-400">
                        mdsakibchy071@gmail.com
                      </p>
                      <time className="text-xs tracki uppercase text-[#7c3aed] dark:text-gray-400">
                        10:00AM
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* author info */}

          <div className="mt-5 lg:absolute lg:bottom-28 lg:left-6">
            <h4 className="font-bold text-sm text-gray-400">Author Info</h4>
            <div className="flex items-center gap-3 mt-2 border border-[#d6d1ff] w-full px-3 py-1.5 rounded-md">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={userData?.img_profile}
                alt="author-image"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold dark:text-dw text-[#7c3aed]">
                  {userData?.name}
                </h2>
                <h3 className="text-xs font-medium dark:text-dw text-[#713acf]">
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
            onPanelChange={onPanelChange}
          />
        </div>
      </div>

      {/* participants area */}
      <div className="w-dvw sm:w-full mx-2 pr-3 bg-white">
        <AllParticipants id={_id}></AllParticipants>
      </div>
    </div>
  );
};

export default EventDetails;
