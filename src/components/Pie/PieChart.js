import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { jsxAttribute } from "@babel/types";
function PieChart({ level, labels, data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ["#3cd70fd6", "#ff4c0cd6"],
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  return (
    <div
      style={{
        marginTop: "5rem",
        width: "15rem",
        height: "13rem",
        display:"flex",
        flexFlow:"column",
        justifyContent:"center",
        alignItems:"center",
marginBottom:"3rem"
      }}
    >
      <h4>{level}</h4>
      <canvas style={{ width: "13rem", height: "11rem", textAlign:"center" }} ref={chartRef} />
    </div>
  );
}

export default PieChart;
