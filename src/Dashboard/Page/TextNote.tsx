import  {  useContext, useState } from "react";
import { Modal} from "antd";
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
  title:string;
  meeting:string;
  createdBy:string;
  createdAt:string;
  updatedAt:string;
  __v:any;
}

type ErrorResponse = { msg: string };

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
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthContext";
// import { useNavigate } from "react-router";
// import Note from "./Note";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import showToast from "../../Hook/swalToast";
// import  "./modal.css";
const TextNote:React.FC = () => {


  const [size, setSize] = React.useState(null);
 
  const handleOpen  = (value:any) => setSize(value);
  
  const [open, setOpen] = useState(false);
  const {userData} = useContext(AuthContext);
  // get note data using tanstack query
  // const axios = AxiosSecure();
  const {data} = useQuery({
    queryKey: ["note"],
    queryFn: async( )=>{
      const res = await axios.get(`/note?userid=${userData._id}` )
      return res.data
    },
    enabled: userData != null ? true : false
  })
  console.log(data);
  // console.log(userData);


    const handleDelete =()=>{
      
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }
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
  const [eventDesc, setEventDesc] = useState<string>(""); // Define type string for eventDesc
  const [showOutput] = useState<boolean>(false);

  const axios = AxiosSecure();
  // const postNote = useMutation({
  //   mutationFn: async (data: NoteInput): Promise<any> => {
  //     const res = await axios.post("/note", data);
  //     return res.data;
  //   },
  // });
// console.log(pNoteId);
  const patchNote = useMutation<
  NoteResponse, ErrorResponse, NotePayload
  >({
    mutationFn: async(noteData)=>{
       const res = await axios.patch<NoteResponse>(
        `/note/${data?._id}`,
        { noteData }
      );
      return res.data
    }
  // } async (noteId, noteData ) => {
  //   const res = await axios.patch<NoteResponse>(`/note/noteid=${noteId}`, { noteData });
  //   return res.data;
  });
  const handleSubmit = () => {
    const noteData:NotePayload = {
      content: eventDesc,
    };
    patchNote.mutateAsync(noteData);
    showToast("success","note successfully updated")
  };

  const handleEventDescChange = (content: string) => {
    setEventDesc(content);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-auto mt-[70px]">
      {/* 1st card */}

     <h1 className="text-[30px] font-bold font-inter "> <span className="text-deep-purple-600">{userData?.name}</span> Recent notes</h1>
      <div>
      {data?.map((data:any)=>(
        <Card 
        placeholder={undefined}
        className="mt-6 w-96 border-[1px] relative ">
        <button onClick={handleDelete}
         className="absolute right-[5px] top-[10px]"><RxCross2  className="text-red-700 text-[20px] font-bold"/></button>
        <CardBody
        placeholder={undefined}
        >
          <img src="" alt="" />
          <Typography 
          variant="h5" 
          color="blue-gray"
           className="mb-2"
           placeholder={undefined}
           >
            {data?.title}
          </Typography>
          <Typography
           placeholder={undefined}
          >
            {/* {userData?.email}  */}
            <br></br>
           <h1 className="font-semibold text-base">  <h1 className="" color="purple">{dayjs.utc(data?.createdAt).format('MMM DD, YYYY')}</h1> </h1>
          </Typography>
        </CardBody>
        <CardFooter 
        placeholder={undefined}
        className="pt-0">
          <a href="#" className="inline-block">
            <Button
              placeholder={undefined}
              onClick={() => setOpen(true)}
              size="sm"
              variant="text"
              className="flex items-center gap-2"
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
          <div className="hidden">
          {/* <Note noteId={data?._id}/> */}
          <div className="flex justify-center items-center mx-auto mt-[50px]">
        <div className="gap-10 text-black mx-auto flex flex-col w-[1000px] h-[600px] justify-center items-center rounded-xl">
          {/* <div className="w-[65%] mx-auto flex flex-row-reverse items-center">
            <h1 className="w-[500px] font-serif text-[25px] font-semibold">
              Take Your Note
            </h1>
            <Lottie animationData={direction} />
          </div> */}

          
        </div>
      </div>
          </div>
          <button className="text-[30px]" onClick={() => handleOpen("xl")}>
          <CiEdit />
    </button>

    <Dialog 
      placeholder={undefined}
        open={
          size === "xl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader placeholder={undefined}>Type your note here.</DialogHeader>
        <DialogBody placeholder={undefined}>
        <ReactQuill
            theme="snow"
            value={eventDesc}
            onChange={handleEventDescChange}
            className="w-full mx-auto h-full rounded-xl"
          />

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
        <DialogFooter
        placeholder={undefined}
        >
          <Button
            placeholder={undefined}
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSubmit}
            placeholder={undefined}
          >
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
          {/* <Button onClick={handleDelete}>Delete</Button> */}
        </>
      }
    >
    </Modal>
      </Card>
      
      )) 
       }
      </div>
      
    </div>
  );
};

export default TextNote;
