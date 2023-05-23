import React from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { ApexOptions } from "apexcharts";

const PieChart = ({ pieChartData, labels, height, title }) => {
  const options = {
    labels: labels,
    legend: {
      show: false,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: 7,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  const series = pieChartData;

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mt-0 mb-3">{title}</h4>

        <Chart
          style={{ paddingTop: 25, paddingBottom: 25 }}
          options={options}
          series={series}
          type="pie"
          height={height - 50}
          className="apex-charts"
          dir="ltr"
        />
      </Card.Body>
    </Card>
  );
};

export default PieChart;
