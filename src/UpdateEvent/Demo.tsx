import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { SelectValue } from "antd/es/select";
import CalendarPage from "../CreateEvents/Events/CalendarPage";
import bgImg from "/bg.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AxiosSecure from "../Hook/useAxios";
import { AuthContext } from "../Provider/AuthContext";
import showToast from "../Hook/swalToast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EventType } from "../ManageEvents/AllEvents/AllEvents";
import { AudioMutedOutlined, AudioOutlined } from "@ant-design/icons";


const Demo = () => {
    // states and loaders
    const { userData } = useContext(AuthContext);
    const { _id, title, duration, desc, eventType, events, camera, mic } = useLoaderData() as EventType;
    const isLargeScreen = window.innerWidth > 768;
    const [isAudioSelected, setIsAudioSelected] = useState(mic);
    const [isVideoSelected, setIsVideoSelected] = useState(camera);
    const [eventName, setEventName] = useState<string>("");
    const [eventDuration, setEventDuration] = useState(duration);
    const [eventTypes, setEventTypes] = useState<string>("");
    const [eventDesc, setEventDesc] = useState<string>(desc);
    const [event, setEvent] = useState<Array<unknown>>([]);
    const [eventTime, setEventTime] = useState<any>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [selectedTimes, setSelectedTimes] = useState(null);
    const axiosSecure = AxiosSecure();

    // useEffect for event select
    useEffect(() => {
        setSelectedTimes(events);
    }, [events]);

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
        setEventTypes(value as string);
    };

    const handleEventDesc = (value: string) => {
        setEventDesc(value);
    };

    const handleSubmit = async () => {
        try {
            const newEvent = {
                createdBy: userData?._id,
                title: eventName || title,
                duration: eventDuration,
                mic: isAudioSelected,
                camera: isVideoSelected,
                eventType: eventTypes || eventType,
                desc: eventDesc,
                events: selectedTimes,
            };
            axiosSecure.patch(`/meeting/${_id}`, newEvent).then((res) => {
                console.log(res.data);
                setEvent((prevEvents) => [...prevEvents, newEvent]);
                showToast("success", `${eventName} is added to the Events.`);
                navigate(`/dashboard/eventDetails/${_id}`);
            });
        } catch (error) {
            console.error("Error adding task:", error);
            showToast("error", "Please fill in all required fields.");
        }
    };

    useEffect(() => {
        console.log("All Events:", event);
    }, [event]);

    return (
        <div
            className="w-full h-screen pt-10 mb-20 lg:mb-0 lg:p-10"
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
                        labelCol={{ span: 2 }}
                        layout="horizontal"
                        style={{
                            minWidth: isLargeScreen ? 500 : "auto",
                            minHeight: isLargeScreen ? 700 : "auto",
                        }}
                        className="p-10 lg:border-2 border-[#7c3aed] bg-white rounded-md shadow-xl"
                        onFinish={handleSubmit}
                    >
                        <div className="lg:h-[65vh] h-full">
                            <div className="lg:mb-10">
                                <h3 className="text-xl font-bold text-center">
                                    New Event Type
                                </h3>
                            </div>
                            <Form.Item
                                name="Input"
                                initialValue={title}
                                rules={[{ required: true, message: "Please input!" }]}
                            >
                                <Input
                                    placeholder="Event name"
                                    value={eventName}
                                    onChange={handleEventName}
                                />
                            </Form.Item>

                            <Form.Item
                                name="duration"
                                initialValue={duration}
                                rules={[{ required: true, message: "Please input!" }]}
                            >
                                <InputNumber
                                    placeholder="Duration"
                                    min={1}
                                    max={60}
                                    style={{ width: "100%" }}
                                    value={eventDuration}
                                    onChange={handleEventDuration}
                                />
                            </Form.Item>

                            <Form.Item
                                name="eventType"
                                initialValue={eventType}
                                rules={[{ required: true, message: "Please input!" }]}
                            >
                                <Select
                                    placeholder="Event Type"
                                    value={eventTypes}
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
                                            defaultValue={mic}
                                            className="bg-gray-400"
                                            size="small"
                                            onClick={handleAudioSelection}
                                        />
                                        <AudioOutlined />
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <FaVideoSlash />
                                        <Switch
                                            defaultChecked={camera}
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
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* calendar part */}
                <div className="rounded-md h-full">
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

export default Demo;