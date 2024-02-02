import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  PlusOutlined,
  ScheduleOutlined,
  UserOutlined,
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
            className="absolute z-10 lg:font-bold"
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
              fontSize: "26px",
              width: 74,
              height: 74,
            }}
          />
        </Header>
      </Layout>

      <Layout className="h-screen text-[30px]">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="" />
          <Link to="/dashboard">
            <img
              className="w-[50px] h-[50px] flex justify-center items-center mt-[80px] mx-auto"
              src={Logo}></img>
          </Link>
          <Menu
            theme="dark"
            className="relative px-1 py-5 font-bold lg:w-full font-inter"
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
              {
                key: "4",
                icon: <UserOutlined />,
                label: (
                  <NavLink className="mt-auto" to="/dashboard/profile">
                    Profile
                  </NavLink>
                ),
              },
            ]}
          />

          {/* <Menu.Item key="1">
            <PlusOutlined className="w-6 h-6 text-blue-500" />
            <span className="ml-4">Start</span>
          </Menu.Item> */}
        </Sider>
      </Layout>
    </div>
  );
};

export default Dashbar;
