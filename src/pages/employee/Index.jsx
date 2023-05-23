import Confirmation from "components/utils/Confirmation";
import Table from "components/utils/Table";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import CreateEmployee from "./Create";
import Edrowployee from "./Edit";

const Employee = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  //Set the columns
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      field: 'name',
      format: row => (
        <div className="d-flex align-items-center">
          <div className="symbol symbol-50px me-5">
            <span className="symbol-label bg-light">
              <img
                src={row.avatar}
                className="h-75 overflow-hidden"
                alt={row.name}
              />
            </span>
          </div>
          <div className="d-flex justify-content-start flex-column">
            <Link
              to={"/panel/employees/" + row.id}
              className="text-dark fw-bolder text-hover-primary"
            >
              {row.name}
            </Link>
          </div>
        </div>
      )
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      field: "designation",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      field: "role",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      field: "status",
      format: (row) => (
        <span
          className={
            row.status == 1
              ? "badge badge-light-success"
              : "badge badge-light-danger"
          }
        >
          {row.status == 1 ? "active" : "inactive"}
        </span>
      ),
    },
    {
      name: "Action",
      selector: (row) => row.status,
      format: (row) => (
        <span className="text-end">
          <Link
            to={"/panel/employees/" + row.id}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <i className="fa fa-eye"></i>
          </Link>
          <button
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            onClick={() => {
              onOpenUpdateModal();
              setEmployeeId(row.id);
            }}
          >
            <i className="fa fa-pen"></i>
          </button>
          <button
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            onClick={() => { setConfirmDelete(true); setEmployeeId(row.id) }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </span>
      ),
    },
  ];

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onOpenUpdateModal = () => setUpdateOpen(true);
  const onCloseUpdateModal = () => setUpdateOpen(false);

  const getEmployees = async (params) => {
    setLoading(true);
    setEmployees(await EmployeeService.getAll(params));
    setLoading(false);
  };

  const deleteEmployee = async (id) => {
    await EmployeeService.remove(id);
    getEmployees();
  };

  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          <Table
            name="Employees"
            buttonName="Add Employee"
            onClickButton={onOpenModal}
            isLoading={loading}
            data={employees}
            columns={columns}
            onFilter={getEmployees}
          />
        </div>
      </div>

      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deleteEmployee(employeeId);
        }}
        onCancel={() => setConfirmDelete(false)}
      />

      <CreateEmployee
        open={open}
        onCloseModal={onCloseModal}
        getEmployees={getEmployees}
      />

      <Edrowployee
        open={updateOpen}
        onCloseModal={onCloseUpdateModal}
        getEmployees={getEmployees}
        employeeId={employeeId}
      />
    </>
  );
};

export default Employee;
