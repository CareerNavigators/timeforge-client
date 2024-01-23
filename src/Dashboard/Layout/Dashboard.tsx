import { Outlet } from "react-router-dom";
import Dashbar from "../Dashbar/Dashbar";


const Dashboard = () => {
    return (
        <div className="flex flex-row-reverse max-w-[1400px] mx-auto items-center gap-[100px]  ">
            <div className="h-screen"><Dashbar></Dashbar></div>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;