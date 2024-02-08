import  { useContext, useState } from "react";
import { Modal, Tag } from "antd";
import { CiEdit } from "react-icons/ci";

interface Note {
  _id: string;
  title: string;
  userId: string;
  email: any;
  createdAt:any;
  noteId:any;
}

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
import { useNavigate } from "react-router";
import Note from "./Note";
// import  "./modal.css";
const TextNote = () => {
  const [open, setOpen] = useState(false);
  const {userData} = useContext(AuthContext);
  // get note data using tanstack query
  const axios = AxiosSecure();
  const {data} = useQuery<Note[]>({
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
    const navigate = useNavigate();
    const handleUpdate= ()=>{
      navigate("/dashboard/note")
    }
  // const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-auto mt-[70px]">
      {/* 1st card */}

     <h1 className="text-[30px] font-bold font-inter "> <span className="text-deep-purple-600">{userData?.name}</span> Recent notes</h1>
      <div>
      {data?.map((data)=>(
        <Card 
        placeholder={undefined}
        className="mt-6 w-96 border-[1px] relative ">
        <button onClick={handleDelete}
         className="absolute right-[5px] top-[10px]"><RxCross2  className="text-red-700 text-[20px] font-bold"/></button>
        <CardBody
        placeholder={undefined}
        >
          <img src={userData?.img_profile} className="rounded-xl w-[70px] h-[70px]" alt="" />
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
            {userData?.email} <br></br>
           <h1 className="font-semibold text-base"> Event Created at: <Tag color="purple">{data?.createdAt}</Tag> </h1>
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
              Wanna save something
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
          {/* <Note className="" noteId={data?._id}/> */}
          <button className="text-[30px]" onClick={handleUpdate}><CiEdit />
    </button>
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
