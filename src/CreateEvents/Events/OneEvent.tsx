import { Form, Input, Select, DatePicker } from "antd";
import { ChangeEvent, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { AiFillAudio } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { SelectValue } from "antd/es/select";
import toast from "react-hot-toast";
import type { Dayjs } from "dayjs";
import "./OneEvent.css";
const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

const OneEvent = () => {
  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDuration, setEventDuration] = useState<string>("15 min");
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

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
        toast.success(`${eventName} is added to the Events.`);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen pt-10 mb-20 lg:mb-0 lg:pt-0 lg:flex-row bg-slate-50 dark:bg-d tin">
      {/* Input part */}
      <div className="flex items-center h-full m-5lg:m-0">
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          className="p-10 rounded-lg lg:border-r-2 border-r-violet-400 bg-white h-[500px] dark:bg-d1 dark:text-dw tin"
          onFinish={handleSubmit}>
          <div className="lg:h-96">
            <div className="lg:mb-10">
              <h3 className="text-xl font-bold text-center">New Event Type</h3>
            </div>
            <Form.Item
              label="Event Name"
              className="mb-2 font-semibold lg:mb-5">
              <Input
                name="eventName"
                value={eventName}
                onChange={handleEventName}
                required
              />
            </Form.Item>
            <Form.Item label="Duration" className="mb-2 font-semibold lg:mb-5">
              <Select value={eventDuration} onChange={handleEventDuration}>
                <Select.Option value="15 min">15 min</Select.Option>
                <Select.Option value="30 min">30 min</Select.Option>
                <Select.Option value="45 min">45 min</Select.Option>
                <Select.Option value="60 min">60 min</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Date" className="mb-2 font-semibold lg:mb-5">
              <RangePicker
                value={dates || value}
                disabledDate={disabledDate}
                onCalendarChange={(val) => {
                  setDates(val);
                }}
                onChange={(val) => {
                  setValue(val);
                }}
                onOpenChange={onOpenChange}
                changeOnBlur
              />
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
                  {" "}
                  <div className="flex flex-col items-center gap-1">
                    <AiFillAudio className="text-2xl" />
                    {/* <span className="text-xs">Audio</span> */}
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
                    {/* <span className="text-xs">Video</span> */}
                  </div>
                </span>
              </div>
            </Form.Item>
          </div>

          <Form.Item className="flex justify-center">
            <button
              type="submit"
              className="px-3 py-1 font-semibold transition-all ease-in-out border-2 rounded-md hover:border-violet-600 hover:text-violet-600 dark:bg-[#ede9fe]">
              Continue
            </button>
          </Form.Item>
        </Form>
      </div>

      {/* preview part */}
      <div className="bg-white h-[500px] p-10 rounded-lg dark:bg-d1 tin">
        <div className="">
          <h3 className="p-3 text-sm font-semibold rounded lg:text-md bg-violet-100 text-violet-800">
            This is a preview. To book an event, share the link with your
            invitees.
          </h3>
        </div>
        <div className="my-5 space-y-3">
          <p className="text-lg font-semibold">Username</p>

          <div className="space-y-2">
            <p className="text-2xl italic font-bold">
              {eventName ? eventName : "Event Name"}{" "}
            </p>
            <div className="flex items-center gap-1">
              <IoTimeOutline className="text-2xl" />
              <p className="text-lg">{eventDuration}</p>
            </div>
          </div>

          <div className="flex w-full gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
