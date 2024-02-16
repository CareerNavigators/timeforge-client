import React, { useContext } from "react";
import { useMotionValue, motion, useTransform } from "framer-motion";
import { LogoutOutlined, MoreOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import "react-tiny-fab/dist/styles.css";
import "./MStyle.css";
// interface style{
//   style:any;
// }
import {
  HomeOutlined,
  PlusOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthContext";
import { Link } from "react-router-dom";
import { SlNote } from "react-icons/sl";
import DarkModeToggle from "../../Components/DarkModeToggle/DarkModeToggle";
const MobileDashboard: React.FC = () => {
  // const [click, setClick] = useState(true);
  // const handleClick=()=>{
  //   setClick(false)
  // }
  const navigate = useNavigate();
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  return (
    <div className="">
      <motion.div
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.18}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
        className="cursor-grab"
      >
        <ul className="my-2 flex py-[15px] mb-0 mr-0 m-auto justify-center items-center bg-black text-white w-full object-contain gap-[50px] lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 shadow-inner shadow-indigo-600 ">
          <li className="p-1 font-medium">
            <NavLink
              draggable={false}
              to="/dashboard"
              className="flex items-center transition-colors hover:text-blue-500"
            >
              {" "}
              <motion.div
                style={{ x, y, rotateX, rotateY, z: 10000 }}
                drag
                dragElastic={0.18}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                whileTap={{ cursor: "grabbing" }}
                className="cursor-grab"
              >
                <img
                  className="w-[30px] h-[30px] rounded-lg object-cover object-top"
                  draggable={false}
                  src={userData?.img_profile}
                />
              </motion.div>
            </NavLink>
          </li>
          <li className="p-1 font-medium">
            <NavLink
              draggable={false}
              to="/dashboard/createEvent"
              className="flex items-center transition-colors hover:text-blue-500"
            >
              <PlusOutlined className="text-[28px] " />
            </NavLink>
          </li>
          <li className="p-1 font-medium">
            <NavLink
              draggable={false}
              to="/dashboard/allEvents"
              className="flex items-center transition-colors hover:text-blue-500"
            >
              <ScheduleOutlined className="text-[28px] " />
            </NavLink>
          </li>
          <li className="p-1 font-medium">
            <NavLink
              draggable={false}
              to="/"
              className="flex items-center hover:text-blue-500 transition-colors w-[25px] h-[25px]"
            >
              <HomeOutlined className="text-[28px] " />
            </NavLink>
          </li>
          <li className="p-1 font-medium">
            <FloatButton.Group
              trigger="click"
              type="primary"
              className=" "
              style={{ right: 24, bottom: 14, fontWeight: "20px" }}
              icon={ <div className="font-bold"><MoreOutlined /></div>}
            > 

<FloatButton
                type="primary"
                icon={<div className="w-[100%] h-full flex justify-center items-center text-black"><DarkModeToggle/></div>}
                // style={{
                //   background: "black",
                //   display: "flex",
                //   justifyContent: "center",
                // }}
                // onClick={handleClick}
               
                
              />
              <FloatButton
                type="primary"
                onClick={handleLogOut}
                icon={<div className="w-[100%] h-full flex justify-center items-center text-black"><LogoutOutlined /></div>}
                // style={{
                //   background: "black",
                //   display: "flex",
                //   justifyContent: "center",
                // }}
                // onClick={handleClick}
               
                
              />
              <Link to="/dashboard/textNote">
                {" "}
                <FloatButton icon={<div className="w-[100%] h-full flex justify-center items-center text-black"> <SlNote /></div>} />
              </Link>
              {/* <FloatButton  /> */}
            </FloatButton.Group>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default MobileDashboard;
