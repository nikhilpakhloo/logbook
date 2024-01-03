import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import { PiTimer } from "react-icons/pi";
import { CiTempHigh } from "react-icons/ci";
import { MdOutlineVerticalAlignBottom } from "react-icons/md";
import { PiGasPump } from "react-icons/pi";
import Download from "./Download";

import download from "../assets/download.png";
export default function LogbookId() {
  const { shareid, logid } = useParams();
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://stagingapi.diveroid.com/v3/log/share/detail/${shareid}/${logid}`,
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
    const fetchData2 = async () => {
      try {
        const response = await fetch(
          `https://stagingapi.diveroid.com/v3/log/share/one-logbook/${shareid}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        // Do something with the data from the second API call
        setImg(jsonData.data);
      } catch (error) {
        console.error("Error fetching data from second API:", error);
      }
    };
    fetchData2();

    fetchData();
  }, [shareid, logid]);
  console.log("Image data", img);

  const { isDownloadable } = data;
  // console.log("download4545", isDownloadable)
  // const plotData = [];

  // time.forEach((elapsedTime, index) => {
  //     plotData.push({
  //         x: elapsedTime ? elapsedTime.toFixed(2) : '0.00',
  //         y: depth[index]
  //     });
  // });

  const text = ["Max Depth", "Dive Time", "Bottom Temp", "Gas Type"];
  const textLogo = [
    <MdOutlineVerticalAlignBottom />,
    <PiTimer />,
    <CiTempHigh />,
    <PiGasPump />,
  ];
  const textUnits = [
    data.log && data.log.MaxDepth ? `${data.log.MaxDepth}` : "",
    data.log && data.log.DiveTime ? `${data.log.DiveTime}` : "",
    data.log && data.log.BottomTemperature
      ? `${data.log.BottomTemperature}`
      : "",
    data.log && data.log.GasType ? `${data.log.GasType}` : "",
  ];

  const time =
    data.logdepthtimes && data.logdepthtimes.map((item) => item.ElapsedTime);
  // console.log("time", time);
  const depth =
    data.logdepthtimes && data.logdepthtimes.map((item) => item.Depth);
  // console.log("depth", depth);
  const Skeleton = () => (
    <div className="container mx-auto px-5 py-10">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <p className="my-2 text-3xl md:text-center font-nanum-square-neo"></p>
      <div className="flex justify-between mt-3 gap-3">
        <div>
          <span className="text-sm font-semibold bg-gray-300 w-16 h-4 rounded-full"></span>
        </div>
        <div className="">
          <span className="text-sm font-semibold bg-gray-300 w-20 h-4 rounded-full"></span>
          <span className="text-sm font-semibold ml-2 bg-gray-300 w-24 h-4 rounded-full"></span>
          <span className="text-sm font-semibold ml-2 bg-gray-300 w-24 h-4 rounded-full"></span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mt-8 md:place-items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <div className="p-2 rounded-md bg-white ">
              <div className="flex items-center">
                <div className="flex flex-col ">
                  <div className="flex items-center">
                    <span className="bg-gray-300 w-8 h-8"></span>
                    <span className="text-xl mx-2 bg-gray-300 w-16 h-8 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-40 md:h-96 md:w-auto mt-12 flex justify-center w-full bg-gray-300 rounded-md"></div>
      <div className="mt-4 flex justify-center flex-wrap gap-y-2"></div>
    </div>
  );
  const chartRef = useRef(null);

  useEffect(() => {
    if (!loading && data.log && data.log.logdepthtimes) {
      const ctx = chartRef.current.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0.0, "rgb(255, 255, 255)");
      gradient.addColorStop(0.5, "rgb(65, 105, 225)");

      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              data: [
                { x: "0.00", y: 0 },
                { x: "10.00", y: 12 },
                { x: "20.00", y: 24 },
                { x: "30.00", y: 12 },
                { x: "42.00", y: 0 },
              ],
              borderColor: gradient,
              backgroundColor: gradient,
              borderWidth: 2,
              pointRadius: 0,
              lineTension: 0.5,
              fill: true,
            },
          ],
        },
        options: {
          elements: {
            point: { radius: 0 },
          },
          plugins: { legend: { display: false } },
          scales: {
            y: {
              reverse: true,
              ticks: {
                fontColor: "rgba(0,0,0,0)",
                stepSize: 6,
                callback: function (value, index) {
                  return value + " " + "m";
                },
              },
              grid: {
                display: true,
                drawBorder: false,
              },
            },
            x: {
              ticks: {
                fontColor: "rgba(0,0,0,0)",
              },
              grid: {
                display: false,
                drawBorder: false,
              },
              scaleLabel: {
                display: true,
                labelString: "Time",
              },
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [loading, data.log && data.log.logdepthtimes]);

  const handleDownload = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "downloaded_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {loading ? (
        <>
          <Skeleton />
        </>
      ) : (
        <>
          <div className="container mx-auto px-5 py-10">
            <IoArrowBackSharp className="w-6 h-6 cursor-pointer" onClick={goBack}  />

            <h1 className="text-blue-400 font-bold md:text-center md  :text-2xl mt-6 font-spoka-han ">
              {data.log &&
                data.log.logbookentry &&
                data.log.logbookentry.divingmode &&
                data.log.logbookentry.divingmode.Name}
              's log
            </h1>

            <p className="my-2 text-3xl md:text-center pangram">
              {data.log &&
                data.log.logbookentry &&
                data.log.logbookentry.divingmode &&
                data.log.logbookentry.divingmode.Name}{" "}
              diving #{data.log && data.log.id}
            </p>

            <div className="flex gap-6 md:justify-center">
              <div className="">
                {data.log &&
                  data.log.StartsAt &&
                  data.log.StartsAt.split(" ")[0] && (
                    <span
                      className="text-sm font-semibold pangram"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {data.log &&
                        data.log.StartsAt &&
                        data.log.StartsAt.split(" ")[0]}
                    </span>
                  )}
              </div>
              <div className="">
                <span className="text-sm font-semibold pangram">
                  {data.log && data.log.divesite && data.log.divesite.Nation},
                </span>
                <span className="text-sm font-semibold ml-1 pangram">
                  {data.log &&
                    data.log.divesite &&
                    data.log.divesite.SiteLocation}
                  ,
                </span>
                <span className="text-sm font-semibold ml-1 pangram">
                  {data.log && data.log.divesite && data.log.divesite.SiteName}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-8 md:place-items-center">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="p-2 rounded-md bg-white ">
                    <div className="flex items-center">
                      <div className="flex flex-col ">
                        <span className="font-semibold text-gray-400 text-sm font-spoka-han">
                          {text[index]}
                        </span>
                        <div className="flex items-center">
                          <span className="">
                            <span className="text-2xl ">{textLogo[index]}</span>{" "}
                          </span>
                          <span className="text-xl mx-2">
                            {index === 0 && (
                              <span className="">
                                <span className="text-3xl pangram">
                                  {textUnits[index]}
                                </span>
                                <span className="text-sm mx-1">
                                  <span className="text-lg">m</span>
                                </span>
                              </span>
                            )}
                            {index === 1 && (
                              <span className="">
                                <span className="text-3xl">
                                  {textUnits[index]}
                                </span>
                                <span className="text-sm mx-1">
                                  <span className="text-lg">min</span>
                                </span>
                              </span>
                            )}
                            {index === 2 && (
                              <span className="">
                                <span className="text-3xl">
                                  {textUnits[index]}
                                </span>
                                <span className="text-sm mx-1">
                                  <span className="text-lg">℃</span>
                                </span>
                              </span>
                            )}
                            {index === 3 && (
                              <span className="">
                                <span className="text-3xl">
                                  {textUnits[index]}
                                </span>
                                <span className="text-sm mx-1">
                                  <span className="text-lg"></span>
                                </span>
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-100 flex justify-center ">
              <div className=" md:w-[400px] w-[300px] mt-12  ">
                <canvas id="myChart" ref={chartRef}></canvas>
              </div>
            </div>
          </div>
          <div className="mt-4 relative gap-y-2 gap-10 flex md:flex-row flex-wrap flex-col items-center md:justify-center">
            {img.sharemedia &&
              img.sharemedia.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo.logbookmedium.FileUrl}
                    alt={`Image ${index}`}
                    width={300}
                    className="rounded-xl"
                  />
                  {isDownloadable && (
                    <img
                      src={download}
                      alt="Download"
                      width={20}
                      height={20}
                      className="absolute top-3 right-5 cursor-pointer"
                      onClick={() =>
                        handleDownload(photo.logbookmedium.FileUrl)
                      }
                    />
                  )}
                </div>
              ))}
          </div>

          <Download />
        </>
      )}
    </>
  );
}
