import Confirmation from "components/utils/Confirmation";
import PermissionAbility from "helpers/PermissionAbility";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CompanyService from "services/CompanyService";
import AddUser from "./Create";
import EditUser from "./Edit";

const CompanyUsers = ({ active }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { id } = useParams();

  const onCloseModal = () => {
    setOpenAddUser(false);
    setOpenEditModal(false);
  };

  const getUsers = async () => {
    setUsers(await CompanyService.getUsers(id));
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure want to delete?"))
      await CompanyService.deleteUser(id, userId);
  };

  useEffect(() => {
    if (active && id) getUsers();
  }, []);



  return (
    <div className="tab-pane fade active show" id="users" role="tab-panel">
      <div className="d-flex flex-column gacompanyIdgap-lg-10">
        <div className="card card-flush py-4">
          <div className="card-header">
            <div className="card-title">
              <h2>Users</h2>
            </div>
            <div className="card-toolbar">
            <PermissionAbility permission="companies_users_add_user">
              <button
                type="button"
                className="btn btn-light-primary"
                onClick={() => {
                  setOpenAddUser(true);
                }}
              >
                <span className="svg-icon svg-icon-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      opacity="0.3"
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      fill="black"
                    ></rect>
                    <rect
                      x="10.8891"
                      y="17.8033"
                      width="12"
                      height="2"
                      rx="1"
                      transform="rotate(-90 10.8891 17.8033)"
                      fill="black"
                    ></rect>
                    <rect
                      x="6.01041"
                      y="10.9247"
                      width="12"
                      height="2"
                      rx="1"
                      fill="black"
                    ></rect>
                  </svg>
                </span>
                Add User
              </button>
              </PermissionAbility>
            </div>
          </div>
          <div className="card-body pt-0">
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px">Name</th>
                  <th className="min-w-50px">Status</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <span className="symbol-label bg-light">
                            <img
                              src={item.avatar}
                              className="h-75 overflow-hidden"
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <Link
                            to={"/panel/companies/" + id + "/users/" + item.id}
                            className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="d-flex align-items-center">
                      <div
                        className={
                          item?.status
                            ? "badge badge-light-success"
                            : "badge badge-light-danger"
                        }
                      >
                        {item?.status ? "Active" : "Inactive"}
                      </div>
                      </div>
                    </td>

                    <td className="text-end">
                    <PermissionAbility permission="companies_users_show">
                      <Link
                        to={"/panel/companies/" + id + "/users/" + item.id}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <i className="fa fa-eye"></i>
                      </Link>
                      </PermissionAbility>
                      <PermissionAbility permission="companies_users_edit">
                      <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        onClick={() => {
                          setUserId(item.id);
                          setOpenEditModal(true);
                        }}
                      >
                        <i className="fa fa-pen"></i>
                      </button>
                      </PermissionAbility>
                      <PermissionAbility permission="companies_users_delete">
                      <button
                        onClick={() => {
                          setConfirmDelete(true);
                          setUserId(item.id);
                        }}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                      </PermissionAbility>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deleteUser(userId);
        }}
        onCancel={() => setConfirmDelete(false)}
      />

      <AddUser
        open={openAddUser}
        onCloseModal={() => {
          onCloseModal();
        }}
        onCreate={() => {
          getUsers();
        }}
        companyId={id}
      />

      <EditUser
        open={openEditModal}
        onCloseModal={() => {
          onCloseModal();
        }}
        onUpdate={() => {
          getUsers();
        }}
        companyId={id}
        userId={userId}
      />
    </div>
  );
};

export default CompanyUsers;
