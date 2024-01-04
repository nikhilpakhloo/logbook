import React, { useState, useEffect } from "react";
import arrowright from "../assets/ic_l_ArrowRight_g_16.svg";
import { Link, useParams } from "react-router-dom";
import Download from "./Download";
import logo from "../assets/img_logo_96.svg";

export default function LogbookShare(props) {
  const { data, loading, shareid, userid } = props;

  console.log("My data", data);
  console.log("SHare id", shareid);
  console.log("Userid", userid);
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

  return (
    <>
      <div className="container mx-auto px-4 py-8 xl:px-48 xl:py-8">
        <img src={logo} alt="" />
        {/* <p className="mb-4 text-[28px] pr-12 md:text-center font-spoka-han">
          Take a look at {memberName}'s Dive Log
        </p> */}
        <div className="w-[350px] h-[72px] mt-4">
          <p className="text-[28px] leading-[36px] tracking-[-0.28px] font-medium ">
            Take a look at <br /> {memberName}'s Dive Log
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center mt-8 md:mt-10  ">
          {loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : data.list &&
              data.list.map((item, index) => (
                <div
                  className="flex  "
                  key={index}
                >
                  {item.multiplelogbookshares &&
                    item.multiplelogbookshares.length > 0 && (
                      <React.Fragment>
                        <Link to={`/details/${shareid}/${item.id}`}>
                          <div className="flex gap-4 ">
                            <div className="w-[110px] h-[76px] ">
                            <img
                              src={
                                item.multiplelogbookshares[0]?.logbookmedium &&
                                item.multiplelogbookshares[0]?.logbookmedium
                                  .FileUrl
                              }
                              className="rounded-[8px]"
                           
                            
                            
                            />
                            </div>
                            <div className="flex flex-col mt-1 ">
                              <span className="pangram1 text-[13px] leading-[13px] font-medium">
                                {item.CreatedAt.split(" ")[0]}
                              </span>
                              <span className=" pangram1 text-[18px] leading-[28px]">
                                {item.logbookentry &&
                                  item.logbookentry.divingmode.Name}{" "}
                                #{item.id}
                              </span>
                              <span className="text-gray-400 text-[13px] font-normal leading-[16px]  font-spoka-han">
                                {item.divesite && item.divesite.SiteName
                                  ? item.divesite.SiteName
                                  : ""}
                              </span>
                            </div>
                            <div className="right-4 absolute mt-4" >
                              <img src={arrowright} alt=""  />
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
