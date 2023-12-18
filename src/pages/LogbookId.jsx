import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import demo from "../assets/demo1.webp";
import { PiTimer } from "react-icons/pi";
import { CiTempHigh } from "react-icons/ci";
import { MdOutlineVerticalAlignBottom } from "react-icons/md";
import { PiGasPump } from "react-icons/pi";
import Download from "./Download";
export default function LogbookId() {
  const { shareId, logid } = useParams();
  const [data, setData] = useState([]);
  console.log("Share id ", shareId);
  console.log("logid", logid);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://stagingapi.diveroid.com/v3/log/share/detail/${shareId}/${logid}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  const text = ["Max Depth", "Dive Time", "Bottom Temp", "Gas Type"];
  const textLogo = [
    <MdOutlineVerticalAlignBottom />,
    <PiTimer />,
    <CiTempHigh />,
    <PiGasPump />,
  ];
  const textUnits = [
    data.MaxDepth ? `${data.MaxDepth}` : "",

    data.DiveTime ? `${data.DiveTime}` : "",
    data.BottomTemperature ? `${data.BottomTemperature}` : "",
    data.GasType ? `${data.GasType}` : "",
  ];

  const chartRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div className="container mx-auto px-5 py-10">
        <Link to="/">
          {" "}
          <IoArrowBackSharp className="w-6 h-6" />
        </Link>

        <h1 className="text-blue-400 font-bold md:text-center md:text-2xl mt-6 font-nanum-square-neo">
          {data.DiveBuddy}'s log
        </h1>
        <p className="my-2 text-3xl md:text-center font-nanum-square-neo">
          {data.logbookentry && data.logbookentry.divingmode.Name} diving #
          {data.id}
        </p>
        <div className="flex justify-between mt-3 gap-3">
          <div>
            {data && data.StartsAt && data.StartsAt.split(" ")[0] && (
              <span
                className="text-sm font-semibold "
                style={{ whiteSpace: "nowrap" }}
              >
                {data && data.StartsAt && data.StartsAt.split(" ")[0]}
              </span>
            )}
          </div>
          <div className="">
            <span className="text-sm font-semibold">
              {data && data.divesite && data.divesite.Nation}
            </span>
            <span className="text-sm font-semibold ml-2">
              {data && data.divesite && data.divesite.SiteLocation}
            </span>
            <span className="text-sm font-semibold ml-2">
              {data && data.divesite && data.divesite.SiteName}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mt-8 md:place-items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="p-2 rounded-md bg-white ">
                <div className="flex items-center">
                  <div className="flex flex-col ">
                    <span className="font-semibold text-gray-400 text-sm">
                      {text[index]}
                    </span>
                    <div className="flex items-center">
                      <span className="">
                        <span className="text-2xl">{textLogo[index]}</span>{" "}
                      </span>
                      <span className="text-xl mx-2">
                        {index === 0 && (
                          <span className="">
                            <span className="text-3xl">{textUnits[index]}</span>
                            <span className="text-sm mx-1">
                              <span className="text-lg">m</span>
                            </span>
                          </span>
                        )}
                        {index === 1 && (
                          <span className="">
                            <span className="text-3xl">{textUnits[index]}</span>
                            <span className="text-sm mx-1">
                              <span className="text-lg">min</span>
                            </span>
                          </span>
                        )}
                        {index === 2 && (
                          <span className="">
                            <span className="text-3xl">{textUnits[index]}</span>
                            <span className="text-sm mx-1">
                              <span className="text-lg">℃</span>
                            </span>
                          </span>
                        )}
                        {index === 3 && (
                          <span className="">
                            <span className="text-3xl">{textUnits[index]}</span>
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
        <div className="h-40 md:h-96 md:w-auto mt-12 flex justify-center w-full">
          <canvas id="myChart" ref={chartRef}></canvas>
        </div>
      </div>
      <div className="mt-4 flex justify-center flex-wrap gap-y-2">
        {data.logdepthtimes &&
          data.logdepthtimes.map((entry, index) => (
            <img
              key={index}
              src={
                entry.media && entry.media.length > 0
                  ? entry.media[0].FileUrl
                  : ""
              }
              alt={`Image ${index}`}
              width={1000}
              className="rounded-xl"
            />
          ))}
      </div>
      <Download/>
    </>
  );
}
