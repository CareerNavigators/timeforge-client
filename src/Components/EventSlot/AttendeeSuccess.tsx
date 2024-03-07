import { Link } from "react-router-dom";
import logo from "/logo.png";
import EmailConfirm from "../../assets/Email-Confirmation.png";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const AttendeeSuccess = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="max-w-7xl overflow-hidden mx-auto p-5">
      <div className="flex flex-col py-20 lg:flex-row justify-between items-center">
        <figure className="flex w-96 lg:w-[550px] py-5 justify-center ">
          <img src={EmailConfirm} alt="" />
        </figure>
        <section>
          <h1 className="flex justify-center md:pt-10 pb-5 items-center gap-2 ">
            <img className="w-12" src={logo} alt="logo" />
            <br />{" "}
            <span className="text-[#7c3aed] text-4xl font-bold">TimeForge</span>
          </h1>
          <div className=" min-h-fit text-gray-700 rounded-xl">
            <h1 className="text-center py-2 text-3xl md:text-4xl tracking-wider font-bold">
              Thanks for the reservation
            </h1>

            <h1 className="text-center text-gray-500 text-lg pt-5 tracking-wider font-semibold">
              A confirmation email has been sent to your email address.
            </h1>
          </div>
          <div className="text-center pt-10 flex justify-center">
            <button className="rounded-lg border-2 border-[#7c3aed]  hover:shadow-md hover:shadow-[#5d47ef54] transition-all ease-in-out text-lg font-bold tracking-widest py-2 px-5">
              <Link to="/">Go to Homepage</Link>
            </button>
          </div>
        </section>
      </div>

      <Confetti
        width={width}
        height={height}
        numberOfPieces={100}
      />
    </div>
  );
};

export default AttendeeSuccess;
