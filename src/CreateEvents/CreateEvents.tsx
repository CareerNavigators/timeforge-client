import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CreateEvents = () => {
  return (
    <div className="w-full mt-20 mb-36 space-y-5 flex flex-col items-center">
      <div className="text-center space-y-3">
        <h3 className="text-3xl font-bold">Create Events</h3>
      </div>

      <div className="w-full md:w-[500px] p-5 space-y-5 ">
        <Link
          to="/dashboard/createEvent/oneEvent"
          className="flex items-center gap-5 p-3 border-2 hover:border-[#5E47EF] rounded cursor-pointer hover:shadow-md hover:shadow-[#5d47ef49] transition-all ease-in-out"
        >
          <BsPeopleFill className="text-4xl text-[#7c3aed] m-4" />
          <div>
            <h3 className="text-xl font-semibold">One-on-One</h3>
            <p className="pb-2 text-md font-semibold">
              One host with one invitee
            </p>
            <p className="text-sm text-gray-500">
              Good for: coffee chats, 1:1 interviews
            </p>
          </div>
        </Link>

        <Link
          to="/dashboard/createEvent/groupMeeting"
          className="flex items-center gap-5 p-3 border-2 hover:border-[#7c3aed] rounded cursor-pointer hover:shadow-md hover:shadow-[#5d47ef49] transition-all ease-in-out"
        >
          <BsPeopleFill className="text-4xl text-[#7c3aed] m-4" />
          <div>
            <h3 className="text-xl font-semibold">Group Meeting</h3>
            <p className="pb-2 text-md font-semibold">
              One host with group of invitees
            </p>
            <p className="text-sm text-gray-500">
              Good for: online classes. webinars
            </p>
          </div>
        </Link>

        <Link
          to="/dashboard/createEvent/boardMeeting"
          className="flex items-center gap-5 p-3 border-2 hover:border-[#7c3aed] rounded cursor-pointer hover:shadow-md hover:shadow-[#5d47ef49] transition-all ease-in-out"
        >
          <BsPeopleFill className="text-4xl text-[#7c3aed] m-4" />
          <div>
            <h3 className="text-xl font-semibold">Board Meeting</h3>
            <p className="pb-2 text-md font-semibold">
              Multiple host with one invitee
            </p>
            <p className="text-sm text-gray-500">
              Good for: panel interviews, viva board
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CreateEvents;
