import { Outlet } from "react-router-dom";
import Dashbar from "../Dashbar/Dashbar";
import MobileDasbar from "../Dashbar/MobileDasbar";

const Dashboard = () => {
  return (
    <div className="flex h-screen lg:flex-row-reverse">
      <div className="hidden lg:block">
        <Dashbar></Dashbar>
      </div>
      <div className="max-h-screen w-full overflow-y-auto mx-auto">
        <Outlet />
      </div>
      <div className="fixed bottom-0 right-0 w-full mb-0 mr-0 lg:hidden">
        {" "}
        <MobileDasbar></MobileDasbar>
      </div>
    </div>
  );
};

export default Dashboard;
