import { useMutation } from "@tanstack/react-query";
import { GoCommentDiscussion } from "react-icons/go";
import AxiosSecure from "../../Hook/useAxios";
import { handelAxiosSuccess } from "../../Components/ExtraFunc/handelAxiosSuccess";
import { AxiosError } from "axios";
import { handleAxiosError } from "../../Components/ExtraFunc/handelAxiosError";
import { Spin } from "antd";
import { FaRegCopy } from "react-icons/fa";
import showToast from "../../Hook/swalToast";
import { useNavigate } from "react-router-dom";
type Props = {
  eventid: string;
  meetlink?: {
    url: string;
    _id: string;
    id: string;
    name: string;
  };
  eventDetailsRefetch?:any
};
const MeetLink = ({ eventid, meetlink,eventDetailsRefetch }: Props) => {
  const caxios = AxiosSecure();
  const navigate=useNavigate()
  const mutationCreateMeet = useMutation({
    mutationFn: async () => {
      const res = await caxios.post("/createmeet", {
        roomName: "OUR ROOM",
        eventid: eventid,
      });
      return res.data;
    },
    onSuccess:(data)=>{
      handelAxiosSuccess(data)
      eventDetailsRefetch()
    },
    onError:(err:AxiosError)=>{
      handleAxiosError(err)
    }
  });

  if (!meetlink) {
    return (
      <div>
        <Spin spinning={mutationCreateMeet.isPending}>
        <button
          className="px-5 py-5 mt-1 border flex justify-left gap-2 w-full border-[#d6d1ff] hover:border-green-800 text-lg rounded-md text-gray-500 hover:text-green-800 hover:bg-green-800/10 hover:transition-all hover:duration-300"
          onClick={async () => {
            await mutationCreateMeet.mutateAsync();
          }}
        >
          <GoCommentDiscussion />
          <span className="text-sm">Generate Meeting Link</span>
        </button>
        </Spin>
      </div>
    );
  } else {
    const handleCopy = async (text:string) => {
      try {
        await navigator.clipboard.writeText(text);
        showToast("success","Link Copied")
      } catch (err) {
        showToast("error","Copy failed")
      }
   };
   const handelStartMeet=()=>{
    navigate(`/meet/${meetlink.name}`)
   }
    return (
      <div className="px-5 py-5 flex flex-col mt-1 border w-full gap-2 items-center border-[#d6d1ff]  rounded-md">
        <p className="italic text-blue-300 text-xs text-center break-all">{`${window.origin}/meet/${meetlink.name}`}</p>
        <div className="flex gap-2">
        <button className="px-2 py-2 border border-[#d6d1ff] hover:border-green-800 text-xs rounded-md text-gray-500 hover:text-green-800 hover:bg-green-800/10 hover:transition-all hover:duration-300"
        onClick={()=>{handleCopy(`${window.origin}/meet/${meetlink.name}`)}}
        ><FaRegCopy /></button>
        <button className="px-2 py-2 border border-[#d6d1ff] hover:border-green-800 text-xs rounded-md text-gray-500 hover:text-green-800 hover:bg-green-800/10 hover:transition-all hover:duration-300"
        onClick={handelStartMeet}
        >Start Meeting</button>
        </div>
      </div>
    );
  }
};

export default MeetLink;
