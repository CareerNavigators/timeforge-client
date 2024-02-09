/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";
import { CiPower } from "react-icons/ci";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import showToast from "../../Hook/swalToast";
export default function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const { logOut, userData } = useContext(AuthContext);
  if (!userData) {
    return null;
  }
  const handleLogOut = async () => {
    const shouldLogOut = await Swal.fire({
      title: "Are you sure?",
      text: "Logging out will end your session. Please ensure all your scheduled meetings are saved.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
      customClass: {
        popup: "dark:bg-d2 dark:text-dw",
      },
    }).then((result) => result.isConfirmed);

    if (shouldLogOut) {
      logOut();
      showToast("success", "Signed in successfully");
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto border-none"
          placeholder={undefined}>
          <div className="w-11">
            <img
              alt={`${userData?.name}'s Picture`}
              className=" border-d border-2 dark:border-dw p-0.5 rounded-full w-full object-fill"
              src={userData?.img_profile}
            />
          </div>
          <FaAngleDown
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 border-none dark:bg-d2" placeholder={undefined}>
        <Link to={"dashboard"}>
          <div
            onClick={closeMenu}
            className="flex items-center gap-2 px-3 py-1 border-none rounded dark:text-dw hover:dark:bg-d1 hover:bg-[#f0f2f4]">
            <RxDashboard className="w-4 h-4" />
            <Typography className="font-normal" placeholder={undefined}>
              Dashboard
            </Typography>
          </div>
        </Link>
        
        <div className="cursor-pointer" onClick={handleLogOut}>
          <div
            onClick={closeMenu}
            className="flex items-center gap-2 px-3 py-1 text-red-500 border-none rounded dark:text-dw hover:bg-red-500/10 dark:hover:bg-red-500/40">
            <CiPower className="w-4 h-4" />
            <Typography className="font-normal" placeholder={undefined}>
              Sign Out
            </Typography>
          </div>
        </div>
      </MenuList>
    </Menu>
  );
}
