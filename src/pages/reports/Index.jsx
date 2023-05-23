import Table from "components/utils/Table";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import ReportService from "services/ReportService";
import DateFilter from "./DateFilter";
const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState({});
  const [enableFilter, setEnableFilter] = useState(false);

  const getReports = async (filters) => {
    setReports(await ReportService.getAll(filters));
    setLoading(false);
  };

  const columns = [

    {
      name: "Part Name",
      selector: (row) => row?.part_name,
      sortable: true,
      field: "name",
      format: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-start flex-column">
            <div className="text-dark fw-bolder text-hover-primary">
           {row?.part_name}
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Part Number",
      selector: (row) => row?.part_number,
      format: (row) => (
        <div className="mt-2">{row?.part_number}</div>
      ),
      sortable: true,
      field: "part_number",
    },
  
    {
      name: "Company",
      selector: (row) => row?.company_name,
      sortable: true,
      field: "name",
      format: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-start flex-column">
            <div className="text-dark fw-bolder text-hover-primary">
              {row?.company_name}
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Quantity",
      selector: (row) => row?.quantity,
      format: (row) => (
        <div className="mt-2">{row?.quantity}</div>
      ),
      sortable: true,
      field: "quantity",
    },

    {
      name: "Created At",
      selector: (row) => row?.created_at,
      format: (row) => (
        <div className="mt-2"><Moment format="YYYY-MM-DD">{row?.created_at}</Moment></div>
      ),
      sortable: true,
      field: "created_at",
    },

  ];



  const filterData = (dt) => {
    setFilter({
      ...filter,
      ...dt
    })

    setEnableFilter(false)
  }

  const exportSales = async()=>{
    setLoading(true);
    let data = await ReportService.salesExport();
    window.location.href = data;
    setLoading(false);

  }

  useEffect(() => {
    if (filter.order) //Just to avoid double load
    getReports(filter);
  }, [filter]);


  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          <Table
            name="Reports" 
            isLoading={loading}
            data={reports}
            buttonName='Filter'
            onClickButton={() => { setEnableFilter(!enableFilter) }}
            callbackButtons={[
              {
                name: 'Export',
                callback: () => { exportSales() },
                permission: null
                
              },
            ]}
            columns={columns}
            onFilter={filterData}
          />
        </div>
      </div>
      <DateFilter enable={enableFilter} cli onChange={(data) => {filterData(data)}} />
    </>
  );
};

export default Reports;
