import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Confirmation from "../../components/utils/Confirmation";
import RoleService from "services/RoleService";
import CreateRole from "./Create";
import { useSelector } from "react-redux";
const Roles = () => {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState("");
  const onCloseModal = () => setOpen(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const getRoles = async () => {
    setRoles(await RoleService.getAll());
  };

  const deletRoles = async (roleId) => {
    await RoleService.remove(roleId);
    getRoles();
  };

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <>
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder fs-3 mb-1">Roles</span>
              </h3>
              <div className="card-toolbar">
                <button
                  className="btn btn-light-primary btn-md"
                  onClick={() => setOpen(true)}
                >
                  Add Roles
                </button>
              </div>
            </div>

            <div className="card-body py-3">
              <div className="table-responsive">
                <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                  <thead>
                    <tr className="fw-bolder text-muted">
                      <th className="min-w-140px">Name</th>
                      <th className="min-w-120px">Users</th>
                      {user?.role !== "Admin" && (
                        <th className="min-w-100px text-end">Actions</th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {roles?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Link
                            to={
                              item.name !== "Admin"
                                ? `/panel/roles/` + item.id
                                : "#"
                            }
                            className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                          >
                            {item?.name}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to="#"
                            className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                          >
                            {item?.users_count}
                          </Link>
                        </td>

                        <td className="text-end">
                          {item?.name !== "Admin" && (
                            <Link
                              to={
                                item.name !== "Admin"
                                  ? `/panel/roles/` + item.id
                                  : "#"
                              }
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                          )}
                          {item?.name !== "Admin" &&  item?.users_count<=0 && (
                            <Link
                              to="#"
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                              onClick={() => {
                                setRoleId(item.id);
                                setConfirmDelete(true);
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deletRoles(roleId);
        }}
        onCancel={() => setConfirmDelete(false)}
      />
      <CreateRole
        open={open}
        onCloseModal={onCloseModal}
        onCreated={() => getRoles}
      />
    </>
  );
};

export default Roles;
