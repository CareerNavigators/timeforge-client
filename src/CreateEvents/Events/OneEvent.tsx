import { Form, Input, Select } from "antd";
import { ChangeEvent, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { AiFillAudio } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { SelectValue } from "antd/es/select";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const OneEvent = () => {
  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDuration, setEventDuration] = useState<string>("15 min");
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

  const handleSubmit = async () => {
    try {
      const newEvent = {
        // email: user.email,
        eventName: eventName,
        duration: eventDuration,
        requiredAudio: isAudioSelected,
        requiredVideo: isVideoSelected,
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
    <div className="w-full h-screen pt-10 mb-20 lg:mb-0 lg:pt-0 flex flex-col lg:flex-row justify-center items-center bg-slate-50">
      {/* Input part */}
      <div className="h-full lg:m-0 m-5 flex items-center">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          className="p-10 lg:border-r-2 border-r-violet-400 bg-white h-[500px]"
          onFinish={handleSubmit}
        >
          <div className="lg:h-96">
            <div className="lg:mb-10">
              <h3 className="text-xl text-center font-bold">New Event Type</h3>
            </div>
            <Form.Item
              label="Event Name"
              className="font-semibold mb-2 lg:mb-5"
            >
              <Input
                name="eventName"
                value={eventName}
                onChange={handleEventName}
                required
              />
            </Form.Item>
            <Form.Item label="Duration" className="font-semibold mb-2 lg:mb-5">
              <Select value={eventDuration} onChange={handleEventDuration}>
                <Select.Option value="15 min">15 min</Select.Option>
                <Select.Option value="30 min">30 min</Select.Option>
                <Select.Option value="45 min">45 min</Select.Option>
                <Select.Option value="60 min">60 min</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Required" className="font-semibold">
              <div className="w-full flex gap-2 ">
                <span
                  onClick={handleAudioSelection}
                  className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center ${
                    isAudioSelected
                      ? "border-violet-600 text-violet-600"
                      : "border-gray-300 hover:shadow-md hover:border-violet-500 transition-all ease-in-out"
                  }`}
                >
                  <div className="flex flex-col gap-1 items-center">
                    <AiFillAudio className="text-2xl" />
                    {/* <span className="text-xs">Audio</span> */}
                  </div>
                </span>

                <span
                  onClick={handleVideoSelection}
                  className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center ${
                    isVideoSelected
                      ? "border-violet-600 text-violet-600"
                      : "border-gray-300 hover:shadow-md hover:border-violet-500 transition-all ease-in-out"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <FaVideo className="text-2xl" />
                    {/* <span className="text-xs">Video</span> */}
                  </div>
                </span>
              </div>
            </Form.Item>

            <Form.Item label="Description" className="text-lg font-semibold">
              <div className="bg-blue-50 w-full">
                <TextArea placeholder="Note"></TextArea>
              </div>
            </Form.Item>
          </div>

          <Form.Item className="flex justify-center">
            <button
              type="submit"
              className="px-3 py-1 rounded-md border-2 font-semibold transition-all ease-in-out hover:border-violet-600 hover:text-violet-600"
            >
              Continue
            </button>
          </Form.Item>
        </Form>
      </div>

      {/* preview part */}
      <div className="bg-white h-[500px] p-10">
        <div className="">
          <h3 className="lg:text-md text-sm font-semibold bg-violet-100 p-3 rounded text-violet-800">
            This is a preview. To book an event, share the link with your
            invitees.
          </h3>
        </div>
        <div className="my-5 space-y-3">
          <p className="text-lg font-semibold">Username</p>

          <div className="space-y-2">
            <p className="text-2xl font-bold italic">
              {eventName ? eventName : "Event Name"}{" "}
            </p>
            <div className="flex gap-1 items-center">
              <IoTimeOutline className="text-2xl" />
              <p className="text-lg">{eventDuration}</p>
            </div>
          </div>

          <div className="w-full flex gap-3">
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
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
              natus?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
