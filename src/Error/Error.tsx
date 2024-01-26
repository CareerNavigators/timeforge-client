import Lottie from "lottie-react";
import error from "../assets/Animation - 1706198044117.json";
import back from "../assets/go back.json";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="flex flex-col lg:flex-col justify-center items-center mx-auto h-screen lg:h-[80%]">
      <div className="w-[70%] mx-auto ">
        <Lottie animationData={error}></Lottie>
      </div>
      <div className="flex justify-center items-center mx-auto text-[20px] font-bold font-mono">
        <button className="flex primary ">
          <Link to="/">
            <Lottie animationData={back}></Lottie> Go back{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Error;
