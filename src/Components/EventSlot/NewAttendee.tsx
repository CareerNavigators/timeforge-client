import { Button, Form, Input } from "antd";
import { useLoaderData } from "react-router-dom";
import { EventType } from "../../ManageEvents/AllEvents/AllEvents";
import Logo from "/logo.png";
import showToast from "../../Hook/swalToast";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import AxiosSecure from "../../Hook/useAxios";
import { useNavigate } from "react-router-dom";

const NewAttendee = () => {
  const { _id, title, duration, eventType } = useLoaderData() as EventType;
  const { userData } = useContext(AuthContext);
  console.log(userData);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [attendees, setAttendees] = useState<Array<unknown>>([]);
  const [attendeeName, setAttendeeName] = useState<string>("");
  const [attendeeEmail, setAttendeeEmail] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [eventSlots, setEventSlot] = useState({});
  const axiosSecure = AxiosSecure();

  const handleAttendeeName = (e: ChangeEvent<HTMLInputElement>) => {
    setAttendeeName(e.target.value);
  };
  const handleAttendeeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setAttendeeEmail(e.target.value);
  };
  const handleEventSlot = (value: any) => {
      setEventSlot(value);
  };
  const handleEventName = (e: ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const handleAttendeeSubmit = async () => {
    try {
      const createAttendee = {
        name: attendeeName,
        email: attendeeEmail,
        event: _id,// Use eventName if available, otherwise use title
        slot: {a:12, b:23},
      };
      const res = await axiosSecure.post("/attendee", createAttendee);
      console.log(res);
      setAttendees((prevAttendees) => [...prevAttendees, createAttendee]);
      showToast("success", "Attendee is added to the Event.");
      navigate("/");
    } catch (error) {
      console.error(
        "Error adding attendee:",
      );
      showToast("error", "Failed to add attendee. Please try again.");
    }
  };
  console.log("AttendeeName:", attendeeName);
  console.log("email:", attendeeEmail);
  console.log("id:", _id);
  console.log("slot:", eventSlots);

  useEffect(() => {
    console.log("All Attendees:", attendees);
  }, [attendees]);

  return (
    <div className="bg-gradient-to-r from-[#9181F4] to-[#5038ED]  p-5 pt-20 lg:p-10 min-h-screen">
      <div className="max-w-xl mx-auto">
        <div className="flex mb-5 drop-shadow-lg items-center justify-center gap-4">
          <img className="h-10" src={Logo} alt="logo" />
          <h3 className="text-white text-4xl font-bold">TimeForge</h3>
        </div>
        <Form
          form={form}
          labelCol={{ span: 2 }}
          layout="horizontal"
          onFinish={handleAttendeeSubmit}
          className="p-10 lg:border-2 border-[#7c3aed] bg-white rounded-md shadow-xl"
        >
          <div className="lg:h-[65vh] h-full">
            <div className="lg:mb-10 text-center">
              <h2 className="text-4xl pb-2 text-[#7c3aed] font-bold">
                {title}
              </h2>
              <h2 className="text-xl font-medium">Event Type: {eventType}</h2>
              <h2 className="text-xl font-medium">
                Duration: {duration} Minutes
              </h2>
            </div>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please Enter Name!" }]}
            >
              <Input
                placeholder="Full Name"
                value={attendeeName}
                onChange={handleAttendeeName}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please Enter Email!" }]}
            >
              <Input
                placeholder="Email"
                value={attendeeEmail}
                onChange={handleAttendeeEmail}
              />
            </Form.Item>
            <Form.Item name="event">
              <Input
                placeholder="Event"
                defaultValue={title}
                disabled
               // value={eventName}
                onChange={handleEventName}
              />
            </Form.Item>
            <Form.Item
              name="slot"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input placeholder="slot" onChange={handleEventSlot} />
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
    </div>
  );
};

export default NewAttendee;
