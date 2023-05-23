import http from "../http-common";


const getAll = async (filters) => {
    const res = await http.get("/report/sales", {
      params: filters
    });
    return res.data;
};

const salesExport = async ()=>{
  const res = await http.get("/report/sales/export");
  return res.data.url;
}

const stockExport = async ()=>{
  const res = await http.get("/report/stock/export");
  return res.data.url;
}


const monthlySales = async ()=>{
  const res = await http.get("/report/monthly/sales");
  return res.data;
}

const weeklySales = async ()=>{
  const res = await http.get("/report/weekly/sales");
  return res.data;
}

const stockHistory = async (filters)=>{
  const res = await http.get("/stock-histories", {
    params: filters
  });
  return res.data;
}

const ReportService = {
    getAll,
    salesExport,
    monthlySales,
    weeklySales,
    stockHistory,
    stockExport
};
  
export default ReportService;