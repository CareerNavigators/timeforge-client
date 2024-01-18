import { NavLink } from "react-router-dom";
import Logo from "/logo.png";
import { FaAlignJustify } from "react-icons/fa";
const Navbar = () => {
  // common links
  const links = (
    <>
      <li className='text-sm font-semibold'>
        <NavLink to='/product'>Product</NavLink>
      </li>
      <li className='text-sm font-semibold'>
        <NavLink to='/solutions'>Solutions</NavLink>
      </li>
      <li className='text-sm font-semibold'>
        <NavLink to='/enterprise'>Enterprise</NavLink>
      </li>
      <li className='text-sm font-semibold'>
        <NavLink to='/pricing'>Pricing</NavLink>
      </li>
      <li className='text-sm font-semibold'>
        <NavLink to='/resources'>Resources</NavLink>
      </li>
      <li className='text-xs font-semibold text-white py-2 px-5 bg-gradient-to-r from-[#9181F4] to-[#5038ED] rounded-[4px]'>
        <NavLink to='/myAccount'>My Account</NavLink>
      </li>
    </>
  );
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <img className='h-10' src={Logo} alt='logo' />
            <h3 className='text-[#5E47EF] text-2xl font-bold'>TimeForge</h3>
          </div>

          <div className='md:flex md:items-center md:gap-12'>
            <nav className='hidden md:block'>
              <ul className='flex items-center gap-6 text-sm'>{links}</ul>
            </nav>

            <div className='flex items-center gap-4'>
              <div className='block md:hidden'>
                <button className='rounded bg-[#9181F4] p-2 text-gray-200 transition hover:text-gray-600/75'>
                  <FaAlignJustify></FaAlignJustify>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className='mx-auto max-w-screen-xl text-gray-600'></hr>
    </section>
  );
};

export default Navbar;
