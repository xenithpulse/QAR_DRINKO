import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

function ServicesPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const containerRef = useRef();
  let container;
  useGSAP(() => {
    const cards = document.querySelectorAll(".service-card");

    cards.forEach((card, index) => {
      gsap.from(card, {
        y: "30%",
        opacity: 0,
        stagger: 0.4,
        scrollTrigger: {
          trigger:card,
         
          start:"top 60%", 
          end: "+=90",
        
        
          scrub: 1, 
         
        },
      });
    });

    gsap.to("#animation-line-services-down", {
      y: "100%",
      scrollTrigger: {
        trigger: "#animation-line-services-up",
        scroller: "body",
        start: "top 50%",
        end: "top 0%",

        scrub: true,
      },
    });
  },{scope:container});


  
  useEffect(() => {
    container = containerRef.current;
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const services = [
    {
      img: "https://res.cloudinary.com/dvobpdvef/image/upload/f_auto,q_auto/v1/Important%20Data/rbdysgrq8uinu2raibcd",
      name: "Quarterly and Semi-Annual Maintenance",
      title: "Quarterly and Semi-Annual Maintenance",
      description:
        "Regular checkups for 3-stage and 5-stage osmosis systems to keep them running smoothly. Our expert technicians conduct thorough inspections and perform necessary adjustments, ensuring optimal performance and longevity. Enjoy peace of mind knowing your water is always pure and safe.",
    },
    {
      img: "https://res.cloudinary.com/dnibqnawe/image/upload/f_auto,q_auto/v1/FitAndDrink/pgv5f8kvpqvrwxnuxcdf",
      title: "Installation Services",
      name: "Installation Services",
      description:
        "Professional installation of new filtration systems for optimal performance. Our skilled team ensures a seamless setup, tailored to your specific needs and home environment. With Fit and Drink, you can trust that your system will be installed correctly and efficiently, providing you with the best water quality from day one",
    },
    {
      img: "https://res.cloudinary.com/dnibqnawe/image/upload/f_auto,q_auto/v1/FitAndDrink/sl3j3dueufp8xnwalb4f",
      name: "System Upgrades:",
      title: "System Upgrades",
      description:
        "Enhance your existing setup with the latest filtration technology for improved efficiency and better-tasting water. Our upgrades ensure your system stays ahead of the curve, delivering the highest quality water for you and your family",
    },
    {
      img: "https://res.cloudinary.com/dvobpdvef/image/upload/f_auto,q_auto/v1/Important%20Data/ugxhswrkpuviqtbpvbsh",
      name: "Emergency Repairs",
      title: "Emergency Repairs",
      description:
        " Fast, reliable repair services to address any unexpected issues. Our responsive team is ready to tackle any problem, ensuring minimal disruption to your water supply. Trust Fit and Drink to get your system back to peak performance quickly and efficiently.",
    },
    {
      img: "https://res.cloudinary.com/dvobpdvef/image/upload/f_auto,q_auto/v1/Important%20Data/giedivhneqxouo3qmmix",
      name: "Water Quality Testing",
      title: "Water Quality Testing",
      description:
        "Comprehensive testing to ensure your water meets the highest standards. Our detailed water quality assessments identify any contaminants and provide solutions for cleaner, safer water. With Fit and Drink, you can be confident that every drop is pure and healthy.",
    },
  ];

  return (
    <>
      <div ref={containerRef} id="services"  className="relative">
        <div  className="services-container   mt-10 pb-16 ">
          <h1 className="text-3xl bg-slate-100 py-6 text-center font-semibold md:font-bold my-8  md:text-4xl">
            What We Offer
          </h1>
          {/* Service multiple cards */}
          <div className="services-cards space-y-20  lg:space-y-12 w-[90%] lg:w-[75%] mx-auto  h-full">
            {services.map((s, idx) => {
              return (
                <div key={idx}>
                  {/* Service Card  */}

                  {windowWidth > 768 ? (
                    <>
                      {idx % 2 === 0 ? (
                        <>
                          <div className="service-card  md:flex ">
                            {/* image */}
                            <div
                              className="service-image  rounded-xl overflow-hidden w-[96%] sm:w-[60%] md:w-[40%] sm:h-[300px] md:h-[400px]  mx-auto "
                              style={{
                                // boxShadow: " rgba(105, 10, 176, 0.7) 0px 0px 15px"
                                boxShadow:
                                  " rgba(0, 0, 0, 0.5) 7px 10px 15px, rgba(0, 0, 0, 0.27) 0px 10px 10px",
                              }}
                            >
                              <img
                                src={s.img}
                                alt="service"
                                className="w-full h-full "
                              />
                            </div>
                            {/* content */}
                            <div className="service-content   flex flex-col items-center md:items-start md:justify-center  md:pl-12 md:text-start py-7 md:w-[60%] space-y-4">
                              <h2 className="service-title leading-7 text-4xl md:text-5xl font-bold text-center md:text-start  mb-3">
                                {s.title}
                              </h2>
                              <p className="service-description w-[80%] md:w-full mx-auto md:text-lg text-center md:text-start ">
                                {s.description}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="service-card  md:flex ">
                            {/* content */}
                            <div className="service-content   flex flex-col items-center md:items-start md:justify-center  md:pr-12 md:text-start py-7 md:w-[60%] space-y-4">
                              <h2 className="service-title leading-7 text-4xl md:text-5xl font-bold text-center md:text-start  mb-3">
                                {s.title}
                              </h2>
                              <p className="service-description w-[80%] md:w-full mx-auto md:text-lg text-center md:text-start ">
                                {s.description}
                              </p>
                            </div>
                            {/* image */}
                            <div
                              className="service-image bg-black rounded-xl overflow-hidden w-[96%] sm:w-[60%] sm:h-[300px] md:h-[400px] md:w-[40%]   mx-auto "
                              style={{
                                // boxShadow: " rgba(105, 10, 176, 0.7) 0px 0px 15px"
                                boxShadow:
                                  " rgba(0, 0, 0, 0.5) -7px 10px 15px, rgba(0, 0, 0, 0.27) 0px 10px 10px",
                              }}
                            >
                              <img
                                src={s.img}
                                alt="service"
                                className="w-full h-full "
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="service-card  md:flex">
                        {/* image */}
                        <div
                          className="service-image bg-slate-200 rounded-xl overflow-hidden w-[96%] sm:w-[60%] md:w-[40%] min-h-[200px]  mx-auto "
                          style={{
                            // boxShadow: " rgba(105, 10, 176, 0.7) 0px 0px 15px"
                            boxShadow:
                              " rgba(0, 0, 0, 0.5) 0px 3px 15px, rgba(0, 0, 0, 0.27) 0px 10px 10px",
                          }}
                        >
                          <img
                            src={s.img}
                            alt="service"
                            className="w-full h-full"
                          />
                        </div>
                        {/* content */}
                        <div className="service-content   flex flex-col items-center md:items-start md:justify-center  md:pl-12 md:text-start py-7 md:w-[60%] space-y-4">
                          <h2 className="service-title leading-9 text-4xl md:text-5xl font-bold text-center md:text-start  mb-3">
                            {s.title}
                          </h2>
                          <p className="service-description w-[80%] md:w-full mx-auto md:text-lg text-center md:text-start ">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* space div*/}
        <div
          className="  mt-[150px] mb-[60px] md:mt-[200px]  "
          style={{
            height: "40vh",

            // boxShadow: "rgba(105, 10, 176, 0.3) 0px 0px 5px",
          }}
        ></div>

        {/* Animatioin lines */}
        <div
          id="animation-line-services-up"
          className="animation-line-services-up absolute bottom-0 right-[50%] overflow-hidden  "
          style={{
            width: "3px",
            borderRadius: "70%",
            margin: "100px  auto 100px auto",
            height: "40vh",
            background: "blue",

            // boxShadow: "rgba(105, 10, 176, 0.3) 0px 0px 5px",
          }}
        >
          <div
            id="animation-line-services-down"
            className={`animationline w-full h-full absolute b   bg-[#c0bdbd] `}
          ></div>
        </div>
      </div>
    </>
  );
}

export default ServicesPage;
