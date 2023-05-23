import http from "../http-common";

const getStatisticsData = async () => {
  const res = await http.get('/sell-purchase');
  return res.data;
};

const getTopProductSellingByMonth = async () => {
    const res = await http.get('/top-selling-product-monthly');
    return res.data;
  };

  const getTopProductSellingByYear = async () => {
    const res = await http.get('/top-selling-product-yearly');
    return res.data;
  };

  const getStockData = async () => {
    const res = await http.get('/stock-alert');
    return res.data;
  };
  const getMonthlyData = async () => {
    const res = await http.get('/report/monthly/sales');
    return res.data;
  };

  const getRecentSale = async () => {
    const res = await http.get('/recent-sales');
    return res.data;
  };
  
  const getTopCustomers = async () => {
    const res = await http.get('/top-customers');
    return res.data;
  };

  // client dashboard
  const getClientInvoiceDetails=async()=>{
    const res = await http.get('/customer-payment-info');
    return res.data;
  }


const DashboardService = {
    getStatisticsData,
    getTopProductSellingByMonth,
    getTopProductSellingByYear,
    getStockData,
    getMonthlyData,
    getRecentSale,
    getTopCustomers,
    getClientInvoiceDetails
};

export default DashboardService;
