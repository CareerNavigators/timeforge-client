import { FaFacebook, FaGlobe, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = (
    <>
      <Link to="/privacy">
        <li className="text-sm font-medium">Privacy</li>
      </Link>
      <Link to="/termsAndConditions">
        <li className="text-sm font-medium">Terms and Conditions</li>
      </Link>
      <Link to="/status">
        <li className="text-sm font-medium">Status</li>
      </Link>
      <Link to="/security">
        <li className="text-sm font-medium">Security</li>
      </Link>
      <Link to="/cookieSettings">
        <li className="text-sm font-medium">Cookie Settings</li>
      </Link>
      <Link to="/yourPrivacyChoices">
        <li className="text-sm font-medium">Your Privacy Choices</li>
      </Link>
    </>
  );
  return (
    <footer className="bg-white dark:bg-d1">
      <hr className="mx-auto max-w-screen-xl text-gray-600"></hr>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:justify-between">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <FaGlobe></FaGlobe>
              <h3 className="font-semibold text-base">English</h3>
              {/* <FaChevronDown></FaChevronDown> */}
            </div>
          </div>
          <ul className="flex flex-wrap-reverse md:flex-row items-center justify-center gap-3">
            {links}
          </ul>
          <div className="flex items-center justify-center gap-3 mt-4 text-center text-2xl lg:mt-0 lg:text-right">
            <Link to="/facebook.com">
              <FaFacebook></FaFacebook>
            </Link>
            <Link to="/instagram.com">
              <FaInstagram></FaInstagram>
            </Link>
          </div>
        </div>
        <h2 className="text-gray-500 text-center md:text-start text-sm mt-2">
          Copyright TimeForge 2024
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
