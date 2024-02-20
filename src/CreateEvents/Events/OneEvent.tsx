import { Button, Divider, Form, Input, InputNumber, InputRef, Select, Space, Switch } from "antd";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import { AudioOutlined, AudioMutedOutlined, PlusOutlined } from "@ant-design/icons";
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

  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [eventDuration, setEventDuration] = useState(15);
  const [eventType, setEventType] = useState<string>("");
  const [eventDesc, setEventDesc] = useState<string>("");
  const [events, setEvents] = useState<Array<unknown>>([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedTimes, setSelectedTimes] = useState(null);
  const axiosSecure = AxiosSecure();

  // custom event types states and functions starts
  const [items, setItems] = useState(['Interview', 'Meeting', 'Seminar', 'Webinar']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  // custom event types states and functions ends

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

  // handle online/offline toggle
  const handleOfflineOnlineToggle = () => {
    setIsOffline(!isOffline);
    // setIsAudioSelected(!isAudioSelected);
    // setIsVideoSelected(!isVideoSelected);
  }

  console.log("checking offline", isOffline);
  // console.log("audio", isAudioSelected);
  // console.log("video", isVideoSelected);
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
        offline:isOffline
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

              {/* Event name */}
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
                      <div className="">
                        {menu}
                      </div>
                      <Divider style={{ margin: '8px 0' }} />
                      <Space className="flex flex-row justify-end" style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Enter event type"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button style={{ border: '1px solid LightGray' }} type="text" icon={<PlusOutlined />} onClick={addItem}>
                          Add Event
                        </Button>
                      </Space>
                    </>
                  )}
                  options={items.map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>

              <Space direction="horizontal" className="flex justify-between px-1">
                {/* online/offline meeting */}
                <Form.Item
                  rules={[
                    { required: true, message: "Please select!" },
                  ]}
                >
                  <Switch
                    checkedChildren="Offline"
                    unCheckedChildren="Online"
                    className="bg-gray-400"
                    onClick={handleOfflineOnlineToggle}
                  />
                </Form.Item>

                {/* Select audio/video */}
                <Form.Item rules={[{ required: true, message: "Please input!" }]}>
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <AudioMutedOutlined />
                      <Switch
                        className="bg-gray-400"
                        size="small"
                        defaultChecked={isOffline ? true : false }
                        onClick={handleAudioSelection}
                      />
                      <AudioOutlined />
                    </div>

                    <div className="flex gap-2 items-center">
                      <FaVideoSlash />
                      <Switch
                        className="bg-gray-400"
                        size="small"
                        defaultChecked={isOffline ? true : false }
                        onClick={handleVideoSelection}
                      />
                      <FaVideo />
                    </div>
                  </div>
                </Form.Item>
              </Space>

              {/* add description */}
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

            {/* submit button */}
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
