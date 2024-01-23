import { Button, DatePicker, Form, Input, Select, Checkbox } from "antd";

const { RangePicker } = DatePicker;

const OneEvent = () => {
  return (
    // <div className="w-full h-screen mt-10 space-y-5 flex flex-col items-center">
    //   <div className="text-left">
    //     <h3 className="text-3xl font-bold">New Event Type</h3>
    //   </div>
    //   <div>
    //     <Card className="w-[500px]">
    //       <p className="p-1">Card content</p>
    //       <Input placeholder="Outlined" />
    //     </Card>
    //   </div>
    // </div>

    <div className="w-full h-screen flex flex-col items-center">
      <div className="my-10">
        <h3 className="text-3xl font-bold">New Event Type</h3>
      </div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        className="pt-8 rounded border-2"
      >
        <Form.Item label="Event Name">
          <Input />
        </Form.Item>
        <Form.Item label="Duration">
          <Select>
            <Select.Option value="demo">15 min</Select.Option>
            <Select.Option value="demo">30 min</Select.Option>
            <Select.Option value="demo">45 min</Select.Option>
            <Select.Option value="demo">60 min</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Requirement">
          <Checkbox.Group>
            <Checkbox value="apple"> Audio </Checkbox>
            <Checkbox value="pear"> Pear </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OneEvent;
