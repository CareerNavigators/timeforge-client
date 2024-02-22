import { Button, Form, Input, InputNumber, InputRef, Menu, Select, Space, Switch, TimePicker } from "antd";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { SelectValue } from "antd/es/select";
import CalendarPage from "../CreateEvents/Events/CalendarPage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AxiosSecure from "../Hook/useAxios";
import { AuthContext } from "../Provider/AuthContext";
import showToast from "../Hook/swalToast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EventType } from "../ManageEvents/AllEvents/AllEvents";
import { AudioMutedOutlined, AudioOutlined, PlusOutlined } from "@ant-design/icons";
import { Divider } from "rc-menu";
import moment from "moment";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";



const UpdateEvent = () => {
    const { userData } = useContext(AuthContext);
    const { _id, title, duration, desc, eventType: eventTypes, events: event, camera, mic, offline, startTime, endTime } = useLoaderData() as EventType;

    console.log(event);

    // converting total hours into hour and minutes
    const durations = moment.duration(duration, 'minutes');
    const hours = Math.floor(durations.asHours());
    const minutes = durations.minutes();
    console.log("startstring", startTime);
    console.log("endstring", startTime);


    // converting start/end hour from string in time picker with momentJs
    dayjs.extend(customParseFormat);
    const startDayjs = dayjs(startTime, 'h:mm a');
    const endDayjs = dayjs(endTime, 'h:mm a');
    console.log("start", startDayjs);
    console.log("end", endDayjs);

    const [selectedTimes, setSelectedTimes] = useState<{
        [key: string]: string[];
    }>({});
    const [isAudioSelected, setIsAudioSelected] = useState(mic);
    const [isVideoSelected, setIsVideoSelected] = useState(camera);
    const [isOffline, setIsOffline] = useState(offline);
    const [eventName, setEventName] = useState<string>("");
    const [eventDurationHour, setEventDurationHour] = useState(hours);
    const [eventDurationMinute, setEventDurationMinute] = useState(minutes);
    const [eventType, setEventType] = useState<string>("");
    const [eventDesc, setEventDesc] = useState<string>(desc);
    const [events, setEvents] = useState<Array<unknown>>([]);
    const [eventTime, setEventTime] = useState<any>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const axiosSecure = AxiosSecure();
    const eventDuration = eventDurationHour + eventDurationMinute;

    // custom event types states and functions starts
    const [items, setItems] = useState([
        "Interview",
        "Meeting",
        "Seminar",
        "Webinar",
    ]);

    if (!items.includes(eventTypes)) {
        setItems([...items, eventTypes])
    }

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
                title: eventName || title,
                duration: eventDuration,
                mic: isAudioSelected,
                camera: isVideoSelected,
                eventType: eventType || eventTypes,
                desc: eventDesc,
                events: selectedTimes,
                offline: isOffline
            };

            axiosSecure.patch(`/meeting/${_id}`, newEvent).then((res) => {
                console.log(res.data);
                setEvents((prevEvents) => [...prevEvents, newEvent]);
                showToast("success", `${eventName} is updated.`);
                navigate(`/dashboard/eventDetails/${_id}`);
            });
        } catch (error) {
            console.error("Error updating task:", error);
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
                <div className="lg:m-0 max-h-[100%] bg-white dark:bg-d lg:border-r-2 border-[#7c3aed]">
                    <Form
                        form={form}
                        layout="horizontal"
                        className="p-10"
                        onFinish={handleSubmit}
                    >
                        <div className="h-full">
                            <div className="lg:mb-10 mb-5">
                                <h3 className="text-xl font-bold text-center dark:text-dw">
                                    Update Event
                                </h3>
                            </div>
                            <Form.Item
                                name="Input"
                                initialValue={title}
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
                                    initialValue={hours}
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
                                    initialValue={minutes}
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
                                initialValue={startTime}
                                rules={[{ required: true, message: "Please select!" }]}
                            >
                                <TimePicker.RangePicker
                                    use12Hours
                                    format="h:mm a"
                                    onChange={handleStartEndTime}
                                    className="w-full"
                                    defaultValue={[startDayjs, endDayjs]} />
                            </Form.Item>

                            {/* Dynamic event type */}
                            <Form.Item
                                initialValue={eventTypes}
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
                                            <Menu>
                                                <Divider style={{ margin: "8px  0" }} />
                                                <Space
                                                    className="w-full flex flex-row justify-end"
                                                    style={{
                                                        padding: "0  8px  4px",
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
                                            </Menu>
                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item, value: item }))}
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

                        <Form.Item className="mt-24 lg:mt-28">
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

                {/* calendar part */}
                <div className="">
                    <CalendarPage
                        eventDuration={eventDuration}
                        eventTime={eventTime}
                        setSelectedTimes={setSelectedTimes}
                        selectedTimes={selectedTimes}
                    ></CalendarPage>
                </div>
            </div>
        </div>
    );
};

export default UpdateEvent;
