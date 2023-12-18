import React, { useState, useEffect } from "react";
import arrow from "../assets/arrow.png";
import cart from "../assets/cart.png";
import close from "../assets/close.png";
import backgroundImage from "../assets/background1.jpg";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [transparent, setTransparent] = useState(false);

  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled < 2) {
        setTransparent(true);
      } else {
        setTransparent(false);
      }
    };

    handleResize();
    handleScroll();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`  h-24 flex items-center sticky top-0 ${
        transparent ? "z-5" : ""
      }  ${transparent ? "shadow-none" : "shadow-lg"} ${
        transparent ? "bg-transparent" : "bg-primary"
      } ${transparent ? "border-none" : ""}`}
      style={{
        backgroundImage: transparent ? `url(${backgroundImage})` : "none",
      }}
    >
      {" "}
      <div className="flex w-1/2 justify-center items-center">
        <img src="./logo.png" alt="" className="h-12 w-12 mx-4" />
        <h1 className="text-white text-2xl font-semibold">DiveRoid.</h1>
      </div>
      {isMobile ? (
        <div className="flex w-1/2 justify-end items-center pr-4 ">
          <img src={cart} alt="" className="w-6 h-6 mr-5 " />
          <div className="block md:hidden ">
            <div className="w-8 h-6 flex flex-col justify-between cursor-pointer  ">
              {openMenu ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#4f00cebe] text-white flex justify-center items-center z-10 absolute top-8 left-10">
                    N
                  </div>
                  <img
                    src={arrow}
                    alt=""
                    className="w-5 h-5 ml-2 cursor-pointer z-10 absolute left-20 top-11"
                  />
                  <img
                    src={close}
                    alt=""
                    className="z-10 absolute top-8 right-4 w-8 h-8  "
                    onClick={handleOpen}
                  />
                </>
              ) : (
                <>
                  <div
                    className="flex flex-col w-8 h-8 justify-between cursor-pointer "
                    onClick={handleOpen}
                  >
                    <span className="w-full h-1 bg-white "></span>
                    <span className="w-7 h-0.5 bg-white"></span>
                    <span className="w-5 h-0.5 bg-white"></span>
                  </div>
                </>
              )}
            </div>
            {openMenu && (
              <div
                className={`${
                  openMenu ? "top-0" : "top-0"
                } overflow-hidden transition-all duration-500 absolute right-0 bg-primary py-2 px-4 shadow-md text-white w-full h-screen flex flex-col items-center  `}
              >
                <ul className="flex gap-10 flex-col items-center p-20 ">
                  <li className="text-2xl">FAQ</li>
                  <li className="text-2xl">Portfolio</li>
                  <li className="text-2xl">
                    <span className="flex">
                      <span>Book</span>
                      <span className="ml-1">Online</span>
                    </span>
                  </li>
                </ul>
                <button className="text-white bg-violet-500 px-7 py-2 rounded-3xl  shadow-violet-drop hover:bg-white hover:text-black w-40 -mt-10">
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:flex w-1/2 justify-end items-center">
            <ul class="flex gap-6">
              <li class="cursor-pointer transition duration-500 ease-in-out hover:text-violet-500">
                FAQ
              </li>
              <li class="cursor-pointer transition duration-500 ease-in-out hover:text-violet-500">
                Portfolio
              </li>
              <li class="cursor-pointer transition duration-500 ease-in-out hover:text-violet-500">
                Book Online
              </li>
            </ul>
          </div>

          <div className="hidden md:flex w-1/2 justify-center items-center">
            <div className="w-8 h-8 rounded-full bg-[#4f00cebe] text-white flex justify-center items-center">
              N
            </div>
            <img src={arrow} alt="" className="w-4 h-4 ml-2 cursor-pointer" />
            <img src={cart} alt="" className="w-7 h-7 ml-5" />
            <button className="text-white bg-violet-500 px-7 py-2 rounded-3xl ml-4 shadow-violet-drop hover:bg-white hover:text-black">
              Buy Now
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
