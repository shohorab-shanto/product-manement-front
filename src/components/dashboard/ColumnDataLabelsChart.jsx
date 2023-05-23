import React from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { ApexOptions } from "apexcharts";

const ColumnDataLabelsChart = ({ data, categories, title }) => {
  const columnChartData = data;
  const options = {
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => {
        return val;
      },
      offsetY: -30,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: categories,
      position: "bottom",
      labels: {
        offsetY: -5,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        offsetY: -35,
      },
    },
    fill: {
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100],
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: (val) => {
          return val;
        },
      },
    },

    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#f1f3fa",
    },
  };

  const series = [
    {
      name: "Value",
      data: columnChartData,
    },
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mt-0 mb-3">{title}</h4>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={320}
          className="apex-charts"
          dir="ltr"
        />
      </Card.Body>
    </Card>
  );
};

export default ColumnDataLabelsChart;
