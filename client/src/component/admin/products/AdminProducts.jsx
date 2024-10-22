import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function AdminProducts() {

  useEffect(()=>{
   
    if(window.innerWidth < 756 ){
      const element = document.getElementById('products-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
  },[])
  return (
    <div className="admin-products">
      <div className="products-heading-and-add-btn flex justify-around text-lg mt-2">
        <Link to={"/admin/dashboard/products"} className="  text-center  pr-3 w-1/2 py-2 shadow-xl rounded-xl hover:bg-slate-200">Products</Link>
        
        <Link to={"/admin/dashboard/products/upload"} className="w-[48%] py-2 text-center shadow-xl rounded-xl  hover:bg-slate-200"> Add Product</Link>
      </div>


        <div id="products-section" className="products-section">
          <Outlet/>
        </div>


    </div>
  );
}

export default AdminProducts;

