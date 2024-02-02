import { Outlet } from "react-router-dom";
import Dashbar from "../Dashbar/Dashbar";
import MobileDasbar from "../Dashbar/MobileDasbar";

const Dashboard =()=> {
   
    return (
        <div className="h-screen  flex lg:flex-row-reverse lg:max-w-[100%] lg:mx-auto items-center  gap-[50px] lg:gap-[100px]  ">
            <div className=" hidden lg:block"><Dashbar></Dashbar></div>
            <div className=" my-[250px] lg:my-0 flex  lg:flex   lg:items-center items-center  mx-auto lg:mx-auto">
            <Outlet></Outlet>
           <div className="lg:hidden fixed mb-0 bottom-0 right-0 mr-0 w-full"> <MobileDasbar></MobileDasbar></div>
            </div>
            
        </div>
    );
};

export default Dashboard;