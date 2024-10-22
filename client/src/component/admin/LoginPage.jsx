import React, { useEffect, useState } from "react";
import useMe from "../../context/meContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function LoginPage() {
  const { isAuthenticated, fetchMe } = useMe();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [success, setsuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Logging in...");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `/api/v1/login/admin`;

      const { data } = await axios.post(url, { username:username.toLowerCase(), password }, config);

      console.log(data);
      toast.dismiss();
      toast.success("Login Successfull");
      await fetchMe();
      setsuccess(true);
    } catch (error) {
      setsuccess(false);
      setError(true);
      toast.dismiss();
      toast.error(error.response.data.message || "Login failed");
    }
  };

  useEffect(() => {
    console.log("usestate of login page");

    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }

    // if(error){
    //     setError(false);
    // }
  }, [success, error]);

  return (
    <div className="flex pt-20 bg-white h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to Admin Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={(e) => {
            handleLoginSubmit(e);
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
                  setUsername(e.target.value);
                }}
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
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a admin?{" "}
          <a
            href="/#contactus"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Request Admin to make admin.
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
