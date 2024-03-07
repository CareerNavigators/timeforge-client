import { useRef, useEffect } from "react";
import Video from "./DemoEvent.mp4";

const DemoEvent = () => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handlePlay = () => {
        video.play().catch((error) => {
          console.error('Auto-play prevented:', error);
        });
      };
      video.addEventListener('click', handlePlay);
      return () => {
        video.removeEventListener('click', handlePlay);
      };
    }
  }, [videoRef]);

  return (
    <div className="pb-20">
      <h1 className="font-extrabold text-[#7c3aed] pb-10 md:py-20 text-center text-4xl md:text-5xl">
        Easy Event Creation
      </h1>
      <div className="flex px-5 lg:px-0 items-center justify-center">
        <video
          ref={videoRef}
          className="videoDemo border-2 shadow-md border-[#7c3aed] rounded-lg"
          style={{ maxWidth: "100%", width: "1000px" }}
          autoPlay
          muted
          playsInline
          loop
          controls={false}
        >
          <source src={Video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default DemoEvent;
