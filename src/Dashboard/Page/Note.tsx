import { Button } from "antd";
import {  useState } from "react";
import ReactQuill from "react-quill";
// import AxiosSecure from "../../Hook/useAxios";
// import axios from "axios";

const Note = () => {
  // const axiosSecure = AxiosSecure();
  const [eventDesc, setEventDesc] = useState<string>("");

  const handleEventDesc = (value: string) => {
    setEventDesc(value);
  };
  // const handleSubmit = () => {
  //   setDisplayedContent(content);
  //   // const data={ content:content, 
  //   //   event:65bbe00e1693a8d7b28414b2,
  //   //   createdBy:65afa0d20cd675ad26b7669a}
  //   // axiosSecure.post("/note", {})
  // };
  return (
    <div className="flex jusity-center items-center mx-auto">
      <div className="gap-10 text-black  mx-auto flex flex-col w-[1000px] h-[600px] justify-center items-center rounded-xl">
        {/* <h2 className=''>Write Your Note Here</h2> */}

        <ReactQuill
                  theme="snow"
                  value={eventDesc}
                  onChange={handleEventDesc}
                  className="w-full mx-auto h-full"

                />

        <Button
          className="my-6 font-semibold font-inter text-[#7c3aed] border-2 border-[#7c3aed]"
          // onClick={handleSubmit}
        >
          Submit Note
        </Button>
      </div>
      <div className="mt-4">
        
      </div>
    </div>
  );
};

export default Note;
