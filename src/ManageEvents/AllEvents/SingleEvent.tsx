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
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)
interface SingleEventProps {
  item: EventType;
  handleEventDelete: (id: string) => void;
}

const SingleEvent: React.FC<SingleEventProps> = ({
  item,
  handleEventDelete,
}) => {
  const { _id, title, duration, eventType, camera, mic, attendee, offline } = item;
  let durationMsg: string = "";
  if (duration) {
    if (duration < 60) {
      durationMsg = dayjs.duration(parseInt(String(duration)), "minutes").format("m [minutes]")
    } else {
      durationMsg = dayjs.duration(parseInt(String(duration)), "minutes").format("H [hours] m [minutes]")
    }
  }
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
      <div className={`w-[300px] max-h-[300px] select-none rounded-lg dark:bg-d shadow-md border-2 border-white dark:border-dw dark:border-[1px] p-4 hover:bg-[#f9f6ff] hover:border-[#7c3aed] hover:shadow-md hover:-hue-rotate-50`}>
        <Link to={`/dashboard/eventDetails/${_id}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-[#7c3aed] dark:text-dw text-lg font-bold my-2 truncate">
              {title}
            </h3>
            <h4 className={`text-xs text-[#7c3aed] ${offline ? "bg-[#f1effa]" : "bg-[#e5e0f8]"} font-semibold rounded-md px-3 py-1`}>
              {eventType}
            </h4>
          </div>
          <div className="flex justify-between items-center">
            <h4 className="flex items-center gap-2 my-3 border border-[#d6d1ff] px-2 py-[2px] rounded-lg">
              <RiTimer2Fill color="gray" size={17}></RiTimer2Fill>
              <p className="text-gray-500 text-sm">{durationMsg}</p>
            </h4>
            {
              offline ? <h4 className="text-xs px-2 py-[2px] rounded-md bg-gray-500 text-white">
              Offline
            </h4> : <h4 className="text-xs px-2 py-[2px] rounded-md bg-green-500 text-white">
              Online
            </h4>
            }
          </div>
          <div className="flex items-center justify-between my-2">
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
        </Link>
        <hr className="mt-3" />
        <div className="flex justify-between items-center mt-3 gap-2">
          <Link to={`/eventslot/${_id}`}>
            <div className="flex items-center gap-1  text-[#7c3aed] rounded">
              <BiLink></BiLink>
              <h3 className="hover:underline hover:cursor-pointer dark:text-dw">Preview</h3>
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
    </motion.div>
  );
};

export default SingleEvent;
