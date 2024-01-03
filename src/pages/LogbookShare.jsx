import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Download from "./Download";

export default function LogbookShare(props) {
  const { data, loading, shareid, userid } = props;

  console.log("My data", data);
  console.log("SHare id", shareid);
  console.log("Userid", userid)
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
  const memberName =
    data && data.list
      ? data.list.map((item) => item.logbookentry.divingmode.Name)
      : [];
  const { isdownloadable } = data;

  return (
    <>
      <div className="container mx-auto px-4 py-8 xl:px-48 xl:py-8">
        <h1 className="text-2xl font-bold mb-3 md:text-center">Diveroid</h1>
        <p className="mb-4 text-[28px] pr-12 md:text-center font-spoka-han">
          Take a look at {memberName}'s Dive Log
        </p>

        <div className="flex flex-col md:flex-row md:flex-wrap justify-center md:mt-10 ">
          {loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : data.list &&
              data.list.map((item, index) => (
                <div
                  className="p-2 rounded-md flex flex-col md:flex-row mt-5 md:mr-8 gap-5"
                  key={index}
                >
                  {item.multiplelogbookshares &&
                    item.multiplelogbookshares.length > 0 && (
                      <React.Fragment >
                        <Link to={`/details/${shareid}/${item.id}`}>
                        <div className="flex justify-between">
                          <img
                            src={
                              item.multiplelogbookshares[0]?.logbookmedium &&
                              item.multiplelogbookshares[0]?.logbookmedium
                                .FileUrl
                            }
                            alt=""
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                          <div className="flex flex-col mx-5">
                            <span className="pangram">
                              {item.CreatedAt.split(" ")[0]}
                            </span>
                            <span className="font-bold pangram1">
                              {item.logbookentry &&
                                item.logbookentry.divingmode.Name}{" "}
                              #{item.id}
                            </span>
                            <span className="text-gray-400 mt-1 spoka">
                              {item.divesite && item.divesite.SiteName
                                ? item.divesite.SiteName
                                : ""}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaAngleRight />
                          </div>
                        </div>
                        </Link>
       
                      </React.Fragment>
                    )}
                </div>
              ))}
        </div>
      </div>
      <Download />
    </>
  );
}
