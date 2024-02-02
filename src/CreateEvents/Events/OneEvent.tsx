import { Button, Form, Input, Select } from "antd";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AiFillAudio } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { SelectValue } from "antd/es/select";
// import { useNavigate } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import bgImg from "../../../public/bg.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AxiosSecure from "../../Hook/useAxios";
import { AuthContext } from "../../Provider/AuthContext";
import showToast from "../../Hook/swalToast";

const OneEvent = () => {
  const { userData } = useContext(AuthContext);
  console.log(userData);

  const isLargeScreen = window.innerWidth > 768;
  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDuration, setEventDuration] = useState<string>("15 min");
  const [eventType, setEventType] = useState<string>("");
  const [eventDesc, setEventDesc] = useState<string>("");
  const [events, setEvents] = useState<Array<unknown>>([]);
  // const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedTimes, setSelectedTimes] = useState(null);
  const axiosSecure = AxiosSecure();

  const onSelectTime = (times: any) => {
    setSelectedTimes(times);
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
  const handleEventType = (value: SelectValue) => {
    setEventType(value as string);
  };

  const handleEventDesc = (value: string) => {
    setEventDesc(value);
  };

  const handleSubmit = async () => {
    try {
      const newEvent = {
        createdBy: "65ba4751f6c3e2ad4492cc69",
        title: eventName,
        duration: eventDuration,
        mic: isAudioSelected,
        camera: isVideoSelected,
        eventType: eventType,
        desc: eventDesc,
        events: selectedTimes,
      };
      console.log(selectedTimes);

      axiosSecure.post("/meeting", newEvent).then((res) => {
        console.log(res);
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        showToast("success", `${eventName} is added to the Events.`);
      });
    } catch (error) {
      console.error("Error adding task:", error);
      showToast("error", "Please fill in all required fields.");
    }
  };

  useEffect(() => {
    console.log("All Events:", events);
  }, [events]);

  return (
    <div
      className="w-ful pt-10 mb-20 lg:mb-0 lg:p-10"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-center mx-auto">
        {/* Input part */}
        <div className="m-5 lg:m-0 w-fit">
          <Form
            form={form}
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
                <h3 className="text-xl font-bold text-center">
                  New Event Type
                </h3>
              </div>
              <Form.Item
                label="Input"
                name="Input"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input value={eventName} onChange={handleEventName} />
              </Form.Item>

              <Form.Item
                label="Duration"
                name="duration"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select value={eventDuration} onChange={handleEventDuration}>
                  <Select.Option value="15 min">15 min</Select.Option>
                  <Select.Option value="30 min">30 min</Select.Option>
                  <Select.Option value="45 min">45 min</Select.Option>
                  <Select.Option value="60 min">60 min</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Event Type"
                name="eventType"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select value={eventType} onChange={handleEventType}>
                  <Select.Option value="Interview">Interview</Select.Option>
                  <Select.Option value="Meeting">Meeting</Select.Option>
                  <Select.Option value="Seminar">Seminar</Select.Option>
                  <Select.Option value="Webinar">Webinar</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Required"
                className="font-semibold"
                rules={[
                  { required: true, message: "Please input the event name" },
                ]}
              >
                <div className="w-full flex gap-2">
                  <span
                    onClick={handleAudioSelection}
                    className={`w-14 h-14 border-[1px] rounded-md bg-white flex items-center justify-center dark:bg-[#ede9fe] ${
                      isAudioSelected
                        ? "border-violet-600 text-violet-600"
                        : "border-gray-300 hover:shadow-md hover:border-violet-500 transition-all ease-in-out"
                    }`}
                  >
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
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <FaVideo className="text-2xl" />
                    </div>
                  </span>
                </div>
              </Form.Item>
              <Form.Item
                label="Description"
                className="text-lg font-semibold"
                rules={[
                  { required: true, message: "Please input the event name" },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  value={eventDesc}
                  onChange={handleEventDesc}
                  className="h-[200px] lg:w-[20vw]"
                />
              </Form.Item>
            </div>

            <Form.Item className="flex justify-center">
              <Button
                htmlType="submit"
                className="px-3 py-1 rounded-md border-2 font-semibold transition-all ease-in-out hover:border-violet-600 hover:text-violet-600 dark:bg-[#ede9fe]"
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* calendar part */}
        <div className="rounded-md">
          <CalendarPage
            selectedTimes={selectedTimes}
            setSelectedTimes={setSelectedTimes}
            onSelectTime={onSelectTime}
          ></CalendarPage>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
