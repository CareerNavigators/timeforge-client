import Video from "./DemoEvent.mp4"
const DemoEvent = () => {

  return (
    <div className="py-20">
      <h1 className="font-extrabold text-[#7c3aed] pb-10 md:py-20 text-center text-4xl md:text-5xl" >
        Easy Event Creation
      </h1>
      <div className="flex px-5 lg:px-0 items-center justify-center">
        <video
        className="border-2 shadow-md border-[#7c3aed] rounded-lg"
        style={{ maxWidth: "100%", width: "1000px" }}
        loop
        controls
        autoPlay
        >
            <source src={Video} type="video/mp4"/>
        </video>
      </div>
    </div>
  );
};

export default DemoEvent;
