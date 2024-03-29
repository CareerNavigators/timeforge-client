import { useContext, useState } from "react";
import { Empty, Modal } from "antd";
import { CiEdit } from "react-icons/ci";
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

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

// type ErrorResponse = { msg: string };

// import { Modal } from 'react-responsive-modal';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
// import showToast from "../../Hook/swalToast";
import Swal from "sweetalert2";
import AxiosSecure from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthContext";
// import { useNavigate } from "react-router";
// import Note from "./Note";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import showToast from "../../Hook/swalToast";
// import  "./modal.css";
const TextNote: React.FC = () => {
  const [size, setSize] = React.useState(null);

  const handleOpen = (value: any) => setSize(value);

  const [open, setOpen] = useState(false);
  const { userData } = useContext(AuthContext);
  // get note data using tanstack query
  // const axios = AxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ["note"],
    queryFn: async () => {
      const res = await axios.get(`/note?userid=${userData._id}`);
      return res.data;
    },
    enabled: userData != null ? true : false,
    refetchOnWindowFocus:false
  });
  console.log(data);

  let fileredId: any = [];

  if (data) {
    fileredId = data.map((item: any) => item._id);
  }

  console.log(fileredId);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const [eventDesc, setEventDesc] = useState<string>(""); // Define type string for eventDesc
  const [showOutput] = useState<boolean>(false);

  const axios = AxiosSecure();

  const handleSubmit = () => {
    const noteData: NotePayload = {
      content: eventDesc,
    };
    // patchNote.mutateAsync(noteData);

    axios
      .patch<NoteResponse>(`/note/${fileredId}`, noteData)
      .then((response) => {
        console.log(response.data);
        showToast("success", "note successfully updated");
        handleOpen(null);
        refetch();
      })
      .catch((error) => {
        console.error(error);
        showToast("error", "Failed to update note");
      });

    console.log(noteData);
  };

  const handleEventDescChange = (content: string) => {
    setEventDesc(content);
  };
  return (
    <div className="mx-auto mt-10">
      {/* 1st card */}
      <h1 className="text-3xl font-bold text-center font-inter">
        <span className="text-[#7c3aed]">{userData?.name}'s</span> Recent notes
      </h1>
      <div className="flex justify-center items-center gap-5">
        {data?.map((data: any) => (
          <Card
            key={data._id}
            placeholder={undefined}
            className="mt-12 w-80 border-2 relative rounded-md hover:border-[#7c3aed] transition-all ease-in-out"
          >
            <button onClick={handleDelete} className="absolute right-3 top-3">
              <RxCross2 className="text-red-700 text-xl font-bold" />
            </button>
            <CardBody placeholder={undefined}>
              <img src="" alt="" />
              <Typography variant="h5" placeholder={undefined}>
                {data?.title}
              </Typography>
              <Typography placeholder={undefined}>
                {/* {userData?.email}  */}
                <br></br>
                <h1 className="font-semibold text-base">
                  <h1 color="purple">
                    {dayjs.utc(data?.createdAt).format("MMM DD, YYYY")}
                  </h1>
                </h1>
              </Typography>
            </CardBody>
            <CardFooter placeholder={undefined} className="pt-0">
              <a href="#" className="inline-block">
                <Button
                  placeholder={undefined}
                  onClick={() => setOpen(true)}
                  size="sm"
                  variant="text"
                  className="flex justify-center items-center gap-1 px-2 bg-white hover:bg-[#7c3aed] text-[#7c3aed] hover:text-dw border-2 border-[#7c3aed] transition-all ease-in-out"
                >
                  View Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>

                {/* // responsive modal */}
              </a>
            </CardFooter>

            <Modal
              centered
              open={open}
              // onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
              footer={
                <>
                  <div className="">
                    <div className="flex justify-center items-center mx-auto max-w-[300px] h-[500px]">
                      {data?.content.length === 0 ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      ) : (
                        <p className=" font-semibold text-teal-700 text-2xl">
                          {data?.content}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="text-[30px]"
                    onClick={() => handleOpen("xl")}
                  >
                    <CiEdit />
                  </button>

                  <Dialog
                    placeholder={undefined}
                    open={size === "xl"}
                    size={size || "md"}
                    handler={handleOpen}
                    className="border-2"
                  >
                    <DialogHeader placeholder={undefined}>
                      Type your note here.
                    </DialogHeader>
                    <DialogBody placeholder={undefined}>
                      <div className="h-[300px] mb-5">
                        <ReactQuill
                          placeholder="write your note..."
                          theme="snow"
                          value={eventDesc}
                          onChange={handleEventDescChange}
                          className="w-full mx-auto h-full rounded-xl"
                        />
                      </div>

                      <div className="flex justify-center items-center gap-5">
                        {/* <Button
                          className="my-6 font-semibold font-inter text-[#7c3aed] border-2 border-[#7c3aed]"
                          onClick={handleSubmit}
                          placeholder={undefined}
                        >
                          Update Note
                        </Button> */}
                      </div>
                      {showOutput && (
                        <div className="">
                          <h1>{eventDesc}</h1>
                        </div>
                      )}
                    </DialogBody>
                    <DialogFooter placeholder={undefined}>
                      <Button
                        placeholder={undefined}
                        variant="filled"
                        onClick={() => handleOpen(null)}
                        className="px-4 py-2 mr-1 text-[#7c3aed] border-2 hover:border-[#7c3aed] bg-dw hover:bg-[#5d47ef1f]"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="filled"
                        onClick={handleSubmit}
                        placeholder={undefined}
                        className="px-4 py-2 mr-1 text-dw hover:text-[#7c3aed] border-2 border-[#7c3aed] bg-[#5d47ef] hover:bg-[#5d47ef1f]"
                      >
                        <span>Update</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                  {/* <Button onClick={handleDelete}>Delete</Button> */}
                </>
              }
            ></Modal>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TextNote;
// const postNote = useMutation({
//   mutationFn: async (data: NoteInput): Promise<any> => {
//     const res = await axios.post("/note", data);
//     return res.data;
//   },
// });
// console.log(pNoteId);
// console.log(data?._id);
// const patchNote = useMutation<NoteResponse, ErrorResponse, NotePayload>({
//   mutationFn: async (noteData) => {
//     const res = await axios.patch<NoteResponse>(`/note/${fileredId}`, {
//       noteData,
//     });
//     return res.data;
//   },
//   // } async (noteId, noteData ) => {
//   //   const res = await axios.patch<NoteResponse>(`/note/noteid=${noteId}`, { noteData });
//   //   return res.data;
// });

// console.log(patchNote);

// console.log(userData);

//   const [filteredIds, setFilteredIds] = useState<string[]>([]);

//   // const [filteredIds, setFilteredIds] = useState<string[]>([]);

// useEffect(() => {
//   if (data) {
//     const newFilteredIds = data.map((item: any) => item._id);
//     setFilteredIds(newFilteredIds);
//   } else {
//     // Handle the case where data is undefined, if necessary
//     setFilteredIds([]);
//   }
// }, [data]);
// console.log(filteredIds);

// const [filteredId, setFilteredId] = useState<string | null>(null);

// useEffect(() => {

// }, []);
// const navigate = useNavigate();
// const handleUpdate= ()=>{
//   navigate("/dashboard/note")
// }
// const [open, setOpen] = useState(false);
// const [pNoteId, setPNoteId] = useState<string>("");

// const { userData } = useContext(AuthContext);
// useEffect(()=>{
//   setPNoteId (noteId);
// },[noteId])
