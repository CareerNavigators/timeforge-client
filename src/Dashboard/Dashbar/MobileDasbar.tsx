import React from "react";
import { useMotionValue, motion, useTransform } from "framer-motion";
import {
  HomeOutlined,
  PlusOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Logo from "/logo.png";
import { BsPassportFill } from "react-icons/bs";
const MobileDasbar: React.FC = () => {
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
        className="cursor-grab">
        <ul className="my-2 flex py-[15px] mb-0 mr-0 m-auto justify-center items-center bg-black text-white w-full object-contain gap-[50px] lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 shadow-inner shadow-indigo-600 ">
          <li className="p-1 font-medium">
            <NavLink
              to="/dashboard"
              className="flex items-center transition-colors hover:text-blue-500">
              {" "}
              <motion.div
                style={{ x, y, rotateX, rotateY, z: 10000 }}
                drag
                dragElastic={0.18}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                whileTap={{ cursor: "grabbing" }}
                className="cursor-grab">
                <img className="w-[30px] h-[30px] " src={Logo} />
              </motion.div>
            </NavLink>
          </li>
          <li className="p-1 font-medium">
            <NavLink
              to="/dashboard/createEvent"
              className="flex items-center transition-colors hover:text-blue-500">
              <PlusOutlined className="text-[28px] " />
            </NavLink>
          </li>
          <li className="p-1 font-medium">
            <NavLink
              to="/dashboard/allEvents"
              className="flex items-center transition-colors hover:text-blue-500">
              <ScheduleOutlined className="text-[28px] " />
            </NavLink>
          </li>
          <li className="p-1 font-medium">
            <NavLink
              to="/"
              className="flex items-center hover:text-blue-500 transition-colors w-[25px] h-[25px]">
              <HomeOutlined className="text-[28px] " />
            </NavLink>
          </li>
          
          <li className="p-1 font-medium">
            <NavLink
              to="/dashboard/profile"
              className="flex items-center hover:text-blue-500 transition-colors w-[25px] h-[25px]">
              <BsPassportFill className="text-[28px] " />
            </NavLink>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default MobileDasbar;
