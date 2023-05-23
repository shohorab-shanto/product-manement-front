import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import ShowContent from "./ShowContent";

const ShowEmployee = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});

  const getEmployee = async () => {
    setEmployee(await EmployeeService.get(id));
  };

  useEffect(() => {
    if (id) {
      getEmployee();
    }
  }, [id]);
  return (
    <>
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="d-flex flex-column flex-lg-row">
            <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
              <div className="card mb-5 mb-xl-8">

                <div className="card-body">
                  <button
                    className="btn btn-sm btn-dark "
                    style={{ marginRight: "0.75rem" }}
                    onClick={() => navigate(-1)}
                  >
                    <i className="fa fa-arrow-left"></i>Back
                  </button>
                  <div className="d-flex flex-center flex-column py-5">

                    <div className="symbol symbol-100px symbol-circle mb-7">
                      <img src={employee.avatar} alt={employee.id} />
                    </div>

                    <span className="fs-3 text-gray-800 text-hover-primary fw-bolder mb-3">
                      {employee.name}
                    </span>

                    <div className="mb-9">
                      <div className="badge badge-lg badge-light-primary d-inline">
                        {employee?.role}
                      </div>
                    </div>


                  </div>

                  <div className="d-flex flex-stack fs-4 py-3">
                    <div
                      className="fw-bolder rotate collapsible"

                      href="#kt_user_view_details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="kt_user_view_details"
                    >
                      Details

                    </div>
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      title="Edit customer details"
                    ></span>
                  </div>

                  <div className="separator"></div>

                  <div id="kt_user_view_details" className="collapse show">
                    <div className="pb-5 fs-6">
                      <div className="fw-bolder mt-5">Account ID</div>
                      <div className="text-gray-600">ID-{employee.id}</div>

                      <div className="fw-bolder mt-5">Email</div>
                      <div className="text-gray-600">
                        <span className="text-gray-600 text-hover-primary">
                          {employee.email}
                        </span>
                      </div>

                      <div className="fw-bolder mt-5">Designation</div>
                      <div className="text-gray-600">
                        {employee?.designation?.name}
                      </div>

                      <div className="fw-bolder mt-5">Status</div>
                      <div
                        className={
                          employee?.status == 1
                            ? "badge badge-light-success"
                            : "badge badge-light-danger"
                        }
                      >
                        {employee?.status == 1 ? "active" : "inactive"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ShowContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowEmployee;
