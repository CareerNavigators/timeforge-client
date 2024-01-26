import React, { useContext, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const variants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const AvatarMenu: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logOut, user } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
    toast.success("Logged Out Successfully");
  };

  const handleClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  if (!user) {
    return null;
  }
  return (
     <div className="relative">
      <motion.div
        onClick={handleClick}
        variants={variants}
        whileHover="hover"
        initial="initial">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <img
            className="object-cover w-full h-full cursor-pointer"
            src={user?.photoURL}
            alt="Avatar"
          />
        </div>
      </motion.div>

      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-md w-80 dark:bg-d1 dark:text-dt dark:border-none tin">
          <div className="flex flex-col justify-center gap-4 p-4">
            <Link
              to="/profile"
              className="flex items-center text-blue-500 hover:text-blue-700">
              <FaUser className="mr-2" />
              Profile
            </Link>
            <button
              onClick={handleLogOut}
              className="flex items-center px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 dark:bg-red-900">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AvatarMenu;
