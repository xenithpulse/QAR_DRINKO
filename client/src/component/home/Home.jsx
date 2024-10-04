import React from "react";
import ServicesPage from "../services/ServicesPage";
import AboutUsPage from "./AboutUs/AboutUsPage";
import ContactUsPage from "./Contact/ContactUsPage";
import LandingPage from "./landingpage/LandingPage";
import HomeProducts from "./products/HomeProducts";
import Loader from "../../component/layouts/Loader/Loader"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
function Home({loading}) {

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);


  return (
    <div id="homePage">
      <LandingPage />
      <>
      { loading ? <Loader/>  : 
       
       <> <HomeProducts/>
      </>
      }
       <ServicesPage/>
       <AboutUsPage />
       <ContactUsPage/>
      </>
   
      </div>
  );
}

export default Home;
