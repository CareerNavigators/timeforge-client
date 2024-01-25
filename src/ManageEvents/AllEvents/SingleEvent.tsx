import { FaCopy } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const SingleEvent: React.FC = () => {
  return (
    <div
      className='w-full border shadow-sm p-3 hover:cursor-pointer hover:shadow-md'>
      <Link to={`/eventDetails`}>
        <div>
          <div className='flex justify-between items-center'>
            <input type='checkbox' />
            <FiSettings></FiSettings>
          </div>
          <h3 className='text-lg mt-10'>Meeting Name</h3>
          <h4 className='text-gray-500'>
            30 minutes, Event type
          </h4>
          <h4 className='text-gray-500 my-5'>"Internal notes..."</h4>
          <h4 className='text-[#5E47EF] text-lg font-medium hover:underline hover:cursor-pointer'>
            View Booking Page
          </h4>
          <hr className='mt-5' />
          <div className='flex justify-between items-center mt-5'>
            <div className='flex items-center gap-1 text-[#5E47EF]'>
              <FaCopy></FaCopy>
              <h3 className='hover:underline hover:cursor-pointer'>
                Copy link
              </h3>
            </div>
            <button className='text-[#5E47EF] px-8 py-1 rounded-full border border-[#5E47EF] hover:bg-sky-100'>
              Share
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleEvent;
