import { Form, Input, Select } from "antd";
import { ChangeEvent, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { AiFillAudio } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { SelectValue } from "antd/es/select";

const OneEvent = () => {
  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDuration, setEventDuration] = useState<string>("");

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

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-50">
      {/* Input part */}
      <div className="h-full flex items-center">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          className="p-10 border-r-2 border-r-violet-400 bg-white h-[500px]"
        >
          <div className="mb-3">
            <h3 className="text-xl text-center font-bold">New Event Type</h3>
          </div>
          <Form.Item label="Event Name">
            <Input value={eventName} onChange={handleEventName} />
          </Form.Item>
          <Form.Item label="Duration">
            <Select value={eventDuration} onChange={handleEventDuration}>
              <Select.Option value="15 min">15 min</Select.Option>
              <Select.Option value="30 min">30 min</Select.Option>
              <Select.Option value="45 min">45 min</Select.Option>
              <Select.Option value="60 min">60 min</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Required">
            <div className="w-full flex gap-2 ">
              <button
                onClick={handleAudioSelection}
                className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center ${
                  isAudioSelected
                    ? "border-violet-600 text-violet-600"
                    : "border-gray-300"
                }`}
              >
                <div className="flex flex-col gap-1 items-center">
                  <AiFillAudio className="text-2xl" />
                  {/* <span className="text-xs">Audio</span> */}
                </div>
              </button>

              <button
                onClick={handleVideoSelection}
                className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center ${
                  isVideoSelected
                    ? "border-violet-600 text-violet-600"
                    : "border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center">
                  <FaVideo className="text-2xl" />
                  {/* <span className="text-xs">Video</span> */}
                </div>
              </button>
            </div>
          </Form.Item>
          <Form.Item className="flex justify-center">
            <button className="px-3 py-1 rounded-md border-2 font-semibold transition-all ease-in-out hover:border-violet-600 hover:text-violet-600">
              Continue
            </button>
          </Form.Item>
        </Form>
      </div>

      {/* preview part */}
      <div className="bg-white h-[500px] p-10">
        <div className="">
          <h3 className="text-md font-semibold bg-violet-100 p-3 rounded text-violet-800">
            This is a preview. To book an event, share the link with your
            invitees.
          </h3>
        </div>
        <div className="my-5 space-y-3">
          <p className="text-lg font-semibold">Username</p>
          <p className="text-2xl font-bold italic">
            {eventName ? eventName : "Event Name"}{" "}
          </p>
          <div className="flex gap-1 items-center">
            <IoTimeOutline className="text-2xl" />
            <p className="text-lg">{eventDuration}</p>
          </div>
          <div className="flex gap-3">
            {isAudioSelected ? (
              <p className="w-fit rounded border-2 border-violet-600 bg-violet-400 px-2 text-md text-white">
                Audio
              </p>
            ) : (
              <p>
                <span className="text-red-500 font-bold text-lg">*</span> Audio
                not Required
              </p>
            )}
            {isVideoSelected ? (
              <p className="w-fit rounded border-2 border-violet-600 bg-violet-400 px-2 text-md text-white">
                Video
              </p>
            ) : (
              <p><span className="text-red-500 font-bold text-lg">*</span> Video not Required</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
