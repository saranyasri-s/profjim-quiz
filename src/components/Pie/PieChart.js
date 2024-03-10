import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
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
    <div style={{ marginTop: "2rem", width: "15rem", height: "13rem" }}>
      <h4>{level}</h4>
      <canvas style={{ width: "13rem", height: "11rem" }} ref={chartRef} />
    </div>
  );
}

export default PieChart;
