/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiHome, FiUnlock, FiUser } from "react-icons/fi";
import { LuEye, LuEyeOff, LuLogIn } from "react-icons/lu";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BackgroundMotion from "../Components/BackgroundMotion/BackgroundMotion";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthContext";

const SignUp = () => {
  const { createUser, setLoading, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement & {
      email: {
        value: string;
      };
      password: {
        value: string;
      };
    };
  }

  const [showPassword, setShowPassword] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(e.target.value.length);
  };
  // handle signUp
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (password === null) {
      toast.error("Please enter your password");
      return;
    }

    const passwordString = password as string;

    if (passwordString.length === 0) {
      toast.error("Password cannot be empty");
      return;
    }

    if (passwordString.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    if (!/[A-Z]/.test(passwordString)) {
      toast.error("Password should contain at least one uppercase letter");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordString)) {
      toast.error("Password should contain at least one special character");
      return;
    }

    try {
      await createUser(email, passwordString);
      navigate(from, {replace: true });
      toast.success("Secure Access, Unlimited Smiles!");
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists. Please try with a new email.");
      }
    }
  };

  // handle google signUp
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
  const sty = `
.smooth-parallax{
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}
`;
  const listVariants = {
    initial: {
      x: -15,
      opacity: 0.5,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5,
        ease: "linear",
      },
    },
  };
  return (
    <motion.div
      variants={listVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center overflow-hidden lg:flex-row lg:h-screen">
      <div className="p-4 lg:w-1/2 lg:p-8 ">
        <Link to="/">
          <FiHome
            className="absolute left-4 top-4 text-[#1C1C1C] text-lg cursor-pointer z-10"
            style={{ pointerEvents: "auto" }}
          />
        </Link>
        <Link
          to="/login"
          className="absolute right-4 top-4 text-[#1C1C1C] text-lg cursor-pointer z-10">
          <LuLogIn />
        </Link>
        <style>{sty}</style>

        <MouseParallaxContainer
          className="smooth-parallax"
          globalFactorX={0.7}
          globalFactorY={0.7}
          resetOnLeave>
          <div className="flex flex-col items-center justify-center mb-6 pt-[72px]">
            <MouseParallaxChild factorX={0.7} factorY={0.8}>
              <img
                className="w-16 mb-7"
                src="./logo.png"
                alt="TimeForge Logo"
              />
            </MouseParallaxChild>
            <h1 className="text-3xl font-bold">REGISTER</h1>
            <p className="text-[#525252] my-2">
              How to get started with TimeForge?
            </p>
          </div>
        </MouseParallaxContainer>
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: "100%" }}>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleLogin}>
            <div className="relative mb-4">
              <FiUser className="absolute left-3 top-[14px] text-[#1C1C1C] text-lg" />
              <input
                autoComplete="off"
                className="bg-[#F0EDFFCC] pl-10 pr-12 py-4 rounded-2xl text-xs text-[#1C1C1C] lg:w-96 outline-[#5E47EF] transition-all duration-300 ease-in"
                type="text"
                placeholder="Username"
                name="username"
              />
            </div>
            <div className="relative mb-4">
              <HiOutlineMail className="absolute left-3 top-[14px] text-[#1C1C1C] text-lg" />
              <input
                autoComplete="off"
                className="bg-[#F0EDFFCC] pl-10 pr-12 py-4 rounded-2xl text-xs text-[#1C1C1C] lg:w-96 outline-[#5E47EF] transition-all duration-300 ease-in"
                type="text"
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="relative">
              <FiUnlock className="absolute left-3 top-[14px] text-[#1C1C1C] text-lg" />
              <input
                className="bg-[#f0edffcc] pl-10 pr-12 py-4 rounded-2xl text-xs text-[#1C1C1C] lg:w-96 outline-[#5E47EF] transition-all duration-300 ease-in"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              {passwordLength > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-[#1C1C1C]">
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-8 py-3 mt-8 font-bold text-white transition-transform transform rounded-md bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:scale-110">
              Signup Now
            </button>
          </form>
        </motion.div>
        <div className="flex flex-col items-center justify-center gap-3 my-8 lg:flex-row lg:justify-center">
          <hr className="w-24 h-[1px] bg-[#F0EDFF]" />
          <p className="text-[#525252]">or continue with</p>
          <hr className="w-24 h-[1px] bg-[#F0EDFF]" />
        </div>
        <div className="flex items-center justify-center">
          <div
            onClick={handleGoogle}
            className="flex items-center justify-center gap-2 p-4 transition duration-300 ease-in-out transform bg-white border cursor-pointer select-none rounded-2xl md:w-96 hover:scale-105 hover:shadow-lg">
            <FcGoogle className="w-8 h-8" />
            <p className="text-[#1C1C1C]">
              Sign up with <span className="font-bold">Google</span>
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-screen h-screen lg:w-1/2">
        <div className="absolute inset-0 overflow-hidden">
          <BackgroundMotion />
        </div>
        <div className="relative z-10 w-1/2 overflow-hidden">
          <img
            src="./Clock.png"
            alt="Clock Image"
            className="block mx-auto pointer-events-auto"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
