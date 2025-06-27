import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

//2xl:left-[33em] 2xl:w-80 2xl:items-start
//bg-black/40

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen overflow-hidden bg-[url('../home6.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="max-2xl:bg-black/40 w-full flex justify-center items-center text-white h-screen">
        <div className="flex flex-col  items-center justify-center gap-8 lg:gap-10 max-lg:mt-40 lg:mt-[4em] xl:mt-[5em] relative 2xl:left-[33em] 2xl:w-80 2xl:items-start">
          <p className="font-extrabold text-6xl lg:text-7xl xl:text-8xl max-lg:px-20 uppercase">
            Roam. Rest. Repeat.
          </p>
          <p className="max-lg:px-20 max-lg:text-base max-md:tracking-wide max-md:leading-5 text-justify">
            ❝ Creating a Global Community Where Every Traveler Finds Not Just a
            Place to Stay, But a Moment to Truly Live ❞
          </p>
          <button
            className="cursor-pointer text-xl inline-flex items-center gap-2 p-2 font-extrabold lg:p-3 hover:shadow-md hover:shadow-white shadow-inner shadow-white active:translate-y-2 transition-all duration-100"
            onClick={() => {
              navigate("/explore");
            }}
          >
            explore <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
