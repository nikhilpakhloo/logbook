import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Download from "./Download";

export default function LogbookShare() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://stagingapi.diveroid.com/v3/log/share/0b956534-ff1a-49e0-850a-106525e110de",
          // `https://stagingapi.diveroid.com/v3/log/share/${id}`,
          {
            method: "GET",
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
  console.log(data);

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
 const memberName = data.map((item)=>(
  item.logbookentry.member.Name

 ))


  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 md:text-center">Diveroid</h1>
        <p className="mb-4 text-4xl pr-12 md:text-center font-nanum-square-neo">
          Take a look at {memberName}'s Dive Log
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
                to={`/detail/0b956534-ff1a-49e0-850a-106525e110de/${item.id}`}
                // to={`/detail/${id}/${item.id}`}
                key={index}
              >
                <div className="p-2 rounded-md flex mt-5">
                  <div className="flex justify-between ">
                    <img
                      src={
                        item.logdepthtimes &&
                        item.logdepthtimes[0]?.media[0]?.FileUrl
                      }
                      alt=""
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    <div className="flex flex-col mx-5">
                      <span className="font-nanum-square-neo">
                        {item.CreatedAt.split(" ")[0]}
                      </span>
                      <span className="font-bold ">
                        {item.logbookentry && item.logbookentry.divingmode.Name}{" "}
                        #{item.id}
                      </span>
                      <span className="text-gray-400 text-sm mt-1 font-semibold">
                        {item.divesite && item.divesite.SiteName
                          ? item.divesite.SiteName
                          : ""}{" "}
                      </span>
                    </div>
                    <div className="  flex items-center">
                      <FaAngleRight />
                    </div>
                  </div>
                </div>
                {index !== data.length - 1 && <hr className="border-2" />}
              </Link>
            ))
          )}
        </div>
      </div>
  <Download/>
    </>
  );
}
