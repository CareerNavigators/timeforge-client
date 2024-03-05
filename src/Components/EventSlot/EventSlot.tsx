/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FaArchive,
  FaCamera,
  FaCheck,
  FaMicrophone,
  FaTimes,
} from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { EventType } from "../../ManageEvents/AllEvents/AllEvents";
import { Dayjs } from "dayjs";
import { Badge, Button, Calendar, Modal, Select, Spin } from "antd";
import type { CalendarProps } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import logo from "/logo.png";
import { TypeAnimation } from "react-type-animation";
import ReactQuill from "react-quill";
import { RiTimer2Fill } from "react-icons/ri";
import { SelectInfo } from "rc-menu/lib/interface";
import Input from "rc-input";
import showToast from "../../Hook/swalToast";
import { useMutation } from "@tanstack/react-query";
import AxiosSecure from "../../Hook/useAxios";
import { useNavigate } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import ConfirmationEmail from "./ConfirmationEmail";

const EventDetails: React.FC = () => {
  // hooks and states
  const { title, duration, desc, eventType, events, camera, mic, _id, offline } =
    useLoaderData() as EventType;
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [slot, setSlot] = useState<string>();
  const caxios = AxiosSecure();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
  const onSelect = (value: Dayjs, selectInfo: SelectInfo) => {
    const data = events[value.format("DDMMYY")] || [];
    if (data.length != 0) {
      setSelectedDate(value.format("DDMMYY"));
      console.log(value);
      console.log(selectInfo);
      console.log(
        events[value.format("DDMMYY")].map((x: string) => ({
          value: x,
          label: x,
        }))
      );

      showModal();
    } else {
      showToast("error", "No Schedule Time Found");
    }
  };

  const addAttendee = useMutation({
    mutationFn: async (data: { [key: string]: any }) => {
      const res = await caxios.post("/attendee", data);
      const confirmationEmail = (
        <ConfirmationEmail
          eventId={_id}
          eventName={title}
          eventDate={selectedDate}
          eventTime={slot}
          eventDesc={desc}
          attendeeEmail={data.email}
          htmlLink={res.data?.htmlLink}
        />
      );
      const htmlContent = renderToStaticMarkup(confirmationEmail);
      const sendMailData = {
        attendeeEmail: data.email,
        subject: `${title} Event Reservation Confirmation`,
        html: htmlContent,
      };

      try {
        await caxios.post("/sendmail", sendMailData);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }

      return res.data;
    },
    onSuccess: (data) => {
      handleCancel();
      showToast("success", "Your Reservation is done.");
      if (selectedDate && slot) {
        navigate(`/eventSlot/attendee/${_id}`);
      } else {
        console.error("Selected date & Slot is undefined");
      }
    },
  });


  async function UpdateEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedDate) {
      const formData = new FormData(e.currentTarget);
      const formObject: { [key: string]: any } = Object(
        Object.fromEntries(formData)
      );
      const t: { [key: string]: any } = {};
      t[selectedDate] = [slot];
      formObject["slot"] = t;
      formObject["event"] = _id;
      addAttendee.mutateAsync(formObject);
    }
  }
  function handelSelect(value: string) {
    console.log(value);
    setSlot(value);
  }
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
        <div className="flex flex-col justify-between w-full xl:w-2/5 min-h-full p-2 lg:p-4 md:p-2 border border-[#d6d1ff] shadow-md rounded-md lg:relative">
          <div className="p-2">
            <h2 className="flex justify-between items-center text-2xl dark:text-dw w-full border border-[#d6d1ff] rounded-md px-3 py-2 text-[#7c3aed] font-bold mt-3">
              {title}
              {
                offline ? <h4 className="text-xs px-2 py-[2px] rounded-md bg-gray-500 text-white">
                  Offline
                </h4> : <h4 className="text-xs px-2 py-[2px] rounded-md bg-green-500 text-white">
                  Online
                </h4>
              }
            </h2>
            <div className="flex justify-between border border-[#d6d1ff] rounded-md mt-5 items-center px-3 py-1.5">
              <div className="flex items-center gap-2 text-lg text-gray-600 font-medium rounded-md">
                <FaArchive size={15}></FaArchive>
                <span className="text-gray-500 dark:text-dw text-sm">
                  {eventType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg text-gray-600 font-medium rounded-md">
                <RiTimer2Fill size={15}></RiTimer2Fill>
                <span className="text-gray-500 dark:text-dw text-sm">
                  {duration} minutes
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

            <div className="text-gray-600 mt-5 border border-[#d6d1ff] lg:w-full min-h-40 rounded-md">
              <ReactQuill
                theme="snow"
                value={desc}
                modules={{ toolbar: false }}
                readOnly
              />
            </div>
          </div>

          {/* timeline */}
          {/* <div className="dark:text-gray-100 border border-[#d6d1ff] rounded-md mx-2 mt-3">
            <div className="container max-w-5xl lg:py-4 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 lg:gap-16 gap-3 mx-5">
                <div className="col-span-12 w-[300px] sm:col-span-3">
                  <div className="text-center sm:text-left lg:mb-14 before:block before:w-14 before:h-2 before:mb-3 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-[#7c3aed]">
                    <h3 className="text-xl font-semibold">Event Timeline</h3>
                  </div>
                </div>
                <div className="relative col-span-12 px-4 sm:col-span-9">
                  <div className="col-span-12 space-y-3 relative px-4 sm:col-span-8 sm:space-y-4 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-dw">
                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-[#7c3aed]">
                      <h3 className="text-lg font-semibold">
                        Chairman will give speech
                      </h3>
                      <p className="text-sm text-gray-400">
                        mdsakibchy071@gmail.com
                      </p>
                      <time className="text-xs uppercase text-[#7c3aed] dark:text-gray-400">
                        10:00AM
                      </time>
                    </div>

                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-[#7c3aed]">
                      <h3 className="text-lg font-semibold">
                        Chairman will give speech
                      </h3>
                      <p className="text-sm text-gray-400">
                        mdsakibchy071@gmail.com
                      </p>
                      <time className="text-xs uppercase text-[#7c3aed] dark:text-gray-400">
                        10:00AM
                      </time>
                    </div>

                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-[#7c3aed]">
                      <h3 className="text-lg font-semibold">
                        Chairman will give speech
                      </h3>
                      <p className="text-sm text-gray-400">
                        mdsakibchy071@gmail.com
                      </p>
                      <time className="text-xs uppercase text-[#7c3aed] dark:text-gray-400">
                        10:00AM
                      </time>
                    </div>

                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-[#7c3aed]">
                      <h3 className="text-lg font-semibold ">
                        Chairman will give speech
                      </h3>
                      <p className="text-sm text-gray-400">
                        mdsakibchy071@gmail.com
                      </p>
                      <time className="text-xs uppercase text-[#7c3aed] dark:text-gray-400">
                        10:00AM
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="flex flex-col md:flex-col lg:flex-row lg:items-end gap-3 lg:gap-5 mx-2 mt-3">
            {/* author info */}
            <div className="w-full">
              <h4 className="font-bold text-sm text-gray-400 ml-1 my-1.5">
                Author Info
              </h4>
              <div className="flex items-center gap-3 border border-[#d6d1ff] w-full px-3 py-1.5 rounded-md">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={userData?.img_profile}
                  alt="author-image"
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold dark:text-dw text-gray-600">
                    {userData?.name}
                  </h2>
                  <h3 className="text-xs font-medium dark:text-dw text-[#713acf]">
                    {userData?.email}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* calender area */}
        <div className="w-full p-2 mt-2 md:mt-0 overflow-hidden border border-[#d6d1ff] shadow-md rounded-md">
          <Calendar
            className="min-h-full min-w-full overflow-hidden"
            cellRender={cellRender}
            // @ts-expect-error noidea
            onSelect={onSelect}
          />
        </div>
      </div>
      <Modal
        width={500}
        title="Attendee Modal"
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
        open={isModalOpen}
      >
        <Spin spinning={addAttendee.isPending}>
        <form onSubmit={UpdateEvent}>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Name</p>
            <Input name="name" className="border rounded"></Input>
            <p className="font-semibold">Email</p>
            <Input name="email" className="border rounded"></Input>
            <p className="text-xs italic">Use Gmail to automatically added to Google Calendar.</p>
            <p className="font-semibold">Time</p>
            {selectedDate && (
              <Select
                onChange={handelSelect}
                options={events[selectedDate].map((x: string) => ({
                  value: x,
                  label: x,
                }))}
                placeholder="Select time...."
              ></Select>
            )}
          </div>
          <div className="flex gap-4 mt-2 justify-center">
            <Button className="bg-light-blue-500 text-white" htmlType="submit">
              Add
            </Button>
            <Button onClick={handleCancel}>Close</Button>
          </div>
        </form>
        </Spin>
      </Modal>
    </div>
  );
};

export default EventDetails;
