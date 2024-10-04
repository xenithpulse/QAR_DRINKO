import React, { useState } from "react";

import "./contactpage.css";
import axios from "axios";
import { toast } from "react-toastify";

function ContactUsPage() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");

  const sendMessage = async (formdata) => {
    try {
      toast.loading("Sending message to admin.");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = `/api/v1/messages`;

      const { data } = await axios.post(url, formdata, config);

      if (data.success) {
        toast.dismiss();
        toast.success("Message have been send.");
        setEmail("");
        setname("");
        setmessage("");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Send message failed ");
    }
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    await sendMessage(formData);
  };

  return (
    <div id="contactus" className={` min-h-screen  text-black mb-24   `}>
      <section className="p-1 sm:p-6 lg:p-8">
        <div
          className={`grid items-center grid-cols-12 p-4 md:p-8 bg-[#01617E]  rounded-2xl`}
        >
          <div className="text-left col-span-full lg:col-span-7 xl:col-span-8 h-full shadow-md   flex items-center">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 xl:pl-32">
              <div className="lg:max-w-lg">
                <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
                  Contact Us
                </h2>
                <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
                  Get in touch with us for any inquiries or reservations.
                </p>
                
                <div className="grid gap-6 my-16">
                <p className="flex items-center  antialiased font-sans text-xl font-normal leading-relaxed text-white ">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-10 h-8 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  Zone 24, Street 950, Building 134, AL Muntazah ST, Doha, Qatar.
                </p>
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold !text-white">
                      +974-3102-7936
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold !text-white">
                      fitdrinktrading@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border text-gray-700 shadow-md w-full h-full px-0  md:px-32  py-12 text-left bg-gray-white col-span-full rounded-xl lg:col-span-5 lg:px-7 lg:py-40 xl:col-span-4">
            <form
              action="#"
              onSubmit={(e) => {
                handleContactFormSubmit(e);
              }}
            >
              <div className="mb-4">
                <div className="relative w-full h-11 !min-w-full">
                  <input
                    required={true}
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    type="text"
                    name="Name"
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown: placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md !text-white border-white focus:border-white"
                    placeholder=" "
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[&#x27; &#x27;] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[&#x27; &#x27;] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] !text-white peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white">
                    Enter your name{" "}
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <div className="relative w-full  h-11 !min-w-full">
                  <input
                    required={true}
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className=" peer w-full  bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md !text-white border-white focus:border-white"
                    placeholder=" "
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[&#x27; &#x27;] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[&#x27; &#x27;] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] !text-white peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white">
                    Enter your email{" "}
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <div className="relative w-full  sm:min-w-[200px]  ">
                  <textarea
                    name="Message"
                    value={message}
                    onChange={(e) => {
                      setmessage(e.target.value);
                    }}
                    className="extendable-textarea peer w-full  bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md !text-white border-white focus:border-white"
                    placeholder=" "
                  ></textarea>
                  <label className="flex w-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[&#x27; &#x27;] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[&#x27; &#x27;] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] !text-white peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white">
                    Your message here{" "}
                  </label>
                </div>
              </div>

              <div className="under-container">
                {/* <div className="inline-flex items-center">
                <label
                  className="relative flex items-center cursor-pointer p-3 rounded-full -ml-2.5"
                  for=":Ra:"
                >
                  <input
                   required={true}

                    type="checkbox"
                    className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[&#x27;&#x27;] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-gray-900 checked:border-gray-900 checked:before:bg-gray-900"
                    id=":Ra:"
                  />
                  <span className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="text-gray-700 font-light select-none cursor-pointer mt-px"
                  for=":Ra:"
                >
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-normal !text-gray-400">
                    You agree to{" "}
                    <a
                      href="#"
                      className="font-medium text-gray-600 hover:text-gray-900"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </label>
              </div> */}
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6"
                  type="submit"
                >
                  send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUsPage;
