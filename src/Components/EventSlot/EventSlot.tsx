import CalenderDesign from "./CalenderDesign";
import Logo from "/logo.png";

const EventSlot = () => {
  return (
    <>
      <div className="max-w-5xl shadow-md rounded-lg my-20 mx-auto p-20">
        <div className="flex justify-between">
          
          <section className="shadow-md rounded-lg">
            <CalenderDesign />
          </section>
        </div>
      </div>
    </>
  );
};

export default EventSlot;
