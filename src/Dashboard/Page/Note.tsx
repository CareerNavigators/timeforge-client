import { Button } from "antd";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import direction from "../../../src/assets/direction.json";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import showToast from "../../Hook/swalToast";
import AxiosSecure from "../../Hook/useAxios";
import { AuthContext } from "../../Provider/AuthContext";


interface NoteInput {
  content: string;
  // event: string;
  createdBy: string;
}
const Note = () => {
  const {userData}=useContext(AuthContext);

  const [eventDesc, setEventDesc] = useState<string>(""); // Define type string for eventDesc
  const [showOutput, setShowOutput] = useState<boolean>(false);


  const axios = AxiosSecure();
  const postNote = useMutation({
     mutationFn: async(data : NoteInput): Promise<any>=>{
       const res = await axios.post("/note" , data);
       return res.data;
    }
  })
  
  const handleSubmit = () => {
    const noteData = {
      content: eventDesc,
      // event: "65bbe00e1693a8d7b28414b2",
      createdBy: userData?._id,
    };
    postNote.mutateAsync(noteData)
    showToast("success", "note created successfully");
  };

  const handleEventDescChange = (content: string) => {
    setEventDesc(content);
    
  };

  return (
    <>
      <div className="flex justify-center items-center mx-auto">
        <div className="gap-10 text-black mx-auto flex flex-col w-[1000px] h-[600px] justify-center items-center rounded-xl">
          <div className="w-[65%] mx-auto flex flex-row-reverse items-center">
            <h1 className="w-[500px] font-serif text-[25px] font-semibold">
              Take Your Note
            </h1>
            <Lottie animationData={direction} />
          </div>

          <ReactQuill
            theme="snow"
            value={eventDesc}
            onChange={handleEventDescChange}
            className="w-full mx-auto h-full rounded-xl"
          />

          <div className="flex justify-center items-center gap-5">
            <Button
              className="my-6 font-semibold font-inter text-[#7c3aed] border-2 border-[#7c3aed]"
              onClick={handleSubmit}
            >
              Submit Note
            </Button>
            <Link to="/dashboard/textNote">
              <button className="text-[30px]">
                <FaPersonWalkingArrowRight />
              </button>
            </Link>
          </div>
          {showOutput && (
            <div className="">
              <h1>{eventDesc}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Note;
