import  { useContext, useRef, useState } from "react";
import { Modal } from "antd";
import { CiEdit } from "react-icons/ci";

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
// import  "./modal.css";
const TextNote = () => {
  const [open, setOpen] = useState(false);
  const {userData} = useContext(AuthContext);
  // get note data using tanstack query
  const axios = AxiosSecure();
  const {data, isLoading, refetch} = useQuery({
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
    const handleUpdate=()=>{
      
    }
  // const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center items-center gap-4 mx-auto">
      {/* 1st card */}
      <Card className="mt-6 w-96 border-[1px] relative ">
        <button onClick={handleDelete}
         className="absolute right-[5px] top-[10px]"><RxCross2  className="text-red-700 text-[20px] font-bold"/></button>
        <CardBody>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mb-4 h-12 w-12 text-gray-900"
          >
            <path
              fillRule="evenodd"
              d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
              clipRule="evenodd"
            />
            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
          </svg>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            UI/UX Review Check
          </Typography>
          <Typography>
            Because it&apos;s about motivating the doers. Because I&apos;m here
            to follow my dreams and inspire others.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <a href="#" className="inline-block">
            <Button
              onClick={() => setOpen(true)}
              size="sm"
              variant="text"
              className="flex items-center gap-2"
            >
              Learn More
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
        
      </Card>
      <Modal
  title="Modal  1000px width"
  centered
  open={open}
  // onOk={() => setOpen(false)}
  onCancel={() => setOpen(false)}
  width={1000}
  footer={
    <>
      <button className="text-[30px]" onClick={handleUpdate}><CiEdit />
</button>
      {/* <Button onClick={handleDelete}>Delete</Button> */}
    </>
  }
>
  <p>some contents...</p>
  <p>some contents...</p>
  <p>some contents...</p>
</Modal>
    </div>
  );
};

export default TextNote;
