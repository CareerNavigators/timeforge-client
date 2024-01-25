import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ScheduleOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { MdEventSeat } from "react-icons/md";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
import Logo from "/logo.png";
import { NavLink } from "react-router-dom";
import "./style.css";

const { Header, Sider } = Layout;
const Dashbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  return (
    <div className="flex  lg:flex-row font-inter">
      <Layout className="">
        <Header  style={{ padding: 0, background: colorBgContainer }}>
          <Button
            className=" absolute lg:sticky z-10 lg:font-bold lg:bg-slate-200"
            type="text"
            icon={collapsed ? <DoubleRightOutlined className="text-white lg:text-black"/> : <DoubleLeftOutlined className="text-white lg:text-black" />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 74,
              height: 74,
            }}
          />
        </Header>
      </Layout>

      <Layout className="">
        <Sider  trigger={null} collapsible collapsed={collapsed}>
          <div className=" " />
          <Menu
            theme="dark"

            className="relative h-screen lg:w-[300px] font-inter font-bold"
            // defaultSelectedKeys={['1']}

            items={[
              {
                key: "0",
                icon: <img src={Logo} className=" h-[30px] "/>,
                label: <NavLink to="/dashboard">Time Forge</NavLink>,
              },

              {
                key: "1",
                icon: <PlusOutlined />,
                label: "Start",
                className: "menu-item-1",
              },
              {
                key: "2",
                icon: <ScheduleOutlined/>,
                label: "Events",
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
