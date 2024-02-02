import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  PlusOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
import Logo from "/logo.png";
import { Link, NavLink } from "react-router-dom";
import "./style.css";

const { Header, Sider } = Layout;
const Dashbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  return (
    <div className="flex lg:flex-row font-inter">
      <Layout className="">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            className=" absolute  z-10 lg:font-bold "
            type="text"
            icon={
              collapsed ? (
                <DoubleRightOutlined className="text-white" />
              ) : (
                <DoubleLeftOutlined className="text-white" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 74,
              height: 74,
            }}
          />
        </Header>
      </Layout>

      <Layout className="h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className=" " />
           <Link to="/dashboard"><img className="w-[50px] h-[50px] flex justify-center items-center mt-[80px] mx-auto" src={Logo}></img></Link> 
          <Menu
            theme="dark"
            className="relative   lg:w-full font-inter font-bold py-5 px-1"
            // defaultSelectedKeys={['1']}
              
            items={[

              {
                key: "1",
                icon: <PlusOutlined />,
                label: <NavLink to="/dashboard/createEvent">Create</NavLink>,
                className: "",
              },
              {
                key: "2",
                icon: <ScheduleOutlined></ScheduleOutlined>,
                label: <NavLink to="/dashboard/allEvents">Events</NavLink>,
              },
              // {
              //   key: "3",
              //   icon: <VideoCameraOutlined />,
              //   label: "Schedule Events",
              // },
              // {
              //   key: "4",
              //   icon: <UploadOutlined />,
              //   label: "Workflows",
              // },
              {
                key: "3",
                icon: <HomeOutlined />,
                label: <NavLink to="/">Home</NavLink>,
              },
            ]}
          />

          {/* <Menu.Item key="1">
            <PlusOutlined className="text-blue-500 h-6 w-6" />
            <span className="ml-4">Start</span>
          </Menu.Item> */}
        </Sider>
      </Layout>
    </div>
  );
};

export default Dashbar;
