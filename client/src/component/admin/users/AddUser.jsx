import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
function AddUser() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [addeed, setaddeed] = useState(false);
  const [error, seterror] = useState(false);
  const handleAdminAddSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Admin creating....");
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const url = `/api/v1/register/admin`;

      await axios.post(
        url,
        {
          username:username.toLowerCase(),
          password,
        },
        config
      );

      toast.dismiss();
      toast.success("Admin added successfully");
      setusername("");
      setpassword("");
      setaddeed(true);
    } catch (error) {
      toast.dismiss();
      seterror(true);
      setaddeed(false);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {

    if(error || addeed){
      seterror(false)
      setaddeed (false)
    }

  },[error,addeed]);

  return (
    <div className="flex  bg-white h-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter New Admin
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={(e) => {
            handleAdminAddSubmit(e);
          }}
          className="space-y-6"
        >
          <div>
            <style>
              {`
        input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: #000 !important; /* Set your desired text color */
  transition: background-color 5000s ease-in-out 0s;
  -webkit-box-shadow: 0 0 0px 1000px white inset !important; /* Maintain the background color */
  box-shadow: 0 0 0px 1000px white inset !important; /* Maintain the background color */
  border: 1px solid #d1d5db !important; /* Ensure border remains */
  border-radius: 0.375rem !important; /* Maintain border radius */
}

          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px white inset; /* Desired background color */
            box-shadow: 0 0 0px 1000px white inset; /* Desired background color */
          }
        `}
            </style>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Admin username *
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 !text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password *
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                autoComplete="current-password"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#00475C] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#037FA4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
