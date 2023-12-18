import React, { useEffect, useRef } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import demo from "../assets/demo1.webp";
import { PiTimer } from "react-icons/pi";
import { CiTempHigh } from "react-icons/ci";
import { MdOutlineVerticalAlignBottom } from "react-icons/md";
import { PiGasPump } from "react-icons/pi";
export default function LogbookId() {
  const { itemData } = useParams();
  const item = JSON.parse(decodeURIComponent(itemData));

  const text = ["Max Depth", "Dive Time", "Bottom Temp", "Gas Type"];
  const textLogo = [
    <MdOutlineVerticalAlignBottom />,
    <PiTimer />,
    <CiTempHigh />,
    <PiGasPump />,
  ];
  const textUnits = ["24 ", "42 ", "28", "Ean21"];

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
      <div className="container mx-auto px-4 py-10">
        <Link to="/">
          {" "}
          <IoArrowBackSharp className="w-6 h-6" />
        </Link>
        <h1 className="text-blue-400 font-bold md:text-center md:text-2xl">Davin's log</h1>
        <p className="my-2 text-3xl md:text-center">{item.LogTitle}</p>

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
                      <span className=""><span className="text-2xl">{textLogo[index]}</span> </span>
                      <span className="text-xl mx-2">
                        {index === 0 && (
                          <span className="">
                            <span className="text-3xl">{textUnits[index]}</span>
                            <span className="text-sm mx-1"><span className="text-lg">m</span></span>
                          </span>
                        )}
                        {index === 1 && (
                          <span className="">
                            <span className="text-3xl">{textUnits[index]}</span>
                            <span className="text-sm mx-1"><span className="text-lg">min</span></span>
                          </span>
                        )}
                        {index === 2 && (
                          <span className="">
                            <span className="text-3xl">{textUnits[index]}</span>
                            <span className="text-sm mx-1"><span className="text-lg">℃</span></span>
                          </span>
                        )}
                        {index === 3 && (
                          <span className="">
                            <span className="text-3xl">{textUnits[index]}</span>
                            <span className="text-sm mx-1"><span className="text-lg">[Air]</span></span>
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
      <div className="mt-4 flex justify-center ">
        <img src={demo} alt="" width={1000} className="rounded-xl" />
      </div>
    </>
  );
}
