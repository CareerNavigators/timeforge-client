import {
  FaArchive,
  FaCamera,
  FaCheck,
  FaClipboardList,
  FaClock,
  FaMicrophone,
  FaRegTrashAlt,
  FaTimes,
} from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { EventType } from "./AllEvents";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Badge, Calendar, Spin } from "antd";
import type { CalendarProps } from "antd";
import showToast from "../../Hook/swalToast";
import { LoadingOutlined } from "@ant-design/icons";

const EventDetails: React.FC = () => {
  // hooks and states
  const customAxios = useAxios();
  dayjs.extend(customParseFormat);
  const { _id, title, duration, desc, eventType, events, camera, mic } =
    useLoaderData() as EventType;
  console.log("events from details page", events);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  // fetching all participants
  const { data: allParticipants = [], isLoading, refetch } = useQuery({
    queryKey: ["AllParticipants"],
    queryFn: async () => {
      const res = await customAxios.get(`attendee?id=${_id}`);
      return res.data;
    },
  });

  // deleting a participant
  const handleParticipantDelete = (id: string) => {
    console.log("id", id);
    customAxios.delete(`/attendee/${id}`).then((res) => {
      const data = res.data;
      console.log("deleted", data);
      showToast("success", "Attendee removed");
      refetch();
    });
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

  // show this loader if data is loading
  if (isLoading) {
    return <div className="flex items-center justify-center my-[20%]">
      <Spin fullscreen indicator={<LoadingOutlined></LoadingOutlined>} size="large"></Spin>;
    </div>
  }

  return (
    <div className="mb-10">
      {/* event details */}
      <div className="max-w-[1800px] p-4 lg:mx-auto shadow-lg rounded-md mt-5 flex flex-col md:flex-row">
        {/* author and event information */}
        <div className="sm:w-1/3 px-6 py-4 border-r">
          <h2 className="text-4xl text-[#9181F4] font-bold mt-2">{title}</h2>
          <div className="flex items-center gap-4 text-lg text-gray-600 font-medium mt-5">
            <FaArchive size={30}></FaArchive>
            <span className="text-gray-400">{eventType}</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-600 font-medium mt-5">
            <FaClock size={30}></FaClock>
            <span className="text-gray-400">{duration}</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-600 font-medium mt-5">
            <FaClipboardList size={30}></FaClipboardList>
            <span className="text-gray-400">{desc}</span>
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
        </div>

        {/* calender area */}
        <div className="sm:w-3/4 px-6 py-4 mt-20 md:mt-0">
          <div className="h-full w-full">
            <Calendar cellRender={cellRender} onPanelChange={onPanelChange} />
          </div>
        </div>
      </div>

      {/* participants area */}
      <div className="max-w-[1800px] shadow-lg rounded-md p-4 lg:mx-auto mt-20 pb-10">
        <h1 className="text-center text-[#5038ED] my-5 text-3xl font-extrabold">
          All Participants
        </h1>
        <div className="overflow-x-auto p-4">
          {/* table area */}
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            {/* table heading */}
            <thead>
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-900">
                  Index
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-900">
                  Email
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-900">
                  Date
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-900">
                  Time
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-900">
                  Remove
                </th>
              </tr>
            </thead>

            {/* table body */}
            <tbody className="divide-y divide-gray-200">
              {allParticipants?.map((data: EventType, index: number) => {
                const dateStr = Object.keys(data.slot).toString();
                const date = dayjs(dateStr, "DDMMYY");
                const formattedDate = date.format("DD/MM/YYYY");
                return (
                  <tr key={data._id}>
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900">{data.name}</td>
                    <td className="px-4 py-2 text-gray-700">{data.email}</td>
                    <td className="px-4 py-2 text-gray-700">{formattedDate}</td>
                    <td className="px-4 py-2 text-gray-700">
                      {data.slot[dateStr][0]}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleParticipantDelete(data._id)}
                        className="p-2 text-lg rounded text-red-500 hover:bg-red-500/10 hover:transition-all hover:duration-300"
                      >
                        <FaRegTrashAlt></FaRegTrashAlt>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
