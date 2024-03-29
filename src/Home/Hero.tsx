/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import useAuthorization from "../Components/GoogleCalendar/useAuthorization";
import Aos from "aos";
import 'aos/dist/aos.css'
import "./style.css";
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
  const authorization = useAuthorization();
  function calAuthHandeler(id:string) {
    Swal.fire({
      title: "Google Calendar Integration",
      text: "Do you want to connect with google calendar?",
      icon: "question",
      confirmButtonText: "Yes",
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        authorization.mutate(id);
      }
    })
  }
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
          if(!res.data.isRefreshToken) {
            calAuthHandeler(res.data._id)
          }
        });
      });
      showToast("success", "Secure Access, Unlimited Smiles!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Aos.init();
}, [])

  
  return (
    <>
      <div className="timeIllustration flex flex-col-reverse mx-auto mt-0  lg:flex-col lg:min-h-screen">
        <div data-aos="fade-down" data-aos-easing="ease-in" data-aos-duration="1000" className="flex flex-col py-5 md:pt-10 lg:pt-20 lg:py-10 items-center lg:justify-center">
          <section className="font-inter text-center font-[600] ">
            <h1 className="tracking-wide md:font-bold lg:font-semibold py-4 lg:pb-12 text-3xl md:text-4xl lg:text-6xl">
              Empowering Your Days
            </h1>
            <h3 className="text-2xl lg:text-4xl ">
              {" "}
              with{" "}
              <span className=" text-[#7c3aed]">
                <TypeAnimation
                  preRenderFirstString={false}
                  sequence={[`TimeForge`, 500, ""]}
                  speed={10}
                  repeat={Infinity}
                ></TypeAnimation>{" "}
              </span>
            </h3>
          </section>
          <section className="flex flex-col justify-center pb-60 md:pb-60 lg:pb-0">
            <p className="text-center dark:text-dg tracking-wide text-xs md:text-base lg:text-xl font-medium text-slate-800 w-[300px] md:w-[400px] lg:w-[500px] lg:mt-10 my-5">
              TimeForge is your scheduling automation platform for eliminating
              the back-and-forth emails to find the perfect time - and so much
              more.
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center">
              {loading ? (
                ""
              ) : userData === null ? (
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-xs lg:text-lg font-medium lg:pt-0">
                  <button
                    onClick={handleGoogle}
                    className="md:p-2 rounded-lg border-[1px] border-[#7c3aed] dark:border-none flex items-center gap-1 md:gap-2 font-inter text-white bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out"
                  >
                    <div className="bg-white p-[4px] rounded-md">
                      <FcGoogle className="w-[20px] h-[20px]" />
                    </div>
                    <p className="pr-1 text-black dark:text-white">
                      Sign up with Google
                    </p>
                  </button>
                  <Link
                    to={"/signup"}
                    className="md:p-2 rounded-lg border-[1px] border-[#7c3aed] dark:border-none flex items-center gap-1 md:gap-2 font-inter text-white bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out"
                  >
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
                  to={"/dashboard/createEvent"}
                  className="flex items-center w-fit lg:mx-0 mx-auto md:p-2 rounded-lg border-2 border-[#7c3aed]  gap-1 md:gap-2 font-inter text-white bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600 hover:shadow-md hover:shadow-[#5d47ef54] transition-all ease-in-out"
                >
                  <div className="p-[4px]">
                    <PlusCircleOutlined className="text-[#7c3aed]" />
                  </div>
                  <p className="pr-1 font-semibold text-black dark:text-white">
                    Create Event
                  </p>
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Hero;
