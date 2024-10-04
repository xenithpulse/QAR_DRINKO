import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function AllUsers() {
  const [admins, setadmins] = useState(null);
  const [deleted, setdeleted] = useState(false);

  const [error, seterror] = useState(false);
  const fetchAdmins = async () => {
    try {
      const url = `/api/v1/registered/admins`;
      const response = await fetch(url);

      if (!response.ok) {
        console.log(response);
        toast.error("Admin fetching failed");
        seterror(true);
      }

      const data = await response.json();
      setadmins(data.admins);
    } catch (error) {
      seterror(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      toast.loading("Deleting admin")
      const url = `/api/v1/remove/admin/${id}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.dismiss();
    

      const data = await response.json();
      
      
      if(data.success){
        toast.success("Admin deleted successfull")
        setdeleted(true)
      }
      else{
        toast.error(data.message || "Admin Deletion failed ")
        setdeleted(false)
      }

    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Admin Deletion failed ")
      seterror(true);
    }
  };

  useEffect(() => {
    fetchAdmins();

    if(error){
      seterror(false)
    }
    if(deleted){
      setdeleted(false);
    }
   


  }, [deleted, error]);
  return (
    <div>
      {
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                ID
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                User Name
              </th>

              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {admins &&
              admins.map((a) => {
                return (
                  <tr
                    key={a._id}
                    className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Product Id
                      </span>
                      {a._id}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Product Name
                      </span>
                      {a.username}
                    </td>

                    <td className="w-full lg:w-auto p-3 text-gray-800 order border-b text-center block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Actions
                      </span>

                      <button
                        onClick={async () => {
                          await handleDelete(a._id);
                        }}
                        className="text-blue-400 hover:text-blue-600 underline pl-6"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      }
    </div>
  );
}

export default AllUsers;
