import { Form, Input, Select } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillAudio } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { SelectValue } from "antd/es/select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import bgImg from "../../../public/bg.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// const { TextArea } = Input;
const OneEvent = () => {
  const isLargeScreen = window.innerWidth > 768;
  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDuration, setEventDuration] = useState<string>("15 min");
  const [eventDesc, setEventDesc] = useState<string>("");
  const [events, setEvents] = useState<Array<unknown>>([]);
  const navigate = useNavigate();

  const handleAudioSelection = () => {
    setIsAudioSelected(!isAudioSelected);
  };
  const handleVideoSelection = () => {
    setIsVideoSelected(!isVideoSelected);
  };

  const handleEventName = (e: ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const handleEventDuration = (value: SelectValue) => {
    setEventDuration(value as string);
  };

  const handleEventDesc = (value: string) => {
    setEventDesc(value);
  };

  const handleSubmit = async () => {
    try {
      const newEvent = {
        // email: user.email,
        eventName: eventName,
        duration: eventDuration,
        requiredAudio: isAudioSelected,
        requiredVideo: isVideoSelected,
        eventDesc: eventDesc,
      };
      await setEvents((prevEvents) => [...prevEvents, newEvent]);

      if (newEvent) {
        toast.success(`${eventName} is added to the Events.`);
        navigate("/calendarPage");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    console.log("All Events:", events);
  }, [events]);

  return (
    <div
      className="w-full lg:h-screen pt-10 mb-20 lg:mb-0 lg:p-10"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center">
        {/* Input part */}
        <div className="lg:m-0 m-5 w-fit">
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            style={{
              minWidth: isLargeScreen ? 600 : "auto",
              minHeight: isLargeScreen ? 700 : "auto",
            }}
            className="p-10 lg:border-2 border-violet-400 bg-white rounded-md shadow-xl"
            onFinish={handleSubmit}
          >
            <div className="lg:h-[65vh] h-full">
              <div className="lg:mb-10">
                <h3 className="text-xl text-center font-bold">
                  New Event Type
                </h3>
              </div>
              <Form.Item
                label="Event Name"
                className="font-semibold mb-2 lg:mb-8"
              >
                <Input
                  name="eventName"
                  value={eventName}
                  onChange={handleEventName}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Duration"
                className="font-semibold mb-2 lg:mb-8"
              >
                <Select value={eventDuration} onChange={handleEventDuration}>
                  <Select.Option value="15 min">15 min</Select.Option>
                  <Select.Option value="30 min">30 min</Select.Option>
                  <Select.Option value="45 min">45 min</Select.Option>
                  <Select.Option value="60 min">60 min</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Required" className="font-semibold">
                <div className="w-full flex gap-2">
                  <span
                    onClick={handleAudioSelection}
                    className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center dark:bg-[#ede9fe] ${
                      isAudioSelected
                        ? "border-violet-600 text-violet-600"
                        : "border-gray-300 hover:shadow-md hover:border-violet-500 transition-all ease-in-out"
                    }`}
                  >
                    <div className="flex flex-col gap-1 items-center">
                      <AiFillAudio className="text-2xl" />
                    </div>
                  </span>

                  <span
                    onClick={handleVideoSelection}
                    className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center dark:bg-[#ede9fe] ${
                      isVideoSelected
                        ? "border-violet-600 text-violet-600"
                        : "border-gray-300 hover:shadow-md hover:border-violet-500 transition-all ease-in-out"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <FaVideo className="text-2xl" />
                    </div>
                  </span>
                </div>
              </Form.Item>

              <Form.Item label="Description" className="text-lg font-semibold">
                {/* <div className="w-full">
                  <TextArea
                    value={eventDesc}
                    onChange={(e) => handleEventDesc(e)}
                    placeholder="Note"
                    className=""
                  ></TextArea>
                </div> */}
                <ReactQuill
                  theme="snow"
                  value={eventDesc}
                  onChange={handleEventDesc}
                  className="h-[200px] lg:w-[20vw]"
                />
              </Form.Item>
            </div>

            <Form.Item className="flex justify-center">
              <button
                type="submit"
                className="px-3 py-1 rounded-md border-2 font-semibold transition-all ease-in-out hover:border-violet-600 hover:text-violet-600 dark:bg-[#ede9fe]"
              >
                Continue
              </button>
            </Form.Item>
          </Form>
        </div>

        {/* calendar part */}
        <div className="rounded-md">
          {/* <div className="lg:px-0 px-5 pt-5">
          <h3 className="lg:text-md text-sm font-semibold bg-violet-100 p-3 rounded text-violet-800 dark:bg-d1 tin">
            This is a preview. To book an event, share the link with your
            invitees.
          </h3>
        </div>
        <div className="my-5 space-y-3">
          <p className="lg:text-lg font-semibold lg:px-0 px-5">Username</p>

          <div className="space-y-2">
            <p className="lg:text-2xl w-[500px] font-bold italic lg:px-0 px-5">
              {eventName ? eventName : "Event Name"}{" "}
            </p>
            <div className="flex gap-1 lg:px-0 px-5 pt-5 items-center">
              <IoTimeOutline className="lg:text-2xl" />
              <p className="text-lg">{eventDuration}</p>
            </div>
          </div>

          <div className="w-full flex gap-3 lg:px-0 px-5">
            {isAudioSelected ? (
              <p className="w-fit rounded border-2 border-violet-600 bg-violet-400 px-2 text-md text-white">
                Audio
              </p>
            ) : (
              <p className="text-sm ">
                <span className="text-red-500 font-bold text-lg">*</span> Audio
                not Required
              </p>
            )}
            {isVideoSelected ? (
              <p className="w-fit rounded border-2 border-violet-600 bg-violet-400 px-2 text-md text-white">
                Video
              </p>
            ) : (
              <p className="text-sm">
                <span className="text-red-500 font-bold text-lg">*</span> Video
                not Required
              </p>
            )}
          </div>
          <div>
            <Divider className="bg-violet-500" />
            <p className="w-[500px] text-justify lg:text-lg lg:px-0 px-5">
              {eventDesc ? eventDesc : "Note"}{" "}
            </p>
          </div>
        </div> */}
          <CalendarPage
            selectedTimes={{}}
            onSelectTime={function (): void {}}
          ></CalendarPage>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
