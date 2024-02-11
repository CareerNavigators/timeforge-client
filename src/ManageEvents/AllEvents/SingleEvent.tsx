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
import { motion } from "framer-motion";
import { Divider } from "antd";

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
      whileHover={{ scale: 1.03 }}
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
    >
      <div className="w-full mx-auto rounded-lg border dark:border-[#5E47EF] bg-{#161927} shadow-sm p-4 hover:shadow-md transition-all ease-in-out">
        <div>
          <Link to={`/dashboard/eventDetails/${_id}`}>
            <div className="h-[15vh]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="lg:w-[12vw] text-[#5E47EF] dark:text-dw text-xl font-bold">
                  {title}
                </h3>
                <p className="border-2 border-[#5E47EF] bg-[#ebe8ff] w-fit px-2 rounded-full text-xs text-[#5E47EF]">
                  {eventType}
                </p>
              </div>
              <h4 className="text-gray-500 dark:text-dw font-medium">
                Duration : {duration}
              </h4>

              <div className="flex items-center justify-between mt-8 lg:mt-12">
                <div className="flex items-center gap-3">
                  <FaUsers
                    className="text-gray-600 dark:text-dw"
                    size={20}
                  ></FaUsers>
                  <p className="text-lg font-semibold">{attendee}</p>
                </div>
                <div className="flex items-center gap-4 text-lg font-medium">
                  <div className="flex items-center gap-1">
                    <FaCamera
                      className="text-gray-600 dark:text-dw"
                      size={20}
                    ></FaCamera>
                    {camera ? (
                      <FaCheck size={10} color="green"></FaCheck>
                    ) : (
                      <FaTimes size={10} color="red"></FaTimes>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMicrophone
                      className="text-gray-600 dark:text-dw"
                      size={20}
                    ></FaMicrophone>
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
          {/* <hr className="mt-3" /> */}
          <Divider className="dark:bg-[#5E47EF]" />
          <div className="flex justify-between items-center mt-5 gap-2">
            <Link to={`/eventSlot/${_id}`}>
              <div className="flex items-center gap-1 text-[#5E47EF] p-2 rounded">
                <FaExternalLinkAlt></FaExternalLinkAlt>
                <h3 className="hover:underline hover:cursor-pointer">
                  Preview
                </h3>
              </div>
            </Link>

            <button
              onClick={() => handleEventDelete(_id)}
              className="p-2 text-lg rounded text-red-500 hover:bg-red-500/10 hover:transition-all hover:duration-300"
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
