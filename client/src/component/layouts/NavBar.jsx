import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useME from "../../context/meContext";
import "./navbar.css";
function NavBar() {
  const { isAuthenticated, fetchMe } = useME();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isNavBarOpen, setNavBarOpen] = useState(false);

  const handleMenuBtn = () => {
    setNavBarOpen((prevIsNavBarOpen) => !prevIsNavBarOpen);
  };

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...");
      const url = `/api/v1/logout`; // Adjust URL based on your backend endpoint for logout

      await axios.post(url); // Assuming logout endpoint doesn't require any payload

      // Perform any necessary cleanup or state resets here
      setSuccess(false);
      setError(null);
      toast.dismiss();
      toast.success("Logout Successful");
      await fetchMe();

      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      setError(true);
      toast.dismiss();
      toast.error(error.response.data.message || "Logout failed");
    }
  };

  const handleNavigation = (id) => {
    handleMenuBtn();
    if (window.location.pathname === "/") {
      // If already on homepage, scroll to #services
      const servicesElement = document.getElementById(id);
      servicesElement.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");

      setTimeout(() => {
        const servicesElement = document.getElementById(id);
        if (servicesElement) {
          servicesElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const navbar = document.getElementById("nav-bar");
    const threshold = 70;
    let scrollDiff = 0;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollChange = scrollTop - lastScrollTop;

      // Accumulate the scroll difference
      scrollDiff += scrollChange;

      // If scrolled more than the threshold, hide or show the navbar
      if (scrollDiff > threshold) {
        navbar.style.top = "-100%";
        scrollDiff = 0; // Reset scroll difference after hiding
      } else if (scrollDiff < -threshold) {
        navbar.style.top = "0%";
        scrollDiff = 0; // Reset scroll difference after showing
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {}, [success, error, isAuthenticated]);

  return (
    <div
      style={{
        // boxShadow: " rgba(105, 10, 176, 0.7) 0px 0px 15px"
        boxShadow:
          " rgba(0, 0, 0, 0.5) 100px 700px 300px, rgba(0, 0, 0, 0.27) 0px 10px 10px",
      }}
      id="nav-bar"
      className={`fixed   flex top-0 left-0 z-[999] bg-[#0285AD] lg:px-12 max-w-screen w-screen  nav-bar justify-between   px-4 py-4`}
    >
      <button
        onClick={() => {
          handleNavigation("homePage");
        }}
        className="text-white cursor-pointer  logo  font-bold text-3xl"
      >
        <img
          src={
            "https://res.cloudinary.com/dvobpdvef/image/upload/v1721207197/Important%20Data/lsockmshbnph7m6eo6fn.png"
          }
          alt=""
          className="w-[150px] "
        />
      </button>

      <div className={`btn  flex justify-center items-center gap-3 `}>
        <div
          onClick={handleMenuBtn}
          className={` open-menu-button  cursor-pointer mdd:hidden w-[30px] flex flex-col gap-2 ${
            isNavBarOpen ? "hidden" : "flex"
          } `}
        >
          <div className="linee  border-t-[3px] border-white"></div>
          <div className="linee  border-t-[3px] border-white"></div>
          <div className="linee  border-t-[3px] border-white"></div>
        </div>

        <div
          onClick={handleMenuBtn}
          className={`close-menu-button cross-container h-8 flex justify-center items-center cursor-pointer mdd:hidden w-[30px]  ${
            isNavBarOpen ? "block" : "hidden"
          }   mdd:hidden w-[15px] `}
        >
          <div className="line line1 bg-white"></div>
          <div className="line line2 bg-white"></div>
        </div>
      </div>

      <div
        className={`mobile-nav-menu px-7  left-0 w-full absolute  mdd:hidden mt-12 pt-12 pb-24  gap-4 
          text-black border-zinc-100 transform transition-transform duration-500 ${
            isNavBarOpen ? "translate-y-0" : "-translate-y-[150%]"
          } mdd:hidden overflow-hidden flex flex-col py-2 border-t-[1px]  w-[90%]`}
      >
        {[
          { name: "Home  ", href: "homePage" },
          { name: "Products", href: "products" },
          { name: "Services", href: "services" },
          { name: "About Us", href: "about-us" },
          { name: "contact us", href: "contactus" },
        ].map((e, idx) => (
          <div
            key={idx}
            className="group overflow-hidden  py-[2px] relative w-fit px-4"
          >
            <>
              <button
                onClick={() => {
                  handleNavigation(e.href);
                }}
                className="relative  uppercase text-xl font-sans font-semibold leading-none tracking-tighter "
              >
                {e.name}

                <span
                  className={`span1  transition-transform duration-300 ease-in-out    absolute w-full h-[4px] bg-white bottom-0 left-0`}
                ></span>

                <span
                  className={`span2  transition-transform duration-300 ease-in-out    absolute w-full  h-[4px] bg-white bottom-0 left-0`}
                ></span>
              </button>
            </>
          </div>
        ))}

        {isAuthenticated && (
          <>
            <div className="group overflow-hidden  py-[2px] relative w-fit px-4">
              <>
                <Link
                  to={"/admin/dashboard"}
                  onClick={() => {
                    handleMenuBtn();
                  }}
                  className="relative  uppercase text-xl font-sans font-semibold leading-none tracking-tighter "
                >
                  Admin Dashboard
                  <span
                    className={`span1  transition-transform duration-300 ease-in-out    absolute w-full h-[4px] bg-white bottom-0 left-0`}
                  ></span>
                  <span
                    className={`span2  transition-transform duration-300 ease-in-out    absolute w-full  h-[4px] bg-white bottom-0 left-0`}
                  ></span>
                </Link>
              </>
            </div>
            <div className="group overflow-hidden  py-[2px] relative w-fit px-4">
              <>
                <a
                  href={`/#`}
                  onClick={handleLogout}
                  className="relative  uppercase text-xl font-sans font-semibold leading-none tracking-tighter "
                >
                  Logout
                  <span
                    className={`span1  transition-transform duration-300 ease-in-out    absolute w-full h-[4px] bg-white bottom-0 left-0`}
                  ></span>
                  <span
                    className={`span2  transition-transform duration-300 ease-in-out    absolute w-full  h-[4px] bg-white bottom-0 left-0`}
                  ></span>
                </a>
              </>
            </div>
          </>
        )}
      </div>
      {/* Desktop options */}
      <div
        className={` w-full desktop-options font-light gap-3 font-['NeueMontreal'] h-[35px] mdd:flex  hidden   `}
      >
        <div className="absolute desktop-options flex top-[50%] -translate-y-[50%] left-[50%] h-[35px] w-fit -translate-x-[50%] ">
          {[
            { name: "Home", href: "homePage" },
            { name: "Products", href: "products" },
            { name: "Services", href: "services" },
            { name: "About Us", href: "about-us" },
            { name: "contact us", href: "contactus" },
          ].map((o, idx) => {
            if (idx < 4) {
              return (
                <div
                  key={idx + 100}
                  className={`option-box relative text-white   
                    ml-6 min-w-fit  text-[20px] overflow-hidden `}
                >
                  <div
                    className={`up-down-box   relative h-full  cursor-pointer flex justify-center   translate-y-[45%]   flex-col  transition-transform duration-300`}
                  >
                    (
                    <>
                      <button
                        onClick={() => {
                          handleNavigation(o.href);
                        }}
                      >
                        {o.name}
                      </button>
                      <button
                        onClick={() => {
                          handleNavigation(o.href);
                        }}
                      >
                        {o.name}
                      </button>{" "}
                    </>
                    )
                  </div>
                  <span
                    className={`absolute  bg-white bottom-0 -translate-x-[110%] transition-transform duration-300 ease-in-out   w-full h-[2px] `}
                  ></span>
                </div>
              );
            }
          })}
        </div>
        {/* Part 2 */}
        <div className="absolute desktop-options flex top-[50%] -translate-y-[50%] right-0 -translate-x-[50%] h-[35px] w-fit ">
          {[
            { name: "Home", href: "" },
            { name: "Products", href: "products" },
            { name: "Services", href: "services" },
            { name: "About Us", href: "about-us" },
            { name: "contact us", href: "contactus" },
          ].map((o, idx) => {
            if (idx > 3) {
              return (
                <div
                  key={idx + 100}
                  className={`option-box relative text-white   
                    ml-6 min-w-fit  text-[20px] overflow-hidden `}
                >
                  <div
                    className={`up-down-box   relative h-full  cursor-pointer flex justify-center   translate-y-[45%]   flex-col  transition-transform duration-300`}
                  >
                    (
                    <>
                      <a href={`/#${o.href}`}>{o.name}</a>
                      <a href={`/#${o.href}`}>{o.name}</a>{" "}
                    </>
                    )
                  </div>
                  <span
                    className={`absolute  bg-white bottom-0 -translate-x-[110%] transition-transform duration-300 ease-in-out   w-full h-[2px] `}
                  ></span>
                </div>
              );
            }
          })}
          {isAuthenticated && (
            <button
              className={` logout flex justify-center items-center ml-2 -mr-4 space-x-3`}
            >
              {/* Dashboard button */}
              <svg
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
                width="100%"
                height="100%"
                viewBox="0 -0.5 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>

              {/* Logout button */}
              <svg
                onClick={handleLogout}
                width="100%"
                height="90%"
                viewBox="0 0 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#ffffff"
                  strokeWidth="0.048"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M21 12L13 12"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
