import { Outlet } from "react-router-dom";
import Dashbar from "../Dashbar/Dashbar";
import MobileDashboard from "../Dashbar/MobileDashbar";

const Dashboard = () => {
  return (
    <div className="flex h-screen lg:flex-row-reverse">
      <div className="hidden lg:block">
        <Dashbar></Dashbar>
      </div>
      <Outlet />
      <div className="fixed bottom-0 right-0 w-full mb-0 mr-0 lg:hidden">
        <MobileDashboard></MobileDashboard>
      </div>
    </div>
  );
};

export default Dashboard;
