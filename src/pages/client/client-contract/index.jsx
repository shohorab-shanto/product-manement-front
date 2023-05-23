import Table from "components/utils/Table";
import React, { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import ClientContractService from "services/clientServices/ClientContractService";

const ClientContracts = () => {
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [contractId, setContractId] = useState(null);

  //Set the columns
  const columns = [
    {
      name: 'Company',
      selector: row => row.company?.name,
      sortable: true,
      field: 'company',
      format: row => (
        <div className="d-flex align-items-center">
          <div className="symbol symbol-50px me-5">
            <span className="symbol-label bg-light"> 
              <img
                src={row.company?.logo_url}
                className="h-75 overflow-hidden"
                alt={row.company?.name}
              />
            </span>
          </div>
          <div className="d-flex justify-content-start flex-column">
          {/* <Link
              to={'/panel/companies/' + row.company?.id}
              className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
            >
              {row.company?.name}
            </Link> */}

            <Link
              to="#"
              className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
            >
              {row.company?.name}
            </Link>
          </div>
        </div>
      )
    },
    {
      name: 'Machines',
      selector: row => row?.machine_models,
      sortable: true,
      field: 'machine_models',
      format: row => (
        row.machine_models.map((dt) => (<Link
            to={`/panel/machines/${dt.model.machine_id}/models/${dt.model.id}`}
            className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
          >
            {dt.model.name}
          </Link>))
      )
    },
    {
      name: 'Contract Type',
      selector: row => row.is_foc,
      sortable: true,
      field: 'machines',
      format: (row) => (
        <span
          className={
            row.is_foc
              ? "badge badge-light-warning"
              : "badge badge-light-info"
          }
        >
          {row.is_foc? "FOC" : "AMC"}
        </span>
      ),
    },
    {
      name: "Contract Status",
      selector: (row) => row.status,
      sortable: true,
      field: "status",
      format: (row) => (
        <span
          className={
            row.status
              ? "badge badge-light-success"
              : "badge badge-light-danger"
          }
        >
          {row.status ? "active" : "inactive"}
        </span>
      ),
    },
    {
      name: "Expiration Date",
      selector: (row) => row.end_date,
      sortable: true,
      field: "status",
      format: (row) => (
        <span className="text-gray-600 text-hover-primary">
        <Moment format='YYYY-MM-DD'>
          {row.end_date}
        </Moment>
        {row.has_expired ?
          <div className="badge badge-light-danger">
            Expired
          </div> : ''
        }
      </span>
      ),
    },
    {
      name: 'Action',
      selector: row => row.status,
      format: row => (
        <span className="text-end">
          <Link
            to={"/panel/client/contracts/" + row.id}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <i className="fa fa-eye"></i>
          </Link>
        </span>
      )
    },
  ];

  const getContracts = async (filters) => {
    const res = await ClientContractService.getAll(filters)
    setContracts(res?.data)
    setLoading(false);
  };



  const onCloseModal = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
  };


  React.useEffect(() => {
    getContracts()
  }, []);

  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          {
            // contracts.length > 0 && (
              <Table
              name="Contracts"
              onClickButton={() => setOpenAddModal(true)}
              isLoading={loading} data={contracts}
              columns={columns}
              onFilter={getContracts}
            />
            // )
          }
        </div>
      </div>

      {/* <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deleteContract(contractId);
        }}
        onCancel={() => setConfirmDelete(false)}
      /> */}
      {/* <CreateContract
        open={openAddModal}
        onCloseModal={onCloseModal}
        onCreated={getContracts}
      /> */}
      {/* <EditContract
        open={openEditModal}
        contractId={contractId}
        onCloseModal={onCloseModal}
        onUpdated={getContracts}
      /> */}
    </>
  );
};

export default ClientContracts;
