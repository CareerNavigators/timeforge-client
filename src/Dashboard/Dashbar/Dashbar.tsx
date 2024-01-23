import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
import Logo from "/logo.png";
import { NavLink } from "react-router-dom";
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
    <div className="flex font-inter">
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            className="font-bold bg-slate-200"
            type="text"
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
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
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className=" " />
          <Menu
            // theme="dark"

            className="h-screen font-inter font-bold"
            // defaultSelectedKeys={['1']}

            items={[
              {
                key: "0",
                icon: (
                  <div className="w-[50px]">
                    <img src={Logo} className="bg-white  h-5" />
                  </div>
                ),
                label: "Time Forge",
                className:"h-full"
              },

              {
                key: "1",
                icon: <PlusOutlined />,
                label: "Start",
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: "Event Types",
              },
              {
                key: "3",
                icon: <VideoCameraOutlined />,
                label: "Schedule Events",
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "Workflows",
              },
              {
                key: "5",
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
