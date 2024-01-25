import {
  FaChevronDown,
  FaClock,
  FaGlobeAsia,
  FaMailBulk,
  FaPhone,
  FaTimes,
} from "react-icons/fa";
import type { Dayjs } from "dayjs";
import { Calendar, theme } from "antd";
import type { CalendarProps } from "antd";

const EventDetails: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    width: 500,
    height: 400,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div className='h-dvh'>
      <h1 className='text-3xl font-bold text-center mt-5'>
        Preview Of Details Page
      </h1>
      <div className='max-w-5xl mx-auto h-[550px] shadow-md rounded-md mt-5 flex'>
        <div className='w-1/3 px-6 py-4 border-r'>
          <h4 className='text-gray-400 font-medium'>Author Name</h4>
          <h2 className='text-3xl font-semibold'>Event Name</h2>
          <div className='flex items-center gap-2 text-lg text-gray-400 font-medium mt-5'>
            <FaClock></FaClock>
            <h4>Duration min</h4>
          </div>
          <div className='flex items-center gap-2 text-lg text-gray-400 font-medium mt-2'>
            <FaPhone></FaPhone>
            <h4>Phone call</h4>
          </div>
          <div className='flex items-center gap-2 text-lg text-gray-400 font-medium mt-2'>
            <FaMailBulk></FaMailBulk>
            <h4>Email</h4>
          </div>
        </div>

        <div className='w-3/4 px-6 py-4'>
          <h3 className='text-2xl font-semibold'>Select a Date & Time</h3>
          <div className='flex mt-5'>
            <div>
              <div className='w-3/4' style={wrapperStyle}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </div>
              <h4 className='font-semibold mt-2'>Time zone</h4>
              <div className='flex items-center gap-2'>
                <FaGlobeAsia></FaGlobeAsia>
                <p>Asia/Dhaka(1:43)</p>
                <FaChevronDown></FaChevronDown>
              </div>
            </div>
            <div className='w-1/3 pl-2 flex flex-col items-center gap-3'>
              <button className='w-full text-[#5E47EF] text-lg font-bold rounded-[4px] px-8 py-3 border border-[#5E47EF]'>
                10.00am
              </button>
              <button className='w-full text-[#5E47EF] text-lg font-bold rounded-[4px] px-8 py-3 border border-[#5E47EF]'>
                10.30am
              </button>
              <button className='w-full text-[#5E47EF] text-lg font-bold rounded-[4px] px-8 py-3 border border-[#5E47EF]'>
                11.00am
              </button>
              <button className='w-full text-[#5E47EF] text-lg font-bold rounded-[4px] px-8 py-3 border border-[#5E47EF]'>
                11.30am
              </button>
              <button className='w-full text-[#5E47EF] text-lg font-bold rounded-[4px] px-8 py-3 border border-[#5E47EF]'>
                12.00am
              </button>
              <button className='w-full text-[#5E47EF] text-lg font-bold rounded-[4px] px-8 py-3 border border-[#5E47EF]'>
                12.30am
              </button>
              <button className='w-full text-[#5E47EF] text-lg font-bold rounded-[4px] px-8 py-3 border border-[#5E47EF]'>
                1.00pm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-5xl mx-auto h-[150px] shadow-md rounded-md mt-10'>
        <h4 className='font-semibold p-4'>All Participants</h4>
        <div className="flex flex-wrap justify-center gap-3 pl-3">
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer'></FaTimes>
          </div>
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer'></FaTimes>
          </div>
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer'></FaTimes>
          </div>
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer'></FaTimes>
          </div>
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer'></FaTimes>
          </div>
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer hover:border-black'></FaTimes>
          </div>
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer hover:border-black'></FaTimes>
          </div>
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer'></FaTimes>
          </div>
          <div className='px-2 flex items-center gap-2 rounded-md border hover:border-black'>
            <img
              className='w-6'
              src='https://i.ibb.co/MgGM9ky/istockphoto-1337144146-612x612.jpg'
              alt='participant-image'
            />
            <p className='text-sm font-semibold'>abc@gmail.com</p>
            <FaTimes className='text-xs hover:cursor-pointer'></FaTimes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
