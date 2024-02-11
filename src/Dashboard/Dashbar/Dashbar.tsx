import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  PlusOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaUsers } from "react-icons/fa";
import { Layout, Menu, Button, theme } from "antd";
import { useContext, useState } from "react";
import Logo from "/logo.png";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../Provider/AuthContext";
import { SlNote } from "react-icons/sl";
const { Header, Sider } = Layout;
const Dashbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { userData } = useContext(AuthContext);
  console.log(userData?.role);

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
              fontSize: "16px",
              width: 74,
              height: 74,
            }}
          />
        </Header>
      </Layout>

      <Layout className="h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="" />
          <Link to="/dashboard">
            <img
              className="w-[50px] h-[50px] flex justify-center items-center mt-[80px] mx-auto"
              src={Logo}
              alt="Logo"
            />
          </Link>
          <Menu
            theme="dark"
            className="relative px-1 py-5 font-bold lg:w-full font-inter"
            defaultSelectedKeys={["1"]}
          >
            {userData?.role === "Admin" ? (
              <>
                <Menu.Item icon={<FaUsers />}>
                  <NavLink to="/dashboard/allUsers" end>
                    All users
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item icon={<PlusOutlined />}>
                  <NavLink to="/dashboard/createEvent" end>
                    Create
                  </NavLink>
                </Menu.Item>
              </>
            )}
            <Menu.Item icon={<ScheduleOutlined />}>
              <NavLink to="/dashboard/allEvents" end>
                All Events
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<HomeOutlined />}>
              <NavLink to="/" end>
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />}>
              <NavLink className="mt-auto" to="/dashboard/profile" end>
                Profile
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<SlNote />}>
              <NavLink className="mt-auto" to="/dashboard/textNote" end>
              Note
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
};

export default Dashbar;