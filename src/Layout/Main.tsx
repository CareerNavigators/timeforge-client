import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { useEffect } from "react";
import AOS from "aos"
const Main = () => {
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <div className="max-w-[1920px] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Main;
