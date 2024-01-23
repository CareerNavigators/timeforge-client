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
            <section>
                <h1 className="text-3xl py-5 font-bold">Event Name</h1>
                <h1 className="text-xl py-2 text-gray-500 font-bold">Deadline</h1>
                <h1 className="text-xl py-2 text-gray-500 ">Event Details</h1>
            </section>
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
