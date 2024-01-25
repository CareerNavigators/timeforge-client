import { NavLink } from "react-router-dom";
import Logo from "/logo.png";
import { FaAlignJustify } from "react-icons/fa";
import type { DrawerProps } from "antd";
import { Drawer } from "antd";
import { useState } from "react";
import DarkModeToggle from "../../Components/DarkModeToggle/DarkModeToggle";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps["placement"]>("bottom");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // common links
  const links = (
    <>
      <li className="text-sm font-semibold hover:text-dt">
        <NavLink to="/createEvent">Create new Event</NavLink>
      </li>
      <li className="text-sm font-semibold">
        <NavLink to="/allEvents">All Events</NavLink>
      </li>
      <li className="text-sm font-semibold hover:text-dt">
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li className="text-sm font-semibold hover:text-dt">
        <NavLink to="/resources">Resources</NavLink>
      </li>
      <li className="text-xs font-semibold py-2 px-5 border hover:text-white hover:transition-all hover:bg-gradient-to-r from-[#9181F4] to-[#5038ED] rounded-[4px] duration-300">
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className="text-xs font-semibold text-white py-2 px-5 border bg-gradient-to-r from-[#9181F4] to-[#5038ED] rounded-[4px] cursor-pointer ">
        <NavLink to="/signup">Register</NavLink>
      </li>
    </>
  );
  return (
    <section className="bg-white dark:bg-d1 tin">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row items-center gap-2">
            <img className="h-10" src={Logo} alt="logo" />
            <h3 className="text-[#5E47EF] text-2xl font-bold">TimeForge</h3>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-4 text-sm">
                {links} <DarkModeToggle />
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <button
                  onClick={showDrawer}
                  className="rounded bg-[#9181F4] p-2 text-gray-200 transition hover:text-gray-600/75">
                  <FaAlignJustify></FaAlignJustify>
                </button>
                <Drawer
                  className="dark:bg-d1 dark:text-dw"
                  height={115}
                  placement={placement}
                  closable={false}
                  onClose={onClose}
                  open={open}
                  key={placement}>
                  <ul className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    {links} <DarkModeToggle />
                  </ul>
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="max-w-screen-xl mx-auto text-gray-600 dark:hidden"></hr>
    </section>
  );
};

export default Navbar;
