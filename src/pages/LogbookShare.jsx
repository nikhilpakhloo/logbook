import React, { useState, useEffect } from "react";
import demo from "../assets/demo1.webp";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function LogbookShare() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://stagingapi.diveroid.com/v3/log/share/logbook-list",
          {
            method: "GET",
            headers: {
              accept: "*/*",
              "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWVtYmVyVW5pcXVlSWQiOiJhOTU4MzNkZi0zOWJiLTRlN2EtYTY3ZC1hODI4MjYwYjk0ZTkiLCJpc0d1ZXN0IjpmYWxzZSwiaWF0IjoxNjc2NDU4NTc2fQ.lWa2sW5cbGhQlFDpX3h4yGTrDDiP-6mMioMR1h-CDKI",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setData(jsonData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data)

  const Skeleton = () => (
    <div className="p-2 rounded-md flex animate-pulse">
      <div className="flex">
        <div
          className="bg-gray-300 rounded-lg"
          style={{ width: 100, height: 100 }}
        ></div>
        <div className="flex flex-col mx-5">
          <span className="bg-gray-300 block h-4 w-20 mb-2 rounded"></span>
          <span className="bg-gray-300 block h-5 w-40 mb-2 rounded"></span>
          <span className="bg-gray-300 block h-4 w-36 rounded"></span>
        </div>
        <div className="ml-auto flex items-center">
          <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 md:text-center">Diveroid</h1>
      <p className="mb-4 text-4xl pr-12 md:text-center">
        Take a look at Davin's Dive Log
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:mt-10">
        {loading ? (
          <>
          
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
       
          </>
        ) : (
          data.map((item, index) => (
            <Link
              to={`/userlog/${encodeURIComponent(JSON.stringify(item))}`}
              key={index}
            >
              <div className="p-2 rounded-md flex">
                <div className="flex">
                  <img
                    src={demo}
                    alt=""
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col mx-5">
                    <span>{item.CreatedAt}</span>
                    <span className="font-bold">{item.LogTitle}</span>
                    <span className="text-gray-500 text-sm mt-1">
                      {item.divesite && item.divesite.SiteLocation
                        ? item.divesite.SiteLocation
                        : ""}{" "}
                      |{" "}
                      {item.divesite && item.divesite.Nation
                        ? item.divesite.Nation
                        : ""}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center">
                    <FaAngleRight />
                  </div>
                </div>
              </div>
              {index !== data.length - 1 && <hr className="border-1" />}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
