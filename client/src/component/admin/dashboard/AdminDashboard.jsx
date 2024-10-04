import React from "react";
import AdminSidebar from "../sideBar/AdminSidebar";
import { Outlet } from "react-router-dom";
function AdminDashboard() {
  return (
    <>
      <div className="flex flex-col md:flex-row mt-20 ">
        <div className="side-bar-w-h w-full block md:w-[25vw] lg:w-[15vw]   max-w-screen ">
          <AdminSidebar />
        </div>

        <div
          className="dashboard-details     min-h-screen w-screen 
        "
        >
          <Outlet />
        </div> 
      </div>
    </>
  );
}

export default AdminDashboard;
