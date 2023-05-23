import Table from "components/utils/Table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RequisitionService from "services/RequisitionService";
import ClientRequiredRequisitionFilter from "./ClientRequiredRequisitionFilter";

const ClientRequiredRequisitions = () => {
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requisitions, setRequisitions] = useState([]);

  const filterdata = (data) => {
    setFilter(false);
    getRequisitions(data);
  };

  useEffect(() => {
    filterdata();
  }, []);

  const columns = [
    {
      name: "Id",
      selector: (row) => row?.rr_number,
      sortable: true,
      field: "id",
    },
    {
      name: "Expected Delivery",
      selector: (row) => row?.expected_delivery ?? "--",
      sortable: true,
      field: "expected_delivery",
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
      field: "role",
    },
    {
      name: "Requisition Status",
      selector: (row) => row.requisition_id,
      sortable: true,
      field: "role",
      format: (row) => (
        <>
          {row?.requisition_id ? (
            <div
              className="mt-2 text-white bg-success p-1 px-2 rounded"
              // to={"/panel/requisitions/" + row?.requisition_id}
            >
              <Link
                to={"/panel/client/requisitions/" + row?.requisition_id}
                className="text-white w-100"
              >
                Created
              </Link>
            </div>
          ) : (
            <div className="mt-2 text-white bg-warning p-1 px-2 rounded w-100">
              Not yet created
            </div>
          )}
        </>
      ),
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
      field: "role",
      format: (row) => (
        <>
          {row?.status == "pending" && (
            <div className="mt-2 text-white bg-warning p-1 px-2 rounded">
              Pending
            </div>
          )}
          {row?.status == "on-going" && (
            <div className="mt-2 text-white bg-info p-1 px-2 rounded">
              On Going
            </div>
          )}
          {row?.status == "complete" && (
            <div className="mt-2 text-white bg-success p-1 px-2 rounded">
              Complete
            </div>
          )}
        </>
      ),
    },

    {
      name: "Action",
      selector: (row) => row.status,
      format: (row) => (
        <span className="text-end">
          <Link
            to={"/panel/client_require_req/" + row.id}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <i className="fa fa-eye"></i>
          </Link>
        </span>
      ),
    },
  ];

  const getRequisitions = async (filters) => {
    let res = await RequisitionService.getAllRequiredRequisitionsClient(
      filters
    );
    setRequisitions(res);
    setLoading(false);
  };
  useEffect(() => {
    getRequisitions();
  }, []);

  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          <Table
            name="Requisitions"
            buttonName="Filter"
            onClickButton={() => setFilter(!filter)}
            isLoading={loading}
            data={requisitions}
            columns={columns}
            onFilter={filterdata}
          />
        </div>
      </div>
      <ClientRequiredRequisitionFilter
        enable={filter}
        onChange={(data) => {
          filterdata(data);
        }}
      />
    </>
  );
};

export default ClientRequiredRequisitions;
