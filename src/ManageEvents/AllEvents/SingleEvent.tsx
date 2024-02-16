import {
  FaCamera,
  FaCheck,
  FaMicrophone,
  FaRegTrashAlt,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { EventType } from "./AllEvents";
import { motion } from "framer-motion";
import { BiLink } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { RiTimer2Fill } from "react-icons/ri";


interface SingleEventProps {
  item: EventType;
  handleEventDelete: (id: string) => void;
}

const SingleEvent: React.FC<SingleEventProps> = ({ item, handleEventDelete }) => {
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
          restDelta: 0.01,
        },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="w-[300px] max-h-[200px] select-none rounded-lg border-2 border-[#fafafa] shadow-sm p-4 hover:shadow-md hover:border-[#5E47EF]">
        <div>
          <Link to={`/dashboard/eventDetails/${_id}`}>
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-[#5E47EF] text-lg font-bold my-2 truncate">{title}</h3>
                <h4 className="text-xs text-[#5E47EF] bg-[#f1effa] font-semibold rounded-full px-3 py-1">{eventType}</h4>
              </div>
              <div className="flex items-center gap-1 py-1.5">
                <RiTimer2Fill color="gray" size={17}></RiTimer2Fill>
                <p className="text-gray-500 text-sm font-medium">{duration} minutes</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 border border-[#d6d1ff] px-3 py-1 rounded-lg">
                  <FaUserGroup color="gray" size={17}></FaUserGroup>
                  <p className="text-xs font-semibold">{attendee}</p>
                </div>
                <div className="flex items-center gap-4 text-lg font-medium border border-[#d6d1ff] px-3 py-1 rounded-lg">
                  <div className="flex items-center gap-1">
                    <FaCamera color="gray" size={17}></FaCamera>
                    {camera ? (
                      <FaCheck size={10} color="green"></FaCheck>
                    ) : (
                      <FaTimes size={10} color="red"></FaTimes>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMicrophone color="gray" size={17}></FaMicrophone>
                    {mic ? (
                      <FaCheck size={10} color="green"></FaCheck>
                    ) : (
                      <FaTimes size={10} color="red"></FaTimes>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <hr className="mt-3" />
          <div className="flex justify-between items-center mt-3 gap-2">
            <Link to={`/eventslot/${_id}`}>
              <div className="flex items-center gap-1 text-[#5E47EF] rounded">
                <BiLink></BiLink>
                <h3 className="hover:underline hover:cursor-pointer">
                  Preview
                </h3>
              </div>
            </Link>

            <button
              onClick={() => handleEventDelete(_id)}
              className="text-lg p-2 rounded text-red-500 hover:bg-red-500/10 hover:transition-all hover:duration-300"
            >
              <FaRegTrashAlt></FaRegTrashAlt>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleEvent;
