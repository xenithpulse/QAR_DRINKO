import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Adminmessages() {
  const [messages, setmessages] = useState(null);
  const [success, setsuccess] = useState(false);
  const [loading, setloading] = useState(false);

  const fetchMessages = async () => {
    try {
      setloading(true);

       const url = `/api/v1/messages`
      const { data } = await axios.get(url);

      if (data.success) {
    
        setmessages(data.messages);
      }
    } catch (error) {
      
    } finally {
      setloading(false);
    }
  };
  const handleDeleteMessage = async (id) => {
   
    try {
      toast.loading("Delting message");
      
      const url = `/api/v1/messages/${id}`

      const { data } = await axios.delete(
        url
      );

      toast.dismiss();
      if (data.success) {
       
        toast.success("Message deleted successfully");
        setsuccess(true);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Message delition failed.");
   
      setsuccess(false);
    } finally {
      
      setloading(false);
    }
  };

 

  useEffect(() => {
    if (messages && window.innerWidth < 756) {
      const element = document.getElementById("admin-sessages-section");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);
  useEffect(() => {
  
    fetchMessages();

    if (success) {
      setsuccess(false);
    }
  }, [success]);

  return ( 
    <>
      {!loading && (
        <>
          {messages && (
            <>
              <section className="w-full ">
                <div  id="admin-sessages-section"  className="container mx-auto">
                  <div className=" text-center">
                    <h1 className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 mb-4 text-3xl !leading-snug lg:text-4xl">
                      Users Messages
                    </h1>
                  </div>
                  <div className="mx-auto w-full space-y-7">
                    {/* Faq */}

                    {messages.map((m,idx) => {
                      return (
                        <div key={idx} className="block relative w-full px-3 md:px-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              
                              const siblingDiv =
                                e.currentTarget.nextElementSibling;
                              siblingDiv.style.height =
                                siblingDiv.clientHeight === 0 ? "100%" : "0";
                            }}
                            onMouseEnter={(e) => {
                              const siblingDiv =
                                e.currentTarget.nextElementSibling;
                              siblingDiv.style.height =
                                siblingDiv.clientHeight === 0 ? "100%" : "0";
                            }}
                            onMouseLeave={(e) => {
                              const siblingDiv =
                                e.currentTarget.nextElementSibling;
                              siblingDiv.style.height =
                                siblingDiv.clientHeight === 0 ? "100%" : "0";
                            }}
                            className="flex justify-between items-center w-full py-4 border-b border-b-blue-gray-100 antialiased font-sans text-xl font-semibold leading-snug select-none hover:text-blue-gray-900 transition-colors text-left text-gray-900"
                          >
                            <div className="space-x-2">
                              <span className="md:border-r-2 pr-3 border-black">
                                {m.name}
                              </span>
                              <a
                                className="hidden md:inline underline"
                                href={`mailto:${m.email}`}
                              >
                                {m.email}
                              </a>
                            </div>

                            <span className="space-x-2 pr-3">
                              <span className="px-2  text-sm">
                                {m.createdAt.substring(0, 10)}
                              </span>
                              <span
                                className="underline text-sm text-red-500"
                                onClick={() => {
                                  handleDeleteMessage(m._id);
                                }}
                              >
                                delete
                              </span>
                            </span>
                          </button>
                          <div
                            className="overflow-hidden h-0"
                            data-projection-id="7"
                          >
                            <div
                              className="block w-full py-4 text-gray-700 antialiased font-sans text-sm font-light leading-normal"
                              data-projection-id="8"
                            >
                              <a
                                className="block md:hidden text-center underline"
                                href={`mailto:${m.email}`}
                              >
                                {m.email}
                              </a>

                              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-gray-500">
                                {m.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Adminmessages;
