import { FaClock, FaMailBulk, FaPhone } from "react-icons/fa";
import CalenderDesign from "./CalenderDesign";
import Logo from "/logo.png";

const EventSlot = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 pt-24 p-5 lg:p-20 min-h-screen">
        <div className="max-w-5xl mx-auto rounded-lg shadow-lg bg-white p-10 lg:p-20 flex gap-10 lg:gap-0 flex-col lg:flex-row justify-between">
          <div className="w-full">
            <div className="flex mb-5 items-center gap-4">
              <img className="h-10" src={Logo} alt="logo" />
              <h3 className="text-[#5E47EF] text-4xl font-bold">TimeForge</h3>
            </div>
            <div className="w-full px-6 py-4">
              <h4 className="text-gray-400 font-medium">Author Name</h4>
              <h2 className="text-3xl font-semibold">Event Name</h2>
              <div className="flex items-center gap-2 text-lg text-gray-400 font-medium mt-5">
                <FaClock></FaClock>
                <h4>Duration min</h4>
              </div>
              <div className="flex items-center gap-2 text-lg text-gray-400 font-medium mt-2">
                <FaPhone></FaPhone>
                <h4>Phone call</h4>
              </div>
              <div className="flex items-center gap-2 text-lg text-gray-400 font-medium mt-2">
                <FaMailBulk></FaMailBulk>
                <h4>Email</h4>
              </div>
            </div>
          </div>
          <section className="w-1/3 shadow-md rounded-lg">
            <CalenderDesign />
          </section>
        </div>
      </div>
    </>
  );
};

export default EventSlot;
