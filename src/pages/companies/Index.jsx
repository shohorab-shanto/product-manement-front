import Confirmation from "components/utils/Confirmation";
import Table from "components/utils/Table";
import PermissionAbility from "helpers/PermissionAbility";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyService from "services/CompanyService";
import CreateCompany from "./Create";
import EditCompany from "./Edit";

const Companies = () => {
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [companyId, setcompanyId] = useState(null);


  //Set the columns
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      field: 'name',
      format: row => (
        <div className="d-flex align-items-center">
          <div className="symbol symbol-50px me-5">
            <span className="symbol-label bg-light">
              <img
                src={row.logo}
                className="h-75 overflow-hidden"
                alt={row.name}
              />
            </span>
          </div>
          <div className="d-flex justify-content-start flex-column">
            <Link
              to={'/panel/companies/' + row.id}
              className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
            >
              {row.name}
            </Link>
            <span className="text-muted fw-bold text-muted d-block fs-7">
              {row.company_group ?? '--'}
            </span>
          </div>
        </div>
      )
    },
    {
      name: 'Factory Types',
      selector: row => row.factory_types,
      sortable: true,
      field: 'factory_types',
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
      name: 'Action',
      selector: row => row.status,
      format: row => (
        <span className="text-end">
          <PermissionAbility permission="companies_show">
          <Link
            to={"/panel/companies/" + row?.id}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <i className="fa fa-eye"></i>
          </Link>
          </PermissionAbility>
          <PermissionAbility permission="companies_edit">
          <button
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            onClick={() => {
              setcompanyId(row?.id);
              setOpenEditModal(true);
            }}
          >
            <i className="fa fa-pen"></i>
          </button> 
          </PermissionAbility>
          <PermissionAbility permission="companies_delete">
          <Link
            to="#"
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            onClick={() => {setcompanyId(row?.id);setConfirmDelete(true)}}
          >
            <i className="fa fa-trash"></i>
          </Link>
          </PermissionAbility>
        </span>
      )
    },
  ];

  const getCompanies = async (filters) => {
    setCompanies(await CompanyService.getAll(filters));
    setLoading(false);
  };

  const deletePart = async(companyId) => {   
    await CompanyService.remove(companyId);
    getCompanies();
  };

  const onCloseModal = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          <Table
            name="Companies"
            buttonName="Add Company"
            onClickButton={() => setOpenAddModal(true)}
            isLoading={loading} data={companies}
            columns={columns}
            onFilter={getCompanies}
          />
        </div>
      </div>

      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deletePart(companyId);
        }}
        onCancel={() => setConfirmDelete(false)}
      />
      <CreateCompany
        open={openAddModal}
        onCloseModal={onCloseModal}
        onCreated={getCompanies}
      />
      <EditCompany
        open={openEditModal}
        companyId={companyId}
        onCloseModal={onCloseModal}
        onUpdated={getCompanies}
      />
    </>
  );
};

export default Companies;
