import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardService from "services/DashboardService";

import ColumnDataLabelsChart from "components/dashboard/ColumnDataLabelsChart";
import PieChart from "components/dashboard/PieChart";
import ScrollableTable from "components/dashboard/ScrollableTable";
import Statistics from "components/dashboard/Statistics";
import moment from "moment";

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});
  const [monthlyReport, setMonthlyReport] = useState({});
  const [topSellingProductbyMonth, setTopSellingProductbyMonth] = useState({
    data: [],
    label: [],
  });
  const [stockAlert, setStockAlert] = useState({ headers: [], data: [] });
  const [topSellingProductbyYear, setTopSellingProductbyYear] = useState({
    data: [],
    label: [],
  });
  const [recentSales, setRecentSales] = useState({ headers: [], data: [] });
  const [topCustomers, setTopCustomers] = useState({ data: [], label: [] });

  const getStatistics = async () => {
    const res = await DashboardService.getStatisticsData();
    setStatistics(res);
  };

  const getMonthlyReport = async () => {
    var res;
    var carr = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };
    var data = [];
    var label = [];
    try {
      res = await DashboardService.getMonthlyData();
      carr = { ...carr, ...res.monthly };
    } catch (error) {
      console.log(error);
    }

    for (var name in carr) {
      data.push(carr[name]);
      label.push(name);
    }

    setMonthlyReport({ label: label, data: data });
  };

  const getTopSellingProductbyMonth = async () => {
    const res = await DashboardService.getTopProductSellingByMonth();
    var data = [];
    res.forEach((element) => {
      data.push({
        id: element?.part_id,
        name: element?.name[0],
        value: element?.totalSell,
      });
    });

    setTopSellingProductbyMonth({
      data: data,
      headers: ["SL", "Product Name", "Total"],
    });
  };

  const getStockAlert = async () => {
    const res = await DashboardService.getStockData();
    var data = [];
    res.forEach((element) => {
      data.push({
        id: element?.part_id,
        name: element?.name,
        warehouse: element?.warehouse,
        remaining: Math.floor(element?.unit_value),
      });
    });

    setStockAlert({
      headers: ["SL", "Product Name", "WareHouse", "Remaining"],
      data: data,
    });
  };

  const getTopSellingProductbyYear = async () => {
    const res = await DashboardService.getTopProductSellingByYear();
    var data = [];
    var label = [];
    res.forEach((element) => {
      data.push(element?.totalSell);
      label.push(element?.name[0]);
    });

    setTopSellingProductbyYear({
      data: data,
      label: label,
    });
  };

  const getRecentSales = async () => {
    const res = await DashboardService.getRecentSale();
    var data = [];
    res.forEach((element) => {
      data.push({
        id: element?.part_id,
        Product_Name: element?.part_name,
        Product_Number: element?.part_number,
        Company_Name: element?.company_name,
        Qnty: element?.quantity,
        Purchse_Date: moment(element?.created_at).format("DD-MMM-YYYY"),
      });
    });

    setRecentSales({
      headers: [
        "SL",
        "Product Name",
        "Part Number",
        "Company Name",
        "Qnty",
        "Purchse Date",
      ],
      data: data,
    });
  };

  const getTopCustomers = async () => {
    const res = await DashboardService.getTopCustomers();
    var data = [];
    var label = [];
    res.forEach((element) => {
      label.push(element?.company_name);
      data.push(element?.quantity);
    });
    setTopCustomers({
      data: data,
      label: label,
    });
  };

  useEffect(() => {
    getStatistics();
    getMonthlyReport();
    getTopSellingProductbyMonth();
    getStockAlert();
    getTopSellingProductbyYear();
    getRecentSales();
    getTopCustomers();
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div id="kt_content_container" className="container-xxl">
      <Statistics
        data={statistics}
        title={["Total Sell", "Total Purchase", "Total Profit"]}
      />
      <br />
      <Row>
        <Col xl={8}>
          <ColumnDataLabelsChart
            data={monthlyReport.data}
            categories={monthlyReport.label}
            title="Monthly Report"
          />
        </Col>
        <Col xl={4}>
          <PieChart
            pieChartData={topSellingProductbyYear.data}
            height={355}
            labels={topSellingProductbyYear.label}
            title={"Top Selling Product (" + new Date().getFullYear() + ")"}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xl={8}>
          <ScrollableTable
            headers={stockAlert.headers}
            records={stockAlert.data}
            title="Stocks Alert"
            url="/panel/parts/"
            height={220}
          />
        </Col>
        <Col xl={4}>
          <ScrollableTable
            headers={topSellingProductbyMonth.headers}
            records={topSellingProductbyMonth.data}
            title={
              "Top Selling Product (" + monthNames[new Date().getMonth()] + ")"
            }
            url="/panel/parts/"
            height={220}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xl={8}>
          <ScrollableTable
            headers={recentSales.headers}
            records={recentSales.data}
            title="Recent Sales"
            url="/panel/parts/"
            height={380}
          />
        </Col>
        <Col xl={4}>
          <PieChart
            pieChartData={topCustomers.data}
            labels={topCustomers.label}
            height={380}
            title="Top 5 Customers"
          />
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default Dashboard;
