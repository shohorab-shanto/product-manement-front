import React from "react";
import { Row, Col } from "react-bootstrap";
import StatisticsChartWidget from "./StatisticsChartWidget";

const Statistics = ({data, title}) => {
  return (
    <div>
      <Row>
        <Col sm={6} xl={4}>
          <StatisticsChartWidget
            title={title[0]}
            stats={data?.sell}
            trend={{
              textClass: "text-success",
              icon: "uil uil-arrow-up",
              // value: "10.21%",
            }}
            colors={["#727cf5"]}
          />
        </Col>

        <Col sm={6} xl={4}>
          <StatisticsChartWidget
            title={title[1]}
            stats={data?.buy}
            trend={{
              textClass: "text-danger",
              icon: "uil uil-arrow-down",
              // value: "5.05%",
            }}
            colors={["#f77e53"]}
          />
        </Col>
        <Col sm={6} xl={4}>
          <StatisticsChartWidget
            title={title[2]}
            stats={data?.profit}
            trend={{
              textClass: "text-danger",
              icon: "uil uil-arrow-down",
              // value: "5.05%",
            }}
            colors={["#0a0"]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
