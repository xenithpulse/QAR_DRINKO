import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
function AdminUsers() {


  useEffect(()=>{
   
    if(window.innerWidth < 756 ){
      const element = document.getElementById('users-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
  },[])

  useEffect(()=>{
   
    if(window.innerWidth < 756 ){
      const element = document.getElementById('users-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
  },[])


  return (
    <div className="admin-users">
      <div className="users-heading-and-add-btn flex justify-around text-lg mt-2">
        <Link to={"/admin/dashboard/users"} className="  text-center  pr-3 w-1/2 py-2 shadow-xl rounded-xl hover:bg-slate-200">Admins</Link>
        
        <Link to={"/admin/dashboard/users/upload"} className="w-[48%] py-2 text-center shadow-xl rounded-xl  hover:bg-slate-200"> Add Admin</Link>
      </div>


        <div id="users-section" className="users-section">
          <Outlet/>
        </div>


    </div>
  );
}

export default AdminUsers