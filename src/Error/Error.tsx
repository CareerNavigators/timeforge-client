import ErrorComponent from "./ErrorComponent";
import StarsCanvas from "./StarBackground";
import "./error.css"


const Error = () => {
  return (
    <div className="bg-black">

<section
      className="flex max-w-[1742px] h-screen   flex-col items-center justify-center gap-3 w-full  mx-auto   relative overflow-hidden z-30  bg-cover"
      style={{ transform: "scale(0.9" }}
    >
      <ErrorComponent/>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/video/cards-video.webm"
          />
        </div>
      </div>
      
    </section>
    <StarsCanvas/>
    </div>
  );
};

export default Error;
