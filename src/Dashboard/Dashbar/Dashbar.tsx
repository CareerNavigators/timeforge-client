import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PlusOutlined,
  ScheduleOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { FaUsers } from "react-icons/fa";
import { Layout, Menu, Button, theme, Tooltip } from "antd";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../Provider/AuthContext";
import { SlNote } from "react-icons/sl";
import DarkModeToggle from "../../Components/DarkModeToggle/DarkModeToggle";

const { Header, Sider } = Layout;
const Dashbar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { userData, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then((result: any) => {
        console.log(result.user);
      })
      .catch((err: any) => {
        console.log(err.message);
      });
    navigate("/login");
  };

  // const handleLogOut = async () => {
  //   const shouldLogOut = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "Logging out will end your session. Please ensure all your scheduled meetings are saved.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, log out",
  //     customClass: {
  //       popup: "dark:bg-d2 dark:text-dw",
  //     },
  //   }).then((result) => result.isConfirmed);

  //   if (shouldLogOut) {
  //     logOut();
  //     showToast("success", "Signed in successfully");
  //   }
  // };
  // const handleLogin = () => {
  //   navigate("/login");
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
            <Tooltip
              placement={`${collapsed ? "left" : "top"}`}
              title={"Profile"}
              arrow={true}
            >
              <div>
                <img
                  className="w-[50px] h-[50px] flex justify-center items-center mt-[80px] mx-auto rounded-lg object-cover object-top"
                  src={userData?.img_profile}
                  alt="Logo"
                />
              </div>
            </Tooltip>
          </Link>
          <Menu
            theme="dark"
            className="relative px-1 py-5 font-bold lg:w-full font-inter"
            defaultSelectedKeys={["1"]}
          >
            <>
              <div className="flex mt-5 mb-5">
                <div className="flex-1 border-gray-800 rounded border"></div>
                <div className="flex-1 text-center font-normal">User </div>
                <div className="flex-1 border-gray-800 rounded border"></div>
              </div>
              <Menu.Item icon={<PlusOutlined />}>
                <NavLink to="/dashboard/createEvent" end>
                  Create
                </NavLink>
              </Menu.Item>
              <Menu.Item icon={<ScheduleOutlined />}>
                <NavLink to="/dashboard/userEvent" end>
                  All Events
                </NavLink>
              </Menu.Item>
              <Menu.Item icon={<SlNote />}>
                <NavLink className="mt-auto" to="/dashboard/textNote" end>
                  Note
                </NavLink>
              </Menu.Item>
              <Menu.Item icon={<HomeOutlined />}>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </Menu.Item>
            </>

            {userData?.role === "Admin" && (
              <>
                <div className="flex pt-[20px] pb-[15px]">
                  <div className="flex-1 border-gray-800 rounded border"></div>
                  <div className="flex-1 text-center font-normal">Admin</div>
                  <div className="flex-1 border-gray-800 rounded border"></div>
                </div>
                <Menu.Item icon={<FaUsers />}>
                  <NavLink to="/dashboard/alluser" end>
                    All users
                  </NavLink>
                </Menu.Item>
                <Menu.Item icon={<ScheduleOutlined />}>
                  <NavLink to="/dashboard/allevents" end>
                    All Events
                  </NavLink>
                </Menu.Item>
                <Menu.Item icon={<BsCalendar2Event />}>
                  <NavLink to="/dashboard/allattendee" end>
                    All Attendees
                  </NavLink>
                </Menu.Item>
                <Menu.Item icon={<FaTimeline />}>
                  <NavLink to="/dashboard/alltimeline" end>
                    All Timeline
                  </NavLink>
                </Menu.Item>
                <Menu.Item icon={ <ShopOutlined/>}>
                  <NavLink to="/dashboard/allecommerce" end>
                    All E-Commerce
                  </NavLink>
                </Menu.Item>

                <Tooltip
                  placement={`${collapsed ? "left" : "top"}`}
                  title={"Theme"}
                  arrow={true}
                >
                  <div className=" mt-[50px] text-[30px] mx-auto flex justify-center items-center text-white">
                    <DarkModeToggle />
                  </div>
                </Tooltip>

                <Tooltip
                  placement={`${collapsed ? "left" : "top"}`}
                  title={"logout"}
                  arrow={true}
                >
                  <div className=" mt-[50px] mx-auto flex justify-center items-center">
                    {userData ? (
                      <button
                        onClick={handleLogOut}
                        className=" text-red-500 text-[20px] "
                      >
                        <LogoutOutlined />
                      </button>
                    ) : (
                      <button
                        // onClick={handleLogin}
                        className=" text-green-500 text-[30px] "
                      >
                        <LoginOutlined />
                      </button>
                    )}
                  </div>
                </Tooltip>
              </>
            )}
          </Menu>
          {userData?.role === "User" && (
            <>
              <Tooltip
                placement={`${collapsed ? "left" : "top"}`}
                title={"Theme"}
                arrow={true}
              >
                <div className=" mt-[280px] text-[30px] mx-auto flex justify-center items-center text-white">
                  <DarkModeToggle />
                </div>
              </Tooltip>

              <Tooltip
                placement={`${collapsed ? "left" : "top"}`}
                title={"logout"}
                arrow={true}
              >
                <div className=" mt-[50px] mx-auto flex justify-center items-center">
                  {userData ? (
                    <button
                      onClick={handleLogOut}
                      className=" text-red-500 text-[20px] "
                    >
                      <LogoutOutlined />
                    </button>
                  ) : (
                    <button
                      // onClick={handleLogin}
                      className=" text-green-500 text-[30px] "
                    >
                      <LoginOutlined />
                    </button>
                  )}
                </div>
              </Tooltip>
            </>
          )}
        </Sider>
      </Layout>
    </div>
  );
};

export default Dashbar;
