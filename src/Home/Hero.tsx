import image from "../assets/Time management-amico 1.png";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
const Hero = () => {
  return (
    <>
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="font-inter text-[50px] font-[600] ">
            Empowering Your Days
            <br /> with{" "}
            <span className="text-indigo-700">
              <TypeAnimation
                preRenderFirstString={false}
                sequence={[`TimeForge`, 500, ""]}
                speed={10}
                repeat={Infinity}
              ></TypeAnimation>{" "}
            </span>
          </h1>
          <p className="text-[14px] font-[600] text-slate-800 w-[375px] mt-[20px]">
            TimeForge is your scheduling automation platform for eliminating the
            back-and-forth emails to find the perfect time - and so much more.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <button className="px-[10px] py-[5px] rounded-lg flex items-center gap-2 font-inter text-white text-[] bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600">
              <div className="bg-white p-[4px] rounded-md">
                <FcGoogle className="w-[20px] h-[20px]" />
              </div>
              Sign up with Google
            </button>
            <button className="px-[10px] py-[5px] rounded-lg flex items-center gap-2 font-inter text-white text-[] bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600">
              <div className="bg-white p-[4px] rounded-md">
                <MdEmail className="w-[20px] h-[20px] text-indigo-600" />
              </div>
              Sign up with Email
            </button>
          </div>
        </div>
        <img src={image} alt="" />
      </div>
    </>
  );
};

export default Hero;
