import Logo from "@kamiru/superlogo";
import { Link } from "react-router-dom";
export default function Footer() {
  const scrollToSection = () => {
    const section = document.getElementById("take-a-look");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  const handlePartners = () => {
    const section = document.getElementById("partners");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="bg-gray-100 select-none dark:bg-d1">
      <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:pt-24 dark:text-dw">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <button
            onClick={scrollToSection}
            className="inline-block p-2 text-white transition rounded-full shadow bg-dt sm:p-3 lg:p-4 ">
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="white">
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between ">
          <div>
            <div className="flex justify-center text-teal-600 lg:justify-start">
              <Logo
                images={[
                  "/ColorLogos/Vector.svg",
                  "/ColorLogos/Vector (1).svg",
                  "/ColorLogos/Vector (2).svg",
                  "/ColorLogos/Vector (3).svg",
                  "/ColorLogos/Vector (4).svg",
                ]}
                width={"100px"}
              />
            </div>

            <p className="max-w-md mx-auto mt-48 leading-relaxed text-center text-gray-500 lg:text-left lg:mt-48 dark:text-dw">
              Your ultimate scheduling automation solution, streamlining
              communication and eliminating the hassle of back-and-forth emails
              to find the perfect timing, and beyond
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-6 mt-12 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <Link
                to={"/aboutUs"}
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-dw">
                {" "}
                About Us{" "}
              </Link>
            </li>

            <li>
              <Link
                to={"/pricing "}
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-dw">
                {" "}
                Services{" "}
              </Link>
            </li>

            <li>
              <Link
                to={"https://discord.gg/VpCuU5zAfm"}
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-dw">
                Conduct us
              </Link>
            </li>

            <li>
              <button
                onClick={handlePartners}
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-dw">
                Business Partners
              </button>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-sm text-center text-gray-500 lg:text-right dark:text-dg">
          Copyright &copy; 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
