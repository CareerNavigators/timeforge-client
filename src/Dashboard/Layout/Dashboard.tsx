import { Outlet } from "react-router-dom";
import Dashbar from "../Dashbar/Dashbar";
import MobileDashbar from "../Dashbar/MobileDashbar";

const Dashboard = () => {
  return (
    <div className="flex h-screen lg:flex-row-reverse">
      <div className="hidden lg:block">
        <Dashbar></Dashbar>
      </div>
      <div className="max-h-screen flex justify-center w-full overflow-y-auto mx-auto">
        <Outlet />
      </div>
      <div className="fixed bottom-0 right-0 w-full mb-0 mr-0 lg:hidden">
        {" "}
        <MobileDashbar></MobileDashbar>
      </div>
    </div>
  );
};

export default Dashboard;
