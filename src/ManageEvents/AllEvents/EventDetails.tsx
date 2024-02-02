import {
  FaAddressBook,
  FaArchive,
  FaCamera,
  FaCheck,
  FaClock,
  FaGlobeAsia,
  FaMicrophone,
  FaTimes,
} from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { EventType } from "./AllEvents";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import toast from "react-hot-toast";
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd'

const EventDetails: React.FC = () => {
  // hooks and states
  const customAxios = useAxios();
  dayjs.extend(customParseFormat);
  const { _id, title, duration, desc, eventType, events, camera, mic } = useLoaderData() as EventType;
  console.log("events from details page", events);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  // fetching all participants
  const { data: allParticipants = [], refetch } = useQuery({
    queryKey: ["AllParticipants"],
    queryFn: async () => {
      const res = await customAxios.get(`attendee?id=${_id}`);
      return res.data;
    },
  });

  // deleting a participant
  const handleParticipantDelete = (id: string) => {
    console.log("id", id);
    customAxios.delete(`/attendee/${id}`)
      .then((res) => {
        const data = res.data;
        console.log("deleted", data);
        toast.success("Attendee removed");
        refetch();
      });
  };

  return (
    <div className='mb-10'>
      {/* event details */}
      <div className='max-w-[1400px] mx-2 lg:mx-auto shadow-xl shadow-[#ddd7ff] rounded-md mt-5 flex flex-col md:flex-row'>
        {/* author and event information */}
        <div className='sm:w-1/3 px-6 py-4 border-r'>
          {/* <h4 className='text-gray-400 font-medium'>Author Name</h4> */}
          <h2 className='text-3xl font-bold mt-2'>{title}</h2>
          <div className='flex items-center gap-2 text-lg text-gray-600 font-medium mt-3'>
            <FaArchive></FaArchive>
            <h4>
              Event Type : <span className='text-gray-400'>{eventType}</span>
            </h4>
          </div>
          <div className='flex items-center gap-2 text-lg text-gray-600 font-medium mt-3'>
            <FaClock></FaClock>
            <h4>
              Duration : <span className='text-gray-400'>{duration}</span>
            </h4>
          </div>
          <div className='flex items-center gap-4 mt-2 text-lg font-medium'>
            <div className='flex items-center gap-1'>
              <FaCamera color='gray' size={25}></FaCamera>
              {camera ? (
                <FaCheck color='green'></FaCheck>
              ) : (
                <FaTimes color='red'></FaTimes>
              )}
            </div>
            <div className='flex items-center gap-1'>
              <FaMicrophone color='gray' size={25}></FaMicrophone>
              {mic ? (
                <FaCheck color='green'></FaCheck>
              ) : (
                <FaTimes color='red'></FaTimes>
              )}
            </div>
          </div>
          <div className='flex items-center gap-2 text-lg text-gray-600 font-medium mt-3'>
            <FaAddressBook></FaAddressBook>
            <h4>
              Description : <span className='text-gray-400'>{desc}</span>
            </h4>
          </div>
        </div>

        {/* calender area */}
        <div className='sm:w-3/4 px-6 py-4 mt-20 md:mt-0'>
          <div className='h-full md:max-h-[600px]  w-full md:overflow-y-scroll'>
          <Calendar onPanelChange={onPanelChange} />
          </div>
          <div className='mt-20 md:mt-5'>
            <h4 className='font-semibold mt-2'>Time zone</h4>
            <div className='flex items-center gap-2'>
              <FaGlobeAsia></FaGlobeAsia>
              <p>Asia/Dhaka</p>
            </div>
          </div>
        </div>
      </div>

      {/* participants area */}
      <div className='max-w-[1400px] shadow-xl shadow-[#ddd7ff] rounded-md mx-2 lg:mx-auto mt-20 pb-10'>
        <h1 className='text-center bg-gradient-to-r from-green-300 to-[#5038ED] my-5 bg-clip-text text-3xl font-extrabold text-transparent'>
          All Participants
        </h1>
        <div className='overflow-x-auto p-4'>
          {/* table area */}
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            {/* table heading */}
            <thead>
              <tr>
                <th className='text-left px-4 py-2 font-medium text-gray-900'>
                  Index
                </th>
                <th className='text-left px-4 py-2 font-medium text-gray-900'>
                  Name
                </th>
                <th className='text-left px-4 py-2 font-medium text-gray-900'>
                  Email
                </th>
                <th className='text-left px-4 py-2 font-medium text-gray-900'>
                  Date
                </th>
                <th className='text-left px-4 py-2 font-medium text-gray-900'>
                  Time
                </th>
                <th className='text-left px-4 py-2 font-medium text-gray-900'>
                  Manage
                </th>
              </tr>
            </thead>

            {/* table body */}
            <tbody className='divide-y divide-gray-200'>
              {allParticipants?.map((data: EventType, index: number) => {
                const dateStr = Object.keys(data.slot).toString();
                const date = dayjs(dateStr, "DDMMYY");
                const formattedDate = date.format("DD/MM/YYYY");
                return (
                  <tr key={data._id}>
                    <td className='px-4 py-2 font-medium text-gray-900'>
                      {index + 1}
                    </td>
                    <td className='px-4 py-2 font-medium text-gray-900 flex items-center gap-2'>
                      <img
                        className='w-8 rounded-full'
                        src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
                      />
                      {data.name}
                    </td>
                    <td className='px-4 py-2 text-gray-700'>{data.email}</td>
                    <td className='px-4 py-2 text-gray-700'>{formattedDate}</td>
                    <td className='px-4 py-2 text-gray-700'>
                      {data.slot[dateStr][0]}
                    </td>
                    <td className='px-4 py-2'>
                      <button
                        onClick={() => handleParticipantDelete(data._id)}
                        className='rounded bg-gradient-to-r from-[#9181F4] to-[#5038ED] px-4 py-2 text-xs font-medium text-white hover:bg-gradient-to-r hover:from-[#5038ED] hover:to-[#9181F4]'>
                        Delete
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
