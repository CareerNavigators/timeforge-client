import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
import sakib from "../assets/TeamImages/Sakib.jpg"
import hridoy from "../assets/TeamImages/Hridoy.jpg"
import huzaifa from "../assets/TeamImages/huzaifa.jpg"
import rohan from "../assets/TeamImages/Rohan.png"
import shabbir from "../assets/TeamImages/Shabbir.png"
import tanzil from "../assets/TeamImages/Tanzil.png"

const AboutUs: React.FC = () => {
  return (
    <section className='max-w-screen-xl mx-auto'>
      <div className='space-y-4 mt-10 px-2'>
        <h3 className='text-[#5038ED] text-2xl font-bold text-center sm:text-5xl'>
          Time Forge Team Members
        </h3>
        <p className='max-w-2xl mx-auto text-center text-gray-500'>
          Meet our dynamic team of six hardworking and enthusiastic web
          developers. We approach coding with meticulous precision, turning
          complexity into seamless digital art.
        </p>
      </div>
      <section className='text-gray-800'>
        <div className='container flex flex-col items-center justify-center p-4 mx-auto sm:p-10'>
          <div className='flex flex-row flex-wrap justify-center mt-8'>
            {/* Huzaifa */}
            <div className='flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gradient-to-r from-[#9181F4] to-[#5038ED] text-gray-100'>
              <img
                alt='huzaifa-img'
                className='self-center flex-shrink-0 object-cover w-24 h-24 -mt-12 bg-gray-500 bg-center bg-cover rounded-full'
                src={huzaifa}
              />
              <div className='flex-1 my-4'>
                <p className='text-xl font-semibold'>
                  MD. Huzaifa
                </p>
                <p>Web Developer</p>
              </div>
              <div className='flex items-center justify-center p-3 space-x-3 border-t-2'>
                <a
                  title='Email'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaMailBulk></FaMailBulk>
                </a>
                <a
                  title='Linkedin'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaLinkedin></FaLinkedin>
                </a>
                <a
                  title='Github'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaGithub></FaGithub>
                </a>
              </div>
            </div>

            {/* Rohan */}
            <div className='flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gradient-to-r from-[#9181F4] to-[#5038ED] text-gray-100'>
              <img
                alt='huzaifa-img'
                className='self-center flex-shrink-0 w-24 h-24 -mt-12 bg-gray-500 bg-center bg-cover rounded-full'
                src={rohan}
              />
              <div className='flex-1 my-4'>
                <p className='text-xl font-semibold'>Rohan Rouf</p>
                <p>Web Developer</p>
              </div>
              <div className='flex items-center justify-center p-3 space-x-3 border-t-2'>
                <a
                  title='Email'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaMailBulk></FaMailBulk>
                </a>
                <a
                  title='Linkedin'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaLinkedin></FaLinkedin>
                </a>
                <a
                  title='Github'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaGithub></FaGithub>
                </a>
              </div>
            </div>

            {/* sakib */}
            <div className='flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gradient-to-r from-[#9181F4] to-[#5038ED] text-gray-100'>
              <img
                alt='sakib-img'
                className='self-center flex-shrink-0 object-cover w-24 h-24 -mt-12 bg-gray-500 bg-center bg-cover rounded-full'
                src={sakib}
              />
              <div className='flex-1 my-4'>
                <p className='text-xl font-semibold'>MD. Sakib</p>
                <p>Web Developer</p>
              </div>
              <div className='flex items-center justify-center p-3 space-x-3 border-t-2'>
                <a
                  title='Email'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaMailBulk></FaMailBulk>
                </a>
                <a
                  title='Linkedin'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaLinkedin></FaLinkedin>
                </a>
                <a
                  title='Github'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaGithub></FaGithub>
                </a>
              </div>
            </div>

            {/* Shabbir */}
            <div className='flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gradient-to-r from-[#9181F4] to-[#5038ED] text-gray-100'>
              <img
                alt='huzaifa-img'
                className='self-center flex-shrink-0 w-24 h-24 -mt-12 bg-gray-500 bg-center bg-cover rounded-full'
                src={shabbir}
              />
              <div className='flex-1 my-4'>
                <p className='text-xl font-semibold'>Shabbir Hossain</p>
                <p>Web Developer</p>
              </div>
              <div className='flex items-center justify-center p-3 space-x-3 border-t-2'>
                <a
                  title='Email'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaMailBulk></FaMailBulk>
                </a>
                <a
                  title='Linkedin'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaLinkedin></FaLinkedin>
                </a>
                <a
                  title='Github'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaGithub></FaGithub>
                </a>
              </div>
            </div>

            {/* Tanzil */}
            <div className='flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gradient-to-r from-[#9181F4] to-[#5038ED] text-gray-100'>
              <img
                alt='huzaifa-img'
                className='self-center flex-shrink-0 w-24 h-24 -mt-12 bg-gray-500 bg-center bg-cover rounded-full'
                src={tanzil}
              />
              <div className='flex-1 my-4'>
                <p className='text-xl font-semibold'>Tanzil Rayhan</p>
                <p>Web Developer</p>
              </div>
              <div className='flex items-center justify-center p-3 space-x-3 border-t-2'>
                <a
                  title='Email'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaMailBulk></FaMailBulk>
                </a>
                <a
                  title='Linkedin'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaLinkedin></FaLinkedin>
                </a>
                <a
                  title='Github'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaGithub></FaGithub>
                </a>
              </div>
            </div>

            {/* Hridoy */}
            <div className='flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gradient-to-r from-[#9181F4] to-[#5038ED] text-gray-100'>
              <img
                alt='hridoy-img'
                className='self-center flex-shrink-0 w-24 h-24 -mt-12 bg-gray-500 bg-center bg-cover rounded-full'
                src={hridoy}
              />
              <div className='flex-1 my-4'>
                <p className='text-xl font-semibold'>
                  Fazlul Karim Hridoy
                </p>
                <p>Web Developer</p>
              </div>
              <div className='flex items-center justify-center p-3 space-x-3 border-t-2'>
                <a
                  title='Email'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaMailBulk></FaMailBulk>
                </a>
                <a
                  title='Linkedin'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaLinkedin></FaLinkedin>
                </a>
                <a
                  title='Github'
                  className='text-xl cursor-pointer text-gray-50 hover:text-violet-400'>
                  <FaGithub></FaGithub>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
