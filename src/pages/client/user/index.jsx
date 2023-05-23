import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClientUserService from "services/clientServices/ClientUserService";

const CompanyUsers = ({ active }) => {
    const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  console.log(users);
  const getUsers = async () => {
    setUsers(await ClientUserService.getAll());
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <div className="post d-flex flex-column-fluid" id="kt_post">
      <div id="kt_content_container" className="container-xxl">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">User</span>
            </h3>
          </div>

          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px">Name</th>
                  <th className="min-w-50px">Status</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td>
                        <i className="fas fa-cog fa-spin"></i> Loading...
                      </td>
                    </tr>
                  ) : null}

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
                          item?.status === 1
                            ? "badge badge-light-success"
                            : "badge badge-light-danger"
                        }
                      >
                        {item?.status === 1 ? "Active" : "Inactive"}
                      </div>
                      </div>
                    </td>

                    <td className="text-end">
                      <Link
                        to={"/panel/companies/user/" + item.id}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <i className="fa fa-eye"></i>
                      </Link>
                      
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
    </>


  );
};

export default CompanyUsers;
