import { Button, Card, Tag } from "antd";
import "./style.css";
import {
  ArrowRightOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const Pricing = () => {
  return (
    <div className="max-w-[1400px] mx-auto ">
      <h1 className="text-[30px] lg:text-[50px] text-center font-bold font-helvitica mt-9">
        Pick the perfect plan for your team in{" "}
        <span className="text-indigo-500">TimeForge</span>
      </h1>
      <div className="mt-[40px] pl-[50px] lg:pl-0 lg:mt-[80px] mb-[50px] grid grid-cols-1 lg:grid-cols-4 gap-4  ">
        {/* 1st card */}
        <Card style={{ width: 330, fontFamily: "inter" }}>
          <p className="text-[30px] font-bold">Free </p>
          <p className="font-normal h-[65px] mb-3">
            For individuals starting out with basic scheduling
          </p>
          <p className="text-[30px] font-bold">Always Free </p>
          <Button
            style={{ width: 280, height: 40 }}
            className="bg-indigo-500 text-[16px] flex justify-center items-center text-center mx-auto my-[20px] font-semibold"
            type="primary"
          >
            Get Started
          </Button>
          <p className="text-[16px] font-semibold">Free features </p>
          <div className="mt-[20px] h-[400px]">
            <div className="w-full">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              One event type with unlimited meetings
            </div>
            <div className="w-full mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Connect one calendar and basic integrations
            </div>
            <div className="w-full mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Customize your booking page
            </div>
            <div className="w-full mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Automate event notifications
            </div>
          </div>
          <button className="font-bold text-xl">
            See all features
            <ArrowRightOutlined className="pl-2" />
          </button>
        </Card>
        {/* 2nd card */}
        <Card style={{ width: 330, fontFamily: "inter" }}>
          <p className="text-[30px] font-bold">Standard </p>
          <p className="font-normal h-[65px] mb-3">
            For those with more sophisticated scheduling needs
          </p>
          <p className="text-[30px] font-bold">
            $10 <span className="text-[12px] font-normal">/seat/mo</span>{" "}
          </p>
          <Button
            style={{ width: 280, height: 40 }}
            className="bg-indigo-500 text-[16px] flex justify-center items-center text-center mx-auto my-[20px] font-semibold"
            type="primary"
          >
            Get Started
          </Button>
          <p className="text-[16px] font-semibold">Free features </p>
          <div className="mt-[20px] h-[400px]">
            <div className="w-full">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Unlimited event types with unlimited meetings
            </div>
            <div className="w-full mt-3">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Multiple calendars for availability and scheduling
            </div>
            <div className="w-full mt-3">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Integrations with Hubspot, PayPal, Stripe, and hundreds more
            </div>
            <div className="w-full mt-3">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Group (1-to-many) and collective (2-on-1) event types
            </div>
            <div className="w-full mt-3">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Reminders, re-confirmation requests, and other workflows
            </div>
            <div className="w-full mt-3">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              More customization of your booking page, emails, and Calendly on
              your website
            </div>
            <div className="w-full mt-3">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              24/7 live chat support
            </div>
          </div>
          <button className="font-bold text-xl">
            See all features
            <ArrowRightOutlined className="pl-2" />
          </button>
        </Card>
        {/* 3rd card */}
        <Card style={{ width: 330, fontFamily: "inter" }}>
          <div className="flex items-center gap-5">
            {" "}
            <p className="text-[30px] font-bold">Teams </p>
            <Tag color="cyan">Most Popular</Tag>
          </div>
          <p className="font-normal h-[65px] mb-3">
            For teams who need advanced features such as reporting, meeting
            distribution, and automations
          </p>
          <p className="text-[30px] font-bold">
            $16 <span className="text-[12px] font-normal">/seat/mo</span>{" "}
          </p>
          <Button
            style={{ width: 280, height: 40 }}
            className="bg-cyan-500 text-[16px] flex justify-center items-center text-center mx-auto my-[20px] font-semibold"
            type="primary"
          >
            Get Started
          </Button>
          <p className="text-[16px] font-semibold">Standard features Plus </p>
          <div className="mt-[20px] h-[400px]">
            <div className="">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold text-cyan-600"
              />
              Connect to Salesforce to flow meeting data into the CRM
            </div>
            <div className=" mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 text-cyan-600 "
              />
              Round robin events
            </div>
            <div className=" mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 text-cyan-600 "
              />
              Route leads to the right calendar based on form responses
              (including Calendly, Marketo, Pardot, or Hubspot forms)
            </div>
            <div className=" mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 text-cyan-600 "
              />
              Admin features for management of team events and permissions
            </div>
            <div className=" mt-2 flex flex-col bg-cyan-100 p-3 rounded-lg ">
              {" "}
              <Tag color="cyan" className="w-[60%] ">
                Optional add on
              </Tag>
              <div className="font-bold my-[10px]">
                <PlusOutlined
                  style={{ fontWeight: "bold" }}
                  className="pr-1 text-cyan-600 "
                />
                Single sign In
              </div>
              <p className="font-light">
                Simplify team access with SAML-based SSO through Okta, Azure,
                OneLogin, Auth0, and more
              </p>
            </div>
          </div>
          <button className="font-bold text-xl">
            See all features
            <ArrowRightOutlined className="pl-2" />
          </button>
        </Card>
        {/* 4th card */}
        <Card style={{ width: 330, fontFamily: "inter" }}>
          <p className="text-[30px] font-bold">Enterprise </p>
          <p className="font-normal h-[65px] mb-3">
            For teams who need enterprise-level security, admin control and
            support
          </p>
          <p className="text-[30px] font-bold">Custom </p>
          <Button
            style={{ width: 280, height: 40 }}
            className="bg-indigo-500 text-[16px] flex justify-center items-center text-center mx-auto my-[20px] font-semibold"
            type="primary"
          >
            Get Started
          </Button>
          <p className="text-[16px] font-semibold">Teams features plus</p>
          <div className="mt-[20px] h-[400px]">
            <div className="w-full">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Enable Single Sign-On and advanced user provisioning
            </div>
            <div className="w-full mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Claim your domain and work in one account
            </div>
            <div className="w-full mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Use the full suite of Salesforce routing features
            </div>
            <div className="w-full mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Ensure compliance with an audit log and data deletion API
            </div>
            <div className="w-full mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Access expedited support, onboarding and implementation
            </div>
            <div className="w-full mt-2">
              <CheckOutlined
                style={{ fontWeight: "bold" }}
                className="pr-1 font-bold"
              />
              Connect to Microsoft Dynamics 365 and Power Automate
            </div>
          </div>
          <button className="font-bold text-xl">
            See all features
            <ArrowRightOutlined className="pl-2" />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
