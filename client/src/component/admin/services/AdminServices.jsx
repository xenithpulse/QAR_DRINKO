import React , {useEffect} from 'react'
import { Link , Outlet } from 'react-router-dom';
function AdminServices()  {

    useEffect(()=>{
      const element = document.getElementById('services-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
    },[])
    return (
      <div className="admin-services">
        <div className="services-heading-and-add-btn flex justify-around text-lg mt-2">
          <Link to={"/admin/dashboard/services"} className="  text-center  pr-3 w-1/2 py-2 shadow-xl rounded-xl hover:bg-slate-200">Services</Link>
          
          <Link to={"/admin/dashboard/services/upload"} className="w-[48%] py-2 text-center shadow-xl rounded-xl  hover:bg-slate-200"> Add Services</Link>
        </div>
  
  
          <div id="services-section" className="services-section">
            <Outlet/>
          </div>
  
  
      </div>
    );
  }
  
export default AdminServices