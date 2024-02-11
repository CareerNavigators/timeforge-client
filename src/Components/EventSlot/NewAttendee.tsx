import { Button, Form, Input, Select } from "antd";
import { useLoaderData } from "react-router-dom";
import { EventType } from "../../ManageEvents/AllEvents/AllEvents";
import Logo from "/logo.png";

const NewAttendee = () => {
  const { title, duration, eventType} = useLoaderData() as EventType;
 
  return (
    <div className="bg-gradient-to-r from-[#9181F4] to-[#5038ED]  p-5 pt-20 lg:p-10 min-h-screen">
      <div className="max-w-xl mx-auto">
        <div className="flex mb-5 drop-shadow-lg items-center justify-center gap-4">
          <img className="h-10" src={Logo} alt="logo" />
          <h3 className="text-white text-4xl font-bold">TimeForge</h3>
        </div>
        <Form
          labelCol={{ span: 2 }}
          layout="horizontal"
          className="p-10 lg:border-2 border-[#7c3aed] bg-white rounded-md shadow-xl"
        >
          <div className="lg:h-[65vh] h-full">
            <div className="lg:mb-10 text-center">
              <h2 className="text-4xl pb-2 text-[#7c3aed] font-bold">
                {title}
              </h2>
              <h2 className="text-xl font-medium">Event Type: {eventType}</h2>
              <h2 className="text-xl font-medium">Duration: {duration} Minutes</h2>
            </div>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="event"
            >
              <Input placeholder="Event" defaultValue={title} disabled/>
            </Form.Item>
            
            <Form.Item
                name="eventType"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  value={eventType}
                  placeholder="Event Slot"
                >
                  <Select.Option value="slot">10.00 AM</Select.Option>
                  <Select.Option value="slot">12.00 PM</Select.Option>
                  <Select.Option value="slot">05.00 PM</Select.Option>
                  <Select.Option value="slot">09.00 PM</Select.Option>
                </Select>
              </Form.Item>


          </div>

          <Form.Item className="flex justify-center">
            <Button
              htmlType="submit"
              className="px-3 py-1 rounded-md border-2 font-semibold transition-all ease-in-out hover:border-violet-600 hover:text-violet-600 dark:bg-[#ede9fe]"
            >
             Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewAttendee;
