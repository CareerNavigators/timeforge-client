import {
  FaCamera,
  FaCheck,
  FaCopy,
  FaMicrophone,
  FaRegTrashAlt,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { EventType } from "./AllEvents";

interface SingleEventProps {
  item: EventType;
  handleEventDelete: (id: string) => void;
}

const SingleEvent: React.FC<SingleEventProps> = ({ item, handleEventDelete }) => {
  const { _id, title, duration, eventType, camera, mic, attendee } = item;

  return (
    <div className='w-[350px] mx-auto rounded-lg border shadow-sm hover:shadow-[#a59cda] hover:transition-all hover:ease-out p-3 hover:shadow-md'>
      <div>
        <Link to={`/eventDetails/${_id}`}>
          <div>
            <h3 className='text-[#5E47EF] text-2xl font-bold my-2'>
              {title}
            </h3>
            <h4 className='text-gray-500 font-medium'>Duration : {duration}</h4>
            <h4 className='text-gray-500 font-medium mt-2'>
              Event Type : {eventType}
            </h4>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <FaUsers color="gray" size={30}></FaUsers>
                <p className="text-2xl font-semibold">{attendee}</p>
              </div>
              <div className='flex items-center gap-4 text-lg font-medium'>
                <div className='flex items-center gap-1'>
                  <FaCamera color="gray" size={25}></FaCamera>
                  {camera ? <FaCheck color="green"></FaCheck> : <FaTimes color="red"></FaTimes>}
                </div>
                <div className='flex items-center gap-1'>
                  <FaMicrophone color='gray' size={25}></FaMicrophone>
                  {mic ? <FaCheck color="green"></FaCheck> : <FaTimes color="red"></FaTimes>}
                </div>
              </div>
            </div>
          </div>
        </Link>
        <hr className='mt-3' />
        <div className='flex justify-between items-center mt-5 gap-2'>
          <div className='flex items-center gap-1 text-[#5E47EF]'>
            <FaCopy></FaCopy>
            <h3 className='hover:underline hover:cursor-pointer'>Copy link</h3>
          </div>
          <button onClick={() => handleEventDelete(_id)} className='text-lg text-red-600 hover:text-red-400'>
            <FaRegTrashAlt></FaRegTrashAlt>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
