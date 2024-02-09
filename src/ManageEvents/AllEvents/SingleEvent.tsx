import {
  FaCamera,
  FaCheck,
  FaExternalLinkAlt,
  FaMicrophone,
  FaRegTrashAlt,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { EventType } from "./AllEvents";
import { motion } from "framer-motion"

interface SingleEventProps {
  item: EventType;
  handleEventDelete: (id: string) => void;
}

const SingleEvent: React.FC<SingleEventProps> = ({
  item,
  handleEventDelete,
}) => {
  const { _id, title, duration, eventType, camera, mic, attendee } = item;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 12,
          stiffness: 100,
          restDelta: 0.01
        }
      }}
    >
      <div className='w-full mx-auto rounded-lg border shadow-sm p-4 hover:shadow-md'>
        <div>

          <Link to={`/dashboard/eventDetails/${_id}`}>
            <div>
              <h3 className='text-[#5E47EF] text-xl font-bold my-2'>
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
                    {camera ? <FaCheck size={10} color="green"></FaCheck> : <FaTimes size={10} color="red"></FaTimes>}
                  </div>
                  <div className='flex items-center gap-1'>
                    <FaMicrophone color='gray' size={25}></FaMicrophone>
                    {mic ? <FaCheck size={10} color="green"></FaCheck> : <FaTimes size={10} color="red"></FaTimes>}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <hr className='mt-3' />
          <div className='flex justify-between items-center mt-5 gap-2'>
            <Link to={`/eventslot/${_id}`}>
              <div className='flex items-center gap-1 text-[#5E47EF] p-2 rounded'>
                <FaExternalLinkAlt></FaExternalLinkAlt>
                <h3 className='hover:underline hover:cursor-pointer'>Preview</h3>
              </div>
            </Link>

            <button onClick={() => handleEventDelete(_id)} className='p-2 text-lg rounded text-red-500 hover:bg-red-500/10 hover:transition-all hover:duration-300'>
              <FaRegTrashAlt></FaRegTrashAlt>
            </button>
          </div>
        </div>
      </div>
    </motion.div>

  );
};

export default SingleEvent;
