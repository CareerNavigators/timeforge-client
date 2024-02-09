
import { Divider } from "antd";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../Hook/useAxios";
import {Spin } from 'antd';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { FaUserTie } from "react-icons/fa";
dayjs.extend(utc);
type CardType={
  title:string
  duration:string
  attendee:number
  createdAt:string
}
const Card = () => {
  const caxios=AxiosSecure()
  const cards=useQuery({
    queryKey:["home","card"],
    queryFn:async ()=>{
      const res=await caxios.get("/home")
      return res.data;
    }
  })
  return (
    <div>
      <p className="text-[32px] font-[600] font-inter text-center mx-auto">
        <span className="text-[#7c3aed]">TimeForge</span> delivers exceptional
        service <br />
        to companies all around the world
      </p>
      <div className="my-[35px] p-[20px] bg-gradient-to-r from-[#8c58e6] via-[#7c3aed] to-[#6e21f3] dark:from-d dark:text-">
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pl-[12px]">
          {
            cards.isLoading? <Spin size="large" />:cards.isSuccess?cards.data.map((card:CardType,index:number)=>(
              <div
              key={index}
              className="overflow-hidden rounded-lg has-shadow bg-[url('/cardbg.png')] bg-right bg-no-repeat bg-cover w-full mx-auto p-4 flex flex-col gap-1 border-[1px] bg-white dark:bg-[#f3f1ff] dark:text-dt"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-[16px] font-semibold font-inter text-slate-400">
                  {dayjs.utc(card.createdAt).format('MMM DD, YYYY')}
                </h3>
              </div>
              <div className="text-[20px] font-poppins font-[600] ">
                <p>{card.title}</p>
              </div>
              <div className="text-[16px] font-poppins font-[300] ">
                <p>{card.duration}</p>
              </div>

              <div>
                <Divider />
              </div>
              <div className="flex gap-1 items-center">
              <FaUserTie />
              <span>{card.attendee}</span>
              </div>
            </div>
            )):<h1>Something Error</h1>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Card;
