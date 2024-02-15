import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SelectValue } from "antd/es/select";
import CalendarPage from "./CalendarPage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AxiosSecure from "../../Hook/useAxios";
import { AuthContext } from "../../Provider/AuthContext";
import showToast from "../../Hook/swalToast";
import { useNavigate } from "react-router-dom";

const OneEvent = () => {
  const { userData } = useContext(AuthContext);
  console.log(userData);

  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDuration, setEventDuration] = useState(15);
  const [eventType, setEventType] = useState<string>("");
  const [eventDesc, setEventDesc] = useState<string>("");
  const [events, setEvents] = useState<Array<unknown>>([]);
  const navigate = useNavigate();
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

  const handleEventDuration = (value: number | null) => {
    if (value !== null) {
      setEventDuration(value);
      console.log("changed", value);
    }
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
        createdBy: userData?._id,
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
        navigate("/dashboard/userEvent");
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
    <div className="w-full max-w-[1400px] mx-auto pt-10 mb-20 lg:mb-0 lg:p-10">
      <div className="flex flex-col lg:flex-row items-center justify-center mx-5 lg:mx-auto rounded-md">
        {/* Input part */}
        <div className="lg:m-0 max-h-[100%] bg-white lg:border-r-2 border-[#7c3aed]">
          <Form
            form={form}
            layout="horizontal"
            className="p-10"
            onFinish={handleSubmit}
          >
            <div className="lg:h-[65vh] h-full">
              <div className="lg:mb-10 mb-5">
                <h3 className="text-xl font-bold text-center">
                  New Event Type
                </h3>
              </div>
              <Form.Item
                name="Input"
                rules={[
                  { required: true, message: "Please input event name!" },
                ]}
              >
                <Input
                  placeholder="Event name"
                  value={eventName}
                  onChange={handleEventName}
                />
              </Form.Item>

              <Form.Item
                name="duration"
                rules={[
                  { required: true, message: "Please input duration minute!" },
                ]}
              >
                <InputNumber
                  placeholder="Duration minute"
                  min={1}
                  max={60}
                  className="w-full"
                  onChange={handleEventDuration}
                />
              </Form.Item>

              <Form.Item
                name="eventType"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  value={eventType}
                  placeholder="Event Type"
                  onChange={handleEventType}
                >
                  <Select.Option value="Interview">Interview</Select.Option>
                  <Select.Option value="Meeting">Meeting</Select.Option>
                  <Select.Option value="Seminar">Seminar</Select.Option>
                  <Select.Option value="Webinar">Webinar</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item rules={[{ required: true, message: "Please input!" }]}>
                <div className="flex gap-5">
                  <div className="flex gap-2">
                    <AudioMutedOutlined />
                    <Switch
                      className="bg-gray-400"
                      size="small"
                      onClick={handleAudioSelection}
                    />
                    <AudioOutlined />
                  </div>

                  <div className="flex gap-2 items-center">
                    <FaVideoSlash />
                    <Switch
                      className="bg-gray-400"
                      size="small"
                      onClick={handleVideoSelection}
                    />
                    <FaVideo />
                  </div>
                </div>
              </Form.Item>

              <Form.Item
                className="text-lg font-semibold"
                rules={[
                  { required: true, message: "Please input the event name" },
                ]}
              >
                <ReactQuill
                  placeholder="Description"
                  theme="snow"
                  value={eventDesc}
                  onChange={handleEventDesc}
                  className="h-[200px] lg:w-[25vw]"
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
        <div className="">
          <CalendarPage
            selectedTimes={selectedTimes}
            setSelectedTimes={setSelectedTimes}
            onSelectTime={onSelectTime}
            eventDuration={eventDuration}
          ></CalendarPage>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
