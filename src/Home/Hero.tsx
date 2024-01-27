/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import image from "../assets/Time management-amico 1.png";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Hero = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleGoogle = () => {
    googleSignIn()
      .then(() => {
        toast.success("Secure Access, Unlimited Smiles!");
        navigate(from, { replace: true });
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="flex flex-col-reverse lg:h-screen mt-0 lg:pb-0 lg:flex-row items-center lg:justify-between ">
        <div>
          <h1 className="font-inter text-[30px] lg:text-[50px] font-[600] ">
            Empowering Your Days
            <br /> with{" "}
            <span className="text-dt">
              <TypeAnimation
                preRenderFirstString={false}
                sequence={[`TimeForge`, 500, ""]}
                speed={10}
                repeat={Infinity}></TypeAnimation>{" "}
            </span>
          </h1>
          <p className=" dark:text-dg text-[14px] font-[600] text-slate-800 w-[375px] mt-[20px]">
            TimeForge is your scheduling automation platform for eliminating the
            back-and-forth emails to find the perfect time - and so much more.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-4 mt-5">
            <button
              onClick={handleGoogle}
              className="px-[5px] py-[5px] rounded-lg flex items-center gap-2 font-inter text-white text-[] bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out">
              <div className="bg-white p-[4px] rounded-md">
                <FcGoogle className="w-[20px] h-[20px]" />
              </div>
              <p className="pr-1">Sign up with Google</p>
            </button>
            <Link
              to={"/signup"}
              className="px-[5px] py-[5px] rounded-lg flex items-center gap-2 font-inter text-white text-[] bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out">
              <div className="bg-white p-[4px] rounded-md">
                <MdEmail className="w-[20px] h-[20px] text-indigo-600" />
              </div>
              <p className="pr-1">Sign up with Email</p>
            </Link>
          </div>
        </div>
        <img src={image} alt="" />
      </div>
    </>
  );
};

export default Hero;
