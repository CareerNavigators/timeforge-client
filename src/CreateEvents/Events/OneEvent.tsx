import { Form, Input, Select } from "antd";
import { ChangeEvent, useState } from "react";
// import { IoTimeOutline } from "react-icons/io5";
import { AiFillAudio } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { SelectValue } from "antd/es/select";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import bgImg from "../../../public/bg.png";

const { TextArea } = Input;
const OneEvent = () => {
  const isLargeScreen = window.innerWidth > 768;
  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDuration, setEventDuration] = useState<string>("15 min");
  const [eventDesc, setEventDesc] = useState<string>("");
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

  const handleEventDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEventDesc(e.target.value);
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
      console.log(newEvent);

      if (newEvent) {
        // toast.success(`${eventName} is added to the Events.`);
        navigate("/calendarPage");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div
      className="w-full pt-10 mb-20 lg:h-screen lg:mb-0 lg:p-10"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
      }}>
      <div className="flex flex-col items-center lg:flex-row">
        {/* Input part */}
        <div className="m-5 lg:m-0 w-fit">
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            style={{
              minWidth: isLargeScreen ? 500 : "auto",
              minHeight: isLargeScreen ? 600 : "auto",
            }}
            className="p-10 bg-white rounded-md shadow-xl lg:border-2 border-violet-400"
            onFinish={handleSubmit}>
            <div className="lg:h-[50vh]">
              <div className="lg:mb-10">
                <h3 className="text-xl font-bold text-center">
                  New Event Type
                </h3>
              </div>
              <Form.Item
                label="Event Name"
                className="mb-2 font-semibold lg:mb-8">
                <Input
                  name="eventName"
                  value={eventName}
                  onChange={handleEventName}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Duration"
                className="mb-2 font-semibold lg:mb-8">
                <Select value={eventDuration} onChange={handleEventDuration}>
                  <Select.Option value="15 min">15 min</Select.Option>
                  <Select.Option value="30 min">30 min</Select.Option>
                  <Select.Option value="45 min">45 min</Select.Option>
                  <Select.Option value="60 min">60 min</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Required" className="font-semibold">
                <div className="flex w-full gap-2">
                  <span
                    onClick={handleAudioSelection}
                    className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center dark:bg-[#ede9fe] ${
                      isAudioSelected
                        ? "border-violet-600 text-violet-600"
                        : "border-gray-300 hover:shadow-md hover:border-violet-500 transition-all ease-in-out"
                    }`}>
                    <div className="flex flex-col items-center gap-1">
                      <AiFillAudio className="text-2xl" />
                    </div>
                  </span>

                  <span
                    onClick={handleVideoSelection}
                    className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center dark:bg-[#ede9fe] ${
                      isVideoSelected
                        ? "border-violet-600 text-violet-600"
                        : "border-gray-300 hover:shadow-md hover:border-violet-500 transition-all ease-in-out"
                    }`}>
                    <div className="flex flex-col items-center">
                      <FaVideo className="text-2xl" />
                    </div>
                  </span>
                </div>
              </Form.Item>

              <Form.Item
                label="Description"
                className="mt-8 text-lg font-semibold">
                <div className="w-full">
                  <TextArea
                    value={eventDesc}
                    onChange={(e) => handleEventDesc(e)}
                    placeholder="Note"
                    className=""></TextArea>
                </div>
              </Form.Item>
            </div>

            <Form.Item className="flex justify-center">
              <button
                type="submit"
                className="px-3 py-1 rounded-md border-2 font-semibold transition-all ease-in-out hover:border-violet-600 hover:text-violet-600 dark:bg-[#ede9fe]">
                Continue
              </button>
            </Form.Item>
          </Form>
        </div>

        {/* calendar part */}
        <div className="rounded-md">
          {/* <div className="px-5 pt-5 lg:px-0">
          <h3 className="p-3 text-sm font-semibold rounded lg:text-md bg-violet-100 text-violet-800 dark:bg-d1 tin">
            This is a preview. To book an event, share the link with your
            invitees.
          </h3>
        </div>
        <div className="my-5 space-y-3">
          <p className="px-5 font-semibold lg:text-lg lg:px-0">Username</p>

          <div className="space-y-2">
            <p className="lg:text-2xl w-[500px] font-bold italic lg:px-0 px-5">
              {eventName ? eventName : "Event Name"}{" "}
            </p>
            <div className="flex items-center gap-1 px-5 pt-5 lg:px-0">
              <IoTimeOutline className="lg:text-2xl" />
              <p className="text-lg">{eventDuration}</p>
            </div>
          </div>

          <div className="flex w-full gap-3 px-5 lg:px-0">
            {isAudioSelected ? (
              <p className="px-2 text-white border-2 rounded w-fit border-violet-600 bg-violet-400 text-md">
                Audio
              </p>
            ) : (
              <p className="text-sm ">
                <span className="text-lg font-bold text-red-500">*</span> Audio
                not Required
              </p>
            )}
            {isVideoSelected ? (
              <p className="px-2 text-white border-2 rounded w-fit border-violet-600 bg-violet-400 text-md">
                Video
              </p>
            ) : (
              <p className="text-sm">
                <span className="text-lg font-bold text-red-500">*</span> Video
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
            onSelectTime={function (): void {}}></CalendarPage>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
