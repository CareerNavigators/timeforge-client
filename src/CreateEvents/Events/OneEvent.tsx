import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Select,
  Space,
  Switch,
  TimePicker,
} from "antd";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import {
  AudioOutlined,
  AudioMutedOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
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
  const [isOffline, setIsOffline] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDurationHour, setEventDurationHour] = useState(0);
  const [eventDurationMinute, setEventDurationMinute] = useState(0);
  const [eventType, setEventType] = useState<string>("");
  const [eventDesc, setEventDesc] = useState<string>("");
  const [events, setEvents] = useState<Array<unknown>>([]);
  const [eventTime, setEventTime] = useState<any>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const axiosSecure = AxiosSecure();
  const eventDuration = eventDurationHour + eventDurationMinute;
  // console.log("Event Duration: ", eventDuration);

  // custom event types states and functions starts
  const [items, setItems] = useState([
    "Interview",
    "Meeting",
    "Seminar",
    "Webinar",
  ]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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

  const handleEventDurationHour = (value: number | null) => {
    if (value !== null) {
      const min = value * 60;
      setEventDurationHour(min);
    }
  };
  const handleEventDurationMinute = (value: number | null) => {
    if (value !== null) {
      setEventDurationMinute(value);
    }
  };

  const handleEventType = (value: SelectValue) => {
    setEventType(value as string);
  };

  const handleOfflineOnlineToggle = () => {
    setIsOffline(!isOffline);
    // setIsAudioSelected(!isAudioSelected);
    // setIsVideoSelected(!isVideoSelected);
  };

  const handleStartEndTime = (value: any) => {
    const startHour = value[0].$H;
    const startMin = value[0].$m;
    const endHour = value[1].$H;
    const endMin = value[1].$m;
    const times = [
      { $H: startHour, $m: startMin },
      { $H: endHour, $m: endMin },
    ];

    const formattedTimes = times.map((time) => {
      const paddedHours = String(time.$H).padStart(2, "0");
      const paddedMinutes = String(time.$m).padStart(2, "0");

      return `${paddedHours}:${paddedMinutes}`;
    });
    console.log("Formatted time: ", formattedTimes);
    setEventTime(formattedTimes);
  };
  // console.log("EventTime: ", eventTime);

  const handleEventDesc = (value: string) => {
    setEventDesc(value);
  };

  const handleSubmit = async () => {
    try {
      const newEvent = {
        createdBy: userData?._id,
        title: eventName,
        durationHour: eventDurationHour,
        durationMinute: eventDurationMinute,
        mic: isAudioSelected,
        camera: isVideoSelected,
        eventType: eventType,
        desc: eventDesc,
      };

      axiosSecure.post("/meeting", newEvent).then(() => {
        // console.log(res);
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
    // console.log("All Events:", events);
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

              <div className="flex gap-2">
                <Form.Item
                  className="w-full"
                  name="durationHour"
                  rules={[
                    {
                      required: true,
                      message: "Please input duration minute!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Duration hour"
                    min={0}
                    max={60}
                    className="w-full"
                    onChange={handleEventDurationHour}
                  />
                </Form.Item>

                <Form.Item
                  className="w-full"
                  name="durationMinute"
                  rules={[
                    {
                      required: true,
                      message: "Please input duration minute!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Duration minute"
                    min={0}
                    max={60}
                    className="w-full"
                    onChange={handleEventDurationMinute}
                  />
                </Form.Item>
              </div>

              {/* Dynamic event type */}
              <Form.Item
                name="eventType"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  value={eventType}
                  placeholder="Event Type"
                  onChange={handleEventType}
                  dropdownRender={(menu) => (
                    <>
                      <div className="w-full">{menu}</div>
                      <Divider style={{ margin: "8px 0" }} />
                      <Space
                        className="w-full flex flex-row justify-end"
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Input
                          placeholder="Enter event type"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="w-full"
                        />
                        <Button
                          style={{ border: "1px solid LightGray" }}
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addItem}
                        >
                          Add Event
                        </Button>
                      </Space>
                    </>
                  )}
                  options={items.map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>

              <Space
                direction="horizontal"
                className="flex justify-between px-1"
              >
                {/* online/offline meeting */}
                <Form.Item
                  rules={[{ required: true, message: "Please select!" }]}
                >
                  <Switch
                    checkedChildren="Offline"
                    unCheckedChildren="Online"
                    className="bg-gray-400"
                    onClick={handleOfflineOnlineToggle}
                  />
                </Form.Item>

                {/* Select audio/video */}
                <Form.Item
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <AudioMutedOutlined />
                      <Switch
                        className="bg-gray-400"
                        size="small"
                        defaultChecked={isOffline ? true : false}
                        onClick={handleAudioSelection}
                      />
                      <AudioOutlined />
                    </div>

                    <div className="flex gap-2 items-center">
                      <FaVideoSlash />
                      <Switch
                        className="bg-gray-400"
                        size="small"
                        defaultChecked={isOffline ? true : false}
                        onClick={handleVideoSelection}
                      />
                      <FaVideo />
                    </div>
                  </div>
                </Form.Item>
              </Space>

              <Form.Item>
                <TimePicker.RangePicker
                  use12Hours
                  format="h:mm a"
                  onChange={handleStartEndTime}
                  className="w-full"
                />
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
                className="px-3 py-1 rounded-md border-2 font-semibold transition-all ease-in-out border-[#7c3aed] text-[#7c3aed] dark:bg-[#ede9fe]"
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* calendar part */}
        <div className="">
          <CalendarPage
            eventDuration={eventDuration}
            eventTime={eventTime}
          ></CalendarPage>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
