import {
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Switch,
  TimePicker,
} from "antd";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import {
  AudioOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import { ChangeEvent, useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AxiosSecure from "../../Hook/useAxios";
import { AuthContext } from "../../Provider/AuthContext";
import showToast from "../../Hook/swalToast";
import { useNavigate } from "react-router-dom";
import "../Events/OneEvent.css";
import { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import dayjs, { Dayjs } from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration)

const GroupMeeting = () => {
  const { userData } = useContext(AuthContext);
  const [isAudioSelected, setIsAudioSelected] = useState(true);
  const [isVideoSelected, setIsVideoSelected] = useState(true);
  const [isOffline, setIsOffline] = useState(true);
  const [eventName, setEventName] = useState<string>("");
  const [eventDurationHour, setEventDurationHour] = useState(0);
  const [eventDurationMinute, setEventDurationMinute] = useState(0);
  const [eventDesc, setEventDesc] = useState<string>("");
  const [eventTime, setEventTime] = useState<any>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const axiosSecure = AxiosSecure();
  const eventDuration = eventDurationHour + eventDurationMinute;


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
  const handleStartEndTime = (
    value: NoUndefinedRangeValueType<Dayjs>,
    dateString: string[]
  ) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);
    const startHour = value[0]?.hour();
    const startMin = value[0]?.minute();
    const endHour = value[1]?.hour();
    const endMin = value[1]?.minute();
    const times = [
      { $H: startHour, $m: startMin },
      { $H: endHour, $m: endMin },
    ];

    const formattedTimes = times.map((time) => {
      const paddedHours = String(time.$H).padStart(2, "0");
      const paddedMinutes = String(time.$m).padStart(2, "0");
      return `${paddedHours}:${paddedMinutes}`;
    });
    setEventTime(formattedTimes);
  };

  const handleEventDesc = (value: string) => {
    setEventDesc(value);
  };

  const handleOfflineOnlineToggle = () => {
    setIsOffline(!isOffline);
    if (isOffline) {
      setIsAudioSelected(false);
      setIsVideoSelected(false);
    } else {
      setIsAudioSelected(true);
      setIsVideoSelected(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const newEvent = {
        createdBy: userData?._id,
        title: eventName,
        duration: eventDuration,
        mic: isAudioSelected,
        camera: isVideoSelected,
        eventType: "Group Meeting",
        desc: eventDesc,
        events: eventTime,
        offline: isOffline,
        startTime: startTime,
        endTime: endTime,
      };

      axiosSecure.post("/meeting", newEvent).then(() => {
        showToast("success", `${eventName} is added to the Events.`);
        navigate("/dashboard/userEvent");
      });
    } catch (error) {
      console.error("Error adding task:", error);
      showToast("error", "Please fill in all required fields.");
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto pt-10 mb-20 lg:mb-0 lg:p-10">
      <div className="flex flex-col lg:flex-row items-center justify-center mx-5 lg:mx-auto rounded-md">
        {/* Input part */}
        <div className="lg:m-0 max-h-[100%] bg-white dark:bg-d ">
          {" "}
          {/*lg:border-r-2 border-[#7c3aed] */}
          <Form
            form={form}
            layout="horizontal"
            className="p-10"
            onFinish={handleSubmit}
          >
            <div className="h-full">
              <div className="lg:mb-10 mb-5">
                <h3 className="text-xl font-bold text-center dark:text-dw">
                  Group Meeting
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
                      message: "Please input duration hour!",
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

              <Form.Item
                rules={[{ required: true, message: "Please select!" }]}
              >
                <TimePicker.RangePicker
                  use12Hours
                  format="h:mm a"
                  onChange={handleStartEndTime}
                  className="w-full"
                />
              </Form.Item>

              <Space
                direction="horizontal"
                className="flex justify-between px-1"
              >
                <Form.Item
                  rules={[{ required: true, message: "Please select!" }]}
                >
                  <Switch
                    checkedChildren="Online"
                    unCheckedChildren="Offline"
                    className="bg-gray-400"
                    onClick={handleOfflineOnlineToggle}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <AudioMutedOutlined className="dark:text-dw" />
                      <Switch
                        className="bg-gray-400"
                        size="small"
                        checked={isAudioSelected}
                        onChange={handleAudioSelection}
                      />
                      <AudioOutlined className="dark:text-dw" />
                    </div>

                    <div className="flex gap-2 items-center">
                      <FaVideoSlash className="dark:text-dw" />
                      <Switch
                        className="bg-gray-400"
                        size="small"
                        checked={isVideoSelected}
                        onChange={handleVideoSelection}
                      />
                      <FaVideo className="dark:text-dw" />
                    </div>
                  </div>
                </Form.Item>
              </Space>

              <Form.Item className="text-lg font-semibold">
                <ReactQuill
                  placeholder="Description"
                  theme="snow"
                  value={eventDesc}
                  onChange={handleEventDesc}
                  className="h-[150px] lg:w-[25vw] dark:text-dw"
                />
              </Form.Item>
            </div>

            <Form.Item className="mt-36">
              <Button
                id="btn-continue"
                htmlType="submit"
                className="rounded-md font-semibold transition-all ease-in-out text-dw dark:bg-[#ede9fe]"
                block
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="p-10"></div>
      </div>
    </div>
  );
};

export default GroupMeeting;
