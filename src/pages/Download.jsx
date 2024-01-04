import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Download() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width <= 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      {isSmallScreen && (
        <div className="fixed bottom-5 left-0 right-0 z-10 text-center mx-2 bg-white">
          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="flex items-center">
              <img src={logo} alt="" width={30} height={30} />
              <span className="ml-2 text-sm ">
                Enjoy Diving with DIVEROID!
              </span>
            </div>
            <div>
              <Link
                to="https://play.google.com/store/search?q=diveroid&c=apps&hl=en-IN"
                target="_blank"
              >
                <button className="px-2 py-1 bg-blue-500 rounded-md text-white">
                  <span className="">Download</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
