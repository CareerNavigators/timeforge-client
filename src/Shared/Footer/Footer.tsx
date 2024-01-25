import {
  FaChevronDown,
  FaFacebook,
  FaGlobe,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const links = (
    <>
      <li className='text-sm font-medium'>Privacy</li>
      <li className='text-sm font-medium'>Terms and Conditions</li>
      <li className='text-sm font-medium'>Status</li>
      <li className='text-sm font-medium'>Security</li>
      <li className='text-sm font-medium'>Cookie Settings</li>
      <li className='text-sm font-medium'>Your Privacy Choices</li>
    </>
  );
  return (
    <footer className='bg-white'>
      <hr className='max-w-screen-xl mx-auto text-gray-600'></hr>
      <div className='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8'>
        <div className='sm:flex sm:justify-between'>
          <div>
            <div className='flex items-center justify-center gap-2 sm:justify-start'>
              <FaGlobe></FaGlobe>
              <h3 className='text-base font-semibold'>English</h3>
              <FaChevronDown></FaChevronDown>
            </div>
          </div>
          <ul className='flex flex-wrap-reverse items-center justify-center gap-3 md:flex-row'>
            {links}
          </ul>
          <div className='flex items-center justify-center gap-3 mt-4 text-2xl text-center lg:mt-0 lg:text-right'>
            <FaFacebook></FaFacebook>
            <FaInstagram></FaInstagram>
          </div>
        </div>
        <h2 className='mt-2 text-sm text-center text-gray-500 md:text-start'>
          Copyright TimeForge 2024
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
