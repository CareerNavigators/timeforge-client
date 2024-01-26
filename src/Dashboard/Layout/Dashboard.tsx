import { Outlet } from "react-router-dom";
import Dashbar from "../Dashbar/Dashbar";


const Dashboard = () => {
    return (
        <div className="h-screen flex flex-row-reverse lg:max-w-[100%] lg:mx-auto items-center  gap-[50px] lg:gap-[100px]  ">
            <div className=" "><Dashbar></Dashbar></div>
            <div className="  lg:flex  lg:items-center lg:mx-auto">
            <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;