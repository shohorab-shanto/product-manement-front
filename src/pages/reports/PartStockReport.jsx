import Table from "components/utils/Table";
import PermissionAbility from "helpers/PermissionAbility";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import ReportService from "services/ReportService";
import DateFilter from "./DateFilter";
const PartStockReport = () => {
  const [loading, setLoading] = useState(true);
  const [stockHistory, setStockHistory] = useState([]);
  const [filter, setFilter] = useState({});
  const [enableFilter, setEnableFilter] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({})

  const getReports = async (filters) => {
    const res = await ReportService.stockHistory(filters);
    if (res) {
      setStockHistory(res);
    }
    // setStockHistory(await ReportService.stockHistory(filters));
    setLoading(false);
  };

  const handleModal = (data) => {
    setModalData(data)
    setIsModal(true);

  };
  // console.log(modalData);

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
              <Link
                to={"/panel/parts/" + row?.part_id}
                className="text-dark fw-bolder text-hover-primary"
              >
                {row?.part_name}
              </Link>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Box",
      selector: (row) => row?.box_heading_name,
      format: (row) => (
        <Link
          to={"/panel/box-headings/" + row?.box_heading_id}
          className="text-dark text-hover-primary mt-2"
        >
          {row?.box_heading_name}
        </Link>
      ),
      sortable: true,
      field: "box_heading_name",
    },

    {
      name: "WareHouse",
      selector: (row) => row?.warehouse_name,
      format: (row) => (
        <Link
          to={"/panel/warehouses/" + row?.warehouse_id}
          className="text-dark text-hover-primary mt-2"
        >
          {row?.warehouse_name}
        </Link>
      ),
      sortable: true,
      field: "warehouse_name",
    },

    {
      name: "Previous Unit Value",
      selector: (row) => row?.prev_unit_value,
      format: (row) => (
        <div className="mt-2">{Math.round(row?.prev_unit_value)}</div>
      ),
      sortable: true,
      field: "prev_unit_value",
    },

    {
      name: "Changed Unit Value",
      selector: (row) => row?.current_unit_value,
      sortable: true,
      field: "name",
      format: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-start flex-column">
            <div className="text-dark text-hover-primary">
              {Math.round(row?.prev_unit_value) >
              Math.round(row?.current_unit_value) ? (
                <span style={{ color: "red" }}>
                  {" "}
                  - {parseInt(row?.prev_unit_value - row?.current_unit_value)}
                </span>
              ) : (
                <span style={{ color: "green" }}>
                  + {row?.current_unit_value}
                </span>
              )}
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Unit",
      selector: (row) => row?.type,
      format: (row) => (
        <div className="mt-2">
          {row?.type == "addition" ? (
            <i
              className="fa fa-sort-up"
              style={{ color: "green", fontSize: "20px" }}
            ></i>
          ) : (
            <i
              className="fa fa-sort-down"
              style={{ color: "red", fontSize: "20px" }}
            ></i>
          )}
        </div>
      ),
      sortable: true,
      field: "type",
    },

    {
      name: "Action",
      selector: (row) => row.remarks,
      format: (row) => (
        <>
          <span className="text-end">
            <PermissionAbility permission="stock_report_view">
              <div
                onClick={()=>handleModal(row)}
                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                data-toggle="tooltip"
                title="Add Delivery Note"
              >
                <i className="fa fa-eye"></i>
              </div>
            </PermissionAbility>
          </span>
        </>
      ),
    },
  ];

  const filterData = (dt) => {
    setFilter({
      ...filter,
      ...dt,
    });
    setEnableFilter(false);
  };

  const exportSales = async () => {
    setLoading(true);
    let data = await ReportService.stockExport();
    window.location.href = data;
    setLoading(false);
  };

  useEffect(() => {
    if (filter.order)
      //Just to avoid double load
      getReports(filter);
  }, [filter]);

  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          <Table
            name="Stock Histories"
            isLoading={loading}
            data={stockHistory}
            // buttonName='Filter'
            onClickButton={() => {
              setEnableFilter(!enableFilter);
            }}
            callbackButtons={[
              {
                name: "Export",
                callback: () => {
                  exportSales();
                },
                permission: null,
              },
            ]}
            columns={columns}
            onFilter={filterData}
          />
        </div>
      </div>
      <DateFilter
        enable={enableFilter}
        onChange={(data) => {
          filterData(data);
        }}
      />
      {/* modal div */}
      <div>
        <Modal
          show={isModal}
          onHide={() => setIsModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-uppercase">
            {modalData.part_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h4>{modalData.part_name}</h4> */}
            <div className="row">
              <div className="col-md-6">
                <div> <span className="fw-bold">Previous Unit Value :</span> {Math.round(modalData.prev_unit_value)}</div>
              </div>

              <div className="col-md-6">
              <div> <span className="fw-bold">Current Unit Value :</span> {Math.round(modalData.current_unit_value)}</div>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-md-6">
                <div> <span className="fw-bold">Box :</span> {modalData.box_heading_name}</div>
                <div> <span className="fw-bold">WareHouse :</span> {modalData.warehouse_name}</div>
              </div>

              <div className="col-md-6">
              <div className="text-primary">{modalData.remarks}</div>
              </div>
            </div>
            
            
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-danger"
              onClick={() => {
                setIsModal(false);
              }}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* end modal div */}
    </>
  );
};

export default PartStockReport;
