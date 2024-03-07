import {
  FaArchive,
  FaCamera,
  FaCheck,
  FaMicrophone,
  FaPencilAlt,
  FaRegTrashAlt,
  FaTimes,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { Badge, Button, Calendar, Empty, Spin } from "antd";
import type { CalendarProps } from "antd";
import AllParticipants from "../AllParticipants/AllParticipants";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import logo from "/logo.png";
import { TypeAnimation } from "react-type-animation";
import ReactQuill from "react-quill";
import { RiTimer2Fill } from "react-icons/ri";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { LoadingOutlined } from "@ant-design/icons";
import { LuCalendarPlus, LuCalendarX } from "react-icons/lu";
import Swal from "sweetalert2";
import useAuthorization from "../../Components/GoogleCalendar/useAuthorization";
import useInsertCalendar from "../../Components/GoogleCalendar/useInsertCalendar";
import { AxiosError } from "axios";
import { handleAxiosError } from "../../Components/ExtraFunc/handelAxiosError";
import { handelAxiosSuccess } from "../../Components/ExtraFunc/handelAxiosSuccess";
import { FaCalendarDays } from "react-icons/fa6";
import customParseFormat from "dayjs/plugin/customParseFormat";
import MeetLink from "../Meet/MeetLink";
dayjs.extend(customParseFormat);
import SingleTimeline from "../../Components/SingleTimeline/SingleTimeline";

const EventDetails: React.FC = () => {
  // hooks and states
  const { userData } = useContext(AuthContext);
  const customAxios = useAxios();
  const { id } = useParams();
  const insertCalendar = useInsertCalendar();
  const authorization = useAuthorization();

  const mutationSingleDelete = useMutation({
    mutationFn: async (googleID: string) => {
      const res = await customAxios.delete(
        `/calevents/${googleID}?userId=${userData._id}&type=single&eventid=${id}`
      );
      return res.data;
    },
    onSuccess: async (data) => {
      handelAxiosSuccess(data);
      await mutaionGoogleCal.mutateAsync();
    },
    onError: (err: AxiosError) => {
      handleAxiosError(err);
    },
  });

  const mutationDeleteCal = useMutation({
    mutationFn: async (id: string) => {
      const result = await customAxios.delete(
        `/calevents/${id}?userId=${userData._id}&type=all`
      );
      return result.data;
    },
    onSuccess: async (data) => {
      handelAxiosSuccess(data);
      await mutaionGoogleCal.mutateAsync();
    },
    onError: (err: AxiosError) => {
      handleAxiosError(err);
    },
  });
  type GoogleEvents = {
    _id: string;
    meetLink: string;
    id: string;
    htmlLink: string;
    schedule: string;
  };
  const mutaionGoogleCal = useMutation({
    mutationFn: async () => {
      const result = await customAxios.get(`/calevents?eventid=${id}`);
      return result.data as { _id: string; googleEvents: GoogleEvents[] };
    },
    onError: (error: AxiosError) => {
      handleAxiosError(error);
    },
  });
  const {
    data: eventDetails,
    isLoading,
    isFetching,
    isPending,
    refetch: eventDetailsRefetch,
  } = useQuery({
    queryKey: ["EventDetails", id],
    queryFn: async () => {
      const res = await customAxios.get(`/meeting?id=${id}&type=single`);
      await mutaionGoogleCal.mutateAsync();
      return res.data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const eventTypes = eventDetails?.eventType;

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const dateCellRender = (value: Dayjs) => {
    const data = eventDetails?.events
      ? eventDetails?.events[value.format("DDMMYY")] || []
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
  if (isLoading || isFetching || isPending) {
    return (
      <div className="flex items-center justify-center fixed left-[45%] top-[50%]">
        <Spin
          indicator={<LoadingOutlined></LoadingOutlined>}
          size="large"
        ></Spin>
      </div>
    );
  }
  function calAuthHandeler(id: string) {
    Swal.fire({
      title: "Google Calendar Integration",
      text: "Do you want to connect with google calendar?",
      icon: "question",
      confirmButtonText: "Yes",
      showDenyButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authorization.mutateAsync(id);
        await insertCalendar.mutateAsync({
          eventId: eventDetails.id,
          userId: userData._id,
        });
        await mutaionGoogleCal.mutateAsync();
      }
    });
  }
  async function insertHandeler() {
    if (userData && !userData.isRefreshToken) {
      calAuthHandeler(userData._id);
    } else {
      await insertCalendar.mutateAsync({
        eventId: eventDetails._id,
        userId: userData._id,
      });
      await mutaionGoogleCal.mutateAsync();
    }
  }
  async function singleDeleteHandeler(id: string, schedule: string) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to Delete google event at ${dayjs(
        schedule,
        "DDMMYY-h:mm A"
      ).format("DD/MM/YYYY hh:mm A")}?`,
      icon: "question",
      confirmButtonText: "Yes",
      showDenyButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutationSingleDelete.mutateAsync(id);
      }
    });
  }
  console.log(eventDetails.offline);
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
      <div className="lg:max-w-full mx-1 my-1 lg:px-2 lg:m-5 flex flex-col md:flex-row gap-2">
        {/* event information */}
        <div className="flex flex-col justify-between w-full xl:w-3/5 min-h-full p-2 lg:p-4 md:p-2 border border-[#d6d1ff] shadow-md rounded-md lg:relative">
          <div className="p-2">
            <h2 className="flex justify-between items-center text-2xl dark:text-dw w-full border border-[#d6d1ff] rounded-md px-3 py-2 text-[#7c3aed] font-bold mt-3">
              {eventDetails?.title}
              {eventDetails?.offline ? (
                <h4 className="text-xs px-2 py-[2px] rounded-md bg-gray-500 text-white">
                  Offline
                </h4>
              ) : (
                <h4 className="text-xs px-2 py-[2px] rounded-md bg-green-500 text-white">
                  Online
                </h4>
              )}
            </h2>

            <div className="flex justify-between border border-[#d6d1ff] rounded-md mt-5 items-center px-3 py-1.5">
              <div className="flex items-center gap-2 text-lg text-gray-600 font-medium rounded-md">
                <FaArchive size={15}></FaArchive>
                <span className="text-gray-500 dark:text-dw text-sm">
                  {eventDetails?.eventType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg text-gray-600 font-medium rounded-md">
                <RiTimer2Fill size={15}></RiTimer2Fill>
                <span className="text-gray-500 dark:text-dw text-sm">
                  {eventDetails?.duration} minutes
                </span>
              </div>

              <div className="flex items-center gap-4 text-lg font-medium">
                <div className="flex items-center gap-1">
                  <FaCamera color="gray" size={15}></FaCamera>
                  {eventDetails?.camera ? (
                    <FaCheck size={10} color="green"></FaCheck>
                  ) : (
                    <FaTimes size={10} color="red"></FaTimes>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <FaMicrophone color="gray" size={15}></FaMicrophone>
                  {eventDetails?.mic ? (
                    <FaCheck size={10} color="green"></FaCheck>
                  ) : (
                    <FaTimes size={10} color="red"></FaTimes>
                  )}
                </div>
              </div>
            </div>

            <div className="text-gray-600 mt-5 border border-[#d6d1ff] lg:w-full min-h-40 max-h-full rounded-md">
              <ReactQuill
                theme="snow"
                value={eventDetails?.desc}
                modules={{ toolbar: false }}
                readOnly
              />
            </div>
            <div className="mt-1">
              <Spin
                spinning={
                  mutaionGoogleCal.isPending ||
                  insertCalendar.isPending ||
                  mutationDeleteCal.isPending
                }
              >
                {mutaionGoogleCal.data ? (
                  <button
                    onClick={async () => {
                      await mutationDeleteCal.mutateAsync(
                        mutaionGoogleCal.data._id
                      );
                    }}
                    className="px-5 py-5 border flex justify-left gap-2 w-full border-[#d6d1ff] hover:border-red-800 text-lg rounded-md text-gray-500 hover:text-red-800 hover:bg-orange-800/10 hover:transition-all hover:duration-300"
                  >
                    <LuCalendarX />{" "}
                    <span className="text-sm">Delete from Google Calendar</span>
                  </button>
                ) : (
                  <button
                    onClick={insertHandeler}
                    className="px-5 py-5 border flex justify-left gap-2 w-full border-[#d6d1ff] hover:border-orange-800 text-lg rounded-md text-gray-500 hover:text-orange-800 hover:bg-orange-800/10 hover:transition-all hover:duration-300"
                  >
                    <LuCalendarPlus />
                    <span className="text-sm">Add To Google Calendar </span>
                  </button>
                )}
              </Spin>
              {id && !eventDetails.offline && eventDetails.meetLink?.url ? (
                <MeetLink eventid={id} meetlink={eventDetails.meetLink} eventDetailsRefetch={eventDetailsRefetch}/>
              ) : (
                !eventDetails.offline && id  && (
                  <MeetLink
                    eventid={id}
                    eventDetailsRefetch={eventDetailsRefetch}
                  />
                )
              )}
            </div>
          </div>

          <div className="flex flex-row items-end gap-2 mx-2 mt-3">
            {/* author info */}
            <div className="w-full">
              <h4 className="font-bold text-sm text-gray-400 ml-1 my-1.5">
                Author Info
              </h4>
              <div className="flex items-center gap-3 border border-[#d6d1ff] px-3 py-1.5 rounded-md">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={eventDetails.createdBy?.img_profile}
                  alt="author-image"
                />
                <div className="flex flex-col truncate">
                  <h2 className="font-semibold dark:text-dw text-gray-600">
                    {eventDetails.createdBy?.name}
                  </h2>
                  <h3 className="text-xs font-medium dark:text-dw text-[#713acf]">
                    {eventDetails.createdBy?.email}
                  </h3>
                </div>
              </div>
            </div>

            <Link to={`/dashboard/updateEvent/${id}`}>
              <button className="w-full px-5 py-5 border border-[#d6d1ff] hover:border-orange-800 text-lg rounded-md text-gray-500 hover:text-orange-800 hover:bg-orange-800/10 hover:transition-all hover:duration-300">
                <FaPencilAlt></FaPencilAlt>
              </button>
            </Link>
          </div>
        </div>

        {/* calender area or timeline area */}
        <div className="w-full p-2 mt-2 md:mt-0 overflow-hidden border border-[#d6d1ff] shadow-md rounded-md">
          {eventTypes === "Group Meeting" || eventTypes === "Board Meeting" ? (
            <SingleTimeline eventId={id}></SingleTimeline>
          ) : (
            <Calendar
              className="min-h-full min-w-full overflow-hidden"
              cellRender={cellRender}
              onPanelChange={onPanelChange}
            />
          )}
        </div>
      </div>

      <div className="w-dvw sm:w-full lg:mx-2 lg:pr-3 pb-16 lg:pb-2 bg-white">
        <div className="max-w-full shadow-md rounded-md mx-1 sm:p-2 my-5 lg:m-5 overflow-hidden border border-[#d6d1ff]">
          <div className="text-[#5038ED] text-xl font-extrabold">
            <div className="flex flex-row items-center justify-center gap-2 mt-5">
              <FaCalendarDays />
              <h1> Google Events</h1>
            </div>
          </div>
          <div className="overflow-x-auto sm:px-8 sm:py-4 pb-5">
            {mutaionGoogleCal.isSuccess ? (
              mutaionGoogleCal.data &&
              mutaionGoogleCal.data.googleEvents.length != 0 ? (
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 font-medium text-gray-900 hidden lg:table-cell">
                        Index
                      </th>
                      <th className="text-left px-4 py-2 font-medium text-gray-900 hidden lg:table-cell">
                        Date
                      </th>
                      <th className="text-left px-4 py-2 font-medium text-gray-900">
                        Time
                      </th>
                      <th className="text-left px-4 py-2 font-medium text-gray-900 hidden md:table-cell">
                        Google Event Link
                      </th>
                      <th className="text-left px-4 py-2 font-medium text-gray-900">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  {mutaionGoogleCal.data.googleEvents.map((x, index) => {
                    return (
                      <tbody className="divide-y divide-gray-200">
                        <tr key={index}>
                          <td className="px-4 py-2 font-medium text-gray-900 hidden lg:table-cell">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 font-medium text-gray-900 hidden lg:table-cell">
                            {dayjs(x.schedule, "DDMMYY-h:mm A").format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td className="px-4 py-2 text-gray-700">
                            {dayjs(x.schedule, "DDMMYY-h:mm A").format(
                              "hh:mm A"
                            )}
                          </td>
                          <td className="px-4 py-2 text-gray-700 hidden md:table-cell">
                            <Button href={x.htmlLink} target="_blank">
                              <FaCalendarDays className="text-center" />
                            </Button>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="p-2 text-lg rounded text-red-500 hover:bg-red-500/10 hover:transition-all hover:duration-300"
                              onClick={async () =>
                                singleDeleteHandeler(x.id, x.schedule)
                              }
                            >
                              <FaRegTrashAlt></FaRegTrashAlt>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              ) : (
                <Empty
                  description="No Google Calendar Found"
                  className="flex flex-col items-center justify-center"
                />
              )
            ) : (
              <Empty
                description="Something Error"
                className="flex flex-col items-center justify-center"
              />
            )}
          </div>
        </div>
      </div>

      {/* participants area */}
      <div className="w-dvw sm:w-full lg:mx-2 lg:pr-3 pb-16 lg:pb-2 bg-white">
        <AllParticipants id={id}></AllParticipants>
      </div>
    </div>
  );
};

export default EventDetails;
