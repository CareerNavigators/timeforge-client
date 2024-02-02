import { Button } from "antd";
import JoditEditor from "jodit-react";

import { MutableRefObject, useMemo, useRef, useState } from "react";
// import AxiosSecure from "../../Hook/useAxios";
// import axios from "axios";

interface joditProps {
  value: string;
  ref: any;
  tabIndex: number;
}

const Note = () => {
  // const axiosSecure = AxiosSecure();


  

  const editor = useRef<joditProps["ref"]>(null);
  const [content, setContent] = useState<joditProps["value"]>("");
  const [displayedContent, setDisplayedContent] =
    useState<joditProps["value"]>("");
  // const config = useMemo(
  // 	{
  // 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  // 		placeholder: placeholder || 'Start typings...'
  // 	},
  // 	[placeholder]
  // );

  const handleSubmit = () => {
    setDisplayedContent(content);
    // const data={ content:content, 
    //   event:65bbe00e1693a8d7b28414b2,
    //   createdBy:65afa0d20cd675ad26b7669a}
    // axiosSecure.post("/note", {})
  };
  return (
    <div>
      <div className="App text-black shadow-xl shadow-slate-500 w-[1000px] mx-auto flex flex-col h-full justify-center items-center rounded-xl">
        {/* <h2 className=''>Write Your Note Here</h2> */}

        <JoditEditor
          ref={editor}
          value={content}
          // config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => setContent(newContent)}
        />

        <Button
          className="my-6 font-semibold font-inter bg-indigo-600"
          onClick={handleSubmit}
        >
          Submit your Note
        </Button>
      </div>
      <div className="mt-4">
        <p>{displayedContent}</p>
      </div>
    </div>
  );
};

export default Note;
