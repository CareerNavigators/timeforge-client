import { Outlet } from "react-router-dom";
import Dashbar from "../Dashbar/Dashbar";


const Dashboard = () => {
    return (
        <div className="h-screen flex flex-row-reverse lg:max-w-[1400px] lg:mx-auto items-center mr-0 gap-[50px] lg:gap-[100px]  ">
            <div className=" "><Dashbar></Dashbar></div>
            <div className="  lg:flex  lg:items-center lg:mx-auto">
            <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;