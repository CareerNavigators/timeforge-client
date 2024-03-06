import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  
} from "./utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import "./error.css"
import {  useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
const ErrorComponent = () => {
   const navigate = useNavigate();
    const handleHome = ()=>{
      navigate(-1);
    }
    return (
        <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
      >
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
         
  
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-3 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          >
            <span>
              404
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                {" "}
                ERROR{" "}
              </span>
            </span>
          </motion.div>
  
          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-lg text-gray-400 my-2 max-w-[600px]"
          >
           Something is going on in the Universe...<br/>
It seems like we’re having some difficulties; please don’t abandon ship, we’re sending for help.
          </motion.p>


          
          <motion.div
          variants={ slideInFromLeft(1)}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          
         <button onClick={handleHome} className="flex z-50 ">
         <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5 " />
         
         <h1  className="Welcome-text text-[13px] px-1 py-1">
           Back To Home
         </h1>
         </button>
          
        </motion.div>
        
        
        


        </div>
  
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full h-full flex justify-center items-center"
        >
          <img
            src="/public/images/astronut.png"
            alt="work icons"
            height={450}
            width={450}
          />
        </motion.div>
      </motion.div>
    );
};

export default ErrorComponent;