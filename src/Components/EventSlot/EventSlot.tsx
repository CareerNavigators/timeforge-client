import { FaClock, FaMailBulk, FaPhone } from "react-icons/fa";
import Logo from "/logo.png";
import CalendarPage from "../../CreateEvents/Events/CalendarPage";

const EventSlot = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 pt-24 p-5 lg:p-20 min-h-screen">
        <div className="lg:max-w-6xl mx-auto rounded-lg shadow-lg bg-white p-10 flex gap-10 lg:gap-0 flex-col lg:flex-row items-center lg:items-start justify-between">
          <div className="w-full">
            <div className="flex mb-5 items-center gap-4">
              <img className="h-10" src={Logo} alt="logo" />
              <h3 className="text-[#5E47EF] text-4xl font-bold">TimeForge</h3>
            </div>
            <div className="w-full py-4">
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
          <section className="w-2/3 my-20 shadow-md rounded-lg">
            <CalendarPage
              selectedTimes={{}}
              onSelectTime={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></CalendarPage>
          </section>
        </div>
      </div>
    </>
  );
};

export default EventSlot;
