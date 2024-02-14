/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import image from "../assets/Time management-amico 1.png";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../Provider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosSecure from "../Hook/useAxios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import showToast from "../Hook/swalToast";
import { PlusCircleOutlined } from "@ant-design/icons";
dayjs.extend(utc);
dayjs.extend(timezone);
const Hero = () => {
  const { setUserData, googleSignIn, loading, userData } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const caxios = AxiosSecure();
  const [timezone, setTimezone] = useState("");
  useEffect(() => {
    setTimezone(dayjs.tz.guess());
  }, []);
  const handleGoogle = async () => {
    try {
      await googleSignIn().then((res: any) => {
        const userData = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          timeZone: timezone,
          img_profile: res?.user?.photoURL,
        };
        caxios.post("/user", userData).then((res) => {
          setUserData(res.data);
        });
      });
      showToast("success", "Secure Access, Unlimited Smiles!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col-reverse items-center mt-0 lg:h-screen lg:pb-0 lg:flex-row lg:justify-between ">
        <div>
          <h1 className="font-inter text-[30px] lg:text-[50px] font-[600] ">
            Empowering Your Days
            <br /> with{" "}
            <span className="text-[#7c3aed]">
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
          {loading ? (
            ""
          ) : userData === null ? (
            <div className="flex flex-col items-center gap-4 mt-5 lg:flex-row">
              <button
                onClick={handleGoogle}
                className="px-[5px] py-[5px] rounded-lg border-[1px] border-[#7c3aed] dark:border-none flex items-center gap-2 font-inter text-white bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out">
                <div className="bg-white p-[4px] rounded-md">
                  <FcGoogle className="w-[20px] h-[20px]" />
                </div>
                <p className="pr-1 text-black dark:text-white">
                  Sign up with Google
                </p>
              </button>
              <Link
                to={"/signup"}
                className="px-[5px] py-[5px] rounded-lg border-[1px] border-[#7c3aed] dark:border-none flex items-center gap-2 font-inter text-white bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out">
                <div className="bg-white p-[4px] rounded-md">
                  <MdEmail className="w-[20px] h-[20px] text-[#5038ED]" />
                </div>
                <p className="pr-1 text-black dark:text-white">
                  Sign up with Email
                </p>
              </Link>
            </div>
          ) : (
            <Link
              to={"/createEvent"}
              className="w-fit px-[5px] py-[5px] mt-5 rounded-lg border-2 border-[#7c3aed] flex items-center gap-2 font-inter text-white bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 hover:shadow-md hover:shadow-[#5d47ef54] transition-all ease-in-out">
              <div className="p-[4px]">
                <PlusCircleOutlined className="text-[#7c3aed]" />
              </div>
              <p className="pr-1 font-semibold text-black dark:text-white">
                Create Event
              </p>
            </Link>
          )}
        </div>
        <img src={image} alt="" />
      </div>
    </>
  );
};

export default Hero;
