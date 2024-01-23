import CalenderDesign from "./CalenderDesign";
import Logo from "/logo.png";

const EventSlot = () => {
  return (
    <>
      <div className="max-w-5xl shadow-md rounded-lg my-20 mx-auto p-20">
        <div className="flex justify-between">
          <div>
            <div className="flex mb-5 items-center gap-4">
              <img className="h-10" src={Logo} alt="logo" />
              <h3 className="text-[#5E47EF] text-4xl font-bold">TimeForge</h3>
            </div>
            <section>
                <h1 className="text-3xl py-5 font-bold">Event Name</h1>
                <h1 className="text-xl py-2 text-gray-500 font-bold">Deadline</h1>
                <h1 className="text-xl py-2 text-gray-500 font-bold">Event Details</h1>
            </section>
          </div>
          <section className="shadow-md rounded-lg">
            <CalenderDesign />
          </section>
        </div>
      </div>
    </>
  );
};

export default EventSlot;
