import { Button } from "antd";
// import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
// import direction from "../../../src/assets/direction.json";
// import { FaPersonWalkingArrowRight } from "react-icons/fa6";
// import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import showToast from "../../Hook/swalToast";
import AxiosSecure from "../../Hook/useAxios";
// import { AuthContext } from "../../Provider/AuthContext";

// interface NoteInput {

//   // event: string;
//   createdBy: string;
// }

interface NotePayload {
  content: string;
}
interface NoteResponse {
  _id: string;
  title: string;
  meeting: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: any;
}

type ErrorResponse = { msg: string };

const Note: React.FC = ({ noteId }: any) => {
  const [pNoteId, setPNoteId] = useState<string>("");

  // const { userData } = useContext(AuthContext);
  useEffect(() => {
    setPNoteId(noteId);
  }, [noteId]);
  const [eventDesc, setEventDesc] = useState<string>("");
  const [showOutput] = useState<boolean>(false);

  const axios = AxiosSecure();
  // const postNote = useMutation({
  //   mutationFn: async (data: NoteInput): Promise<any> => {
  //     const res = await axios.post("/note", data);
  //     return res.data;
  //   },
  // });
  console.log(pNoteId);
  const patchNote = useMutation<NoteResponse, ErrorResponse, NotePayload>({
    mutationFn: async (noteData) => {
      const res = await axios.patch<NoteResponse>(`/note/noteid=${pNoteId}`, {
        noteData,
      });
      return res.data;
    },
    // } async (noteId, noteData ) => {
    //   const res = await axios.patch<NoteResponse>(`/note/noteid=${noteId}`, { noteData });
    //   return res.data;
  });
  console.log();
  const handleSubmit = () => {
    const noteData: NotePayload = {
      content: eventDesc,
    };
    patchNote.mutateAsync(noteData);
  };

  const handleEventDescChange = (content: string) => {
    setEventDesc(content);
  };

  return (
    <>
      <div className="flex justify-center items-center mx-auto mt-[50px]">
        <div className="gap-10 text-black mx-auto flex flex-col w-[1000px] h-[600px] justify-center items-center rounded-xl">
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
              Update Note
            </Button>
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
