import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyService from 'services/CompanyService';

const ShowUser = () => {
  let { companyId, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getUser = async () => {
    setData(await CompanyService.getUser(companyId, id));
  };

  useEffect(() => {
    if (id) {
      getUser();
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
                      <img src={data.avatar} alt={data.id} />
                    </div>

                    <span className="fs-3 text-gray-800 text-hover-primary fw-bolder mb-3">
                      {data.name}
                    </span>
                  </div>

                  <div className="d-flex flex-stack fs-4 py-3">
                    Details
                  </div>

                  <div className="separator"></div>

                  <div id="kt_user_view_details" className="collapse show">
                    <div className="pb-5 fs-6">

                      <div className="fw-bolder mt-5">Email</div>
                      <div className="text-gray-600">
                        <span className="text-gray-600 text-hover-primary">
                          {data.email}
                        </span>
                      </div>

                      <div className="fw-bolder mt-5">Phone</div>
                      <div className="text-gray-600">
                        {data.phone ?? '--'}
                      </div>

                      <div className="fw-bolder mt-5">Status</div>
                      <div
                        className={
                          data?.status === "active"
                            ? "badge badge-light-success"
                            : "badge badge-light-danger"
                        }
                      >
                        {data?.status === "active" ? "active" : "inactive"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-lg-row-fluid ms-lg-15">
              <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
                <li className="nav-item">
                  <a
                    className="nav-link text-active-primary pb-4 active"
                    data-bs-toggle="tab"
                    href="#kt_user_view_overview_tab"
                  >
                    Overview
                  </a>
                </li>

                {/* <li className="nav-item">
          <a
            className="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_user_view_overview_security"
          >
            Security
          </a>
        </li> */}
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="kt_user_view_overview_tab"
                  role="tabpanel"
                >
                  <div className="card card-xl-stretch mb-xl-10">
                    <div className="card-header align-items-center border-0 mt-4">
                      <h3 className="card-title align-items-start flex-column">
                        <span className="fw-bolder mb-2 text-dark">Activities</span>
                        <span className="text-muted fw-bold fs-7">890,344 Sales</span>
                      </h3>
                      <div className="card-toolbar">
                        {/* <button
                  type="button"
                  className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                >
                  <span className="svg-icon svg-icon-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect
                          x="5"
                          y="5"
                          width="5"
                          height="5"
                          rx="1"
                          fill="#000000"
                        ></rect>
                        <rect
                          x="14"
                          y="5"
                          width="5"
                          height="5"
                          rx="1"
                          fill="#000000"
                          opacity="0.3"
                        ></rect>
                        <rect
                          x="5"
                          y="14"
                          width="5"
                          height="5"
                          rx="1"
                          fill="#000000"
                          opacity="0.3"
                        ></rect>
                        <rect
                          x="14"
                          y="14"
                          width="5"
                          height="5"
                          rx="1"
                          fill="#000000"
                          opacity="0.3"
                        ></rect>
                      </g>
                    </svg>
                  </span>
                </button> */}
                        <div
                          className="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
                          data-kt-menu="true"
                          id="kt_menu_61bc33e60572a"
                        >
                          <div className="px-7 py-5">
                            <div className="fs-5 text-dark fw-bolder">
                              Filter Options
                            </div>
                          </div>
                          <div className="separator border-gray-200"></div>
                          <div className="px-7 py-5">
                            <div className="mb-10">
                              <label className="form-label fw-bold">Status:</label>
                              <div>
                                <select
                                  className="form-select form-select-solid select2-hidden-accessible"
                                  data-kt-select2="true"
                                  data-placeholder="Select option"
                                  data-dropdown-parent="#kt_menu_61bc33e60572a"
                                  data-allow-clear="true"
                                  data-select2-id="select2-data-16-lx7h"
                                  tabIndex="-1"
                                  aria-hidden="true"
                                >
                                  <option data-select2-id="select2-data-18-s23n"></option>
                                  <option value="1">Approved</option>
                                  <option value="2">Pending</option>
                                  <option value="2">In Process</option>
                                  <option value="2">Rejected</option>
                                </select>
                                <span
                                  className="select2 select2-container select2-container--bootstrap5"
                                  dir="ltr"
                                  data-select2-id="select2-data-17-hzxo"
                                  style={{ width: "100%" }}
                                >
                                  <span className="selection">
                                    <span
                                      className="select2-selection select2-selection--single form-select form-select-solid"
                                      role="combobox"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      tabIndex="0"
                                      aria-disabled="false"
                                      aria-labelledby="select2-5mpy-container"
                                      aria-controls="select2-5mpy-container"
                                    >
                                      <span
                                        className="select2-selection__rendered"
                                        id="select2-5mpy-container"
                                        role="textbox"
                                        aria-readonly="true"
                                        title="Select option"
                                      >
                                        <span className="select2-selection__placeholder">
                                          Select option
                                        </span>
                                      </span>
                                      <span
                                        className="select2-selection__arrow"
                                        role="presentation"
                                      >
                                        <b role="presentation"></b>
                                      </span>
                                    </span>
                                  </span>
                                  <span
                                    className="dropdown-wrapper"
                                    aria-hidden="true"
                                  ></span>
                                </span>
                              </div>
                            </div>
                            <div className="mb-10">
                              <label className="form-label fw-bold">Member Type:</label>
                              <div className="d-flex">
                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="1"
                                  />
                                  <span className="form-check-label">Author</span>
                                </label>
                                <label className="form-check form-check-sm form-check-custom form-check-solid">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="2"
                                  />
                                  <span className="form-check-label">Customer</span>
                                </label>
                              </div>
                            </div>
                            <div className="mb-10">
                              <label className="form-label fw-bold">
                                Notifications:
                              </label>
                              <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  name="notifications"
                                />
                                <label className="form-check-label">Enabled</label>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end">
                              <button
                                type="reset"
                                className="btn btn-sm btn-light btn-active-light-primary me-2"
                                data-kt-menu-dismiss="true"
                              >
                                Reset
                              </button>
                              <button
                                type="submit"
                                className="btn btn-sm btn-primary"
                                data-kt-menu-dismiss="true"
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-5">
                      <div className="timeline-label">
                        <div className="timeline-item">
                          <div className="timeline-label fw-bolder text-gray-800 fs-6">
                            08:42
                          </div>
                          <div className="timeline-badge">
                            <i className="fa fa-genderless text-warning fs-1"></i>
                          </div>
                          <div className="fw-mormal timeline-content text-muted ps-3">
                            Outlines keep you honest. And keep structure
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-label fw-bolder text-gray-800 fs-6">
                            10:00
                          </div>
                          <div className="timeline-badge">
                            <i className="fa fa-genderless text-success fs-1"></i>
                          </div>
                          <div className="timeline-content d-flex">
                            <span className="fw-bolder text-gray-800 ps-3">
                              AEOL meeting
                            </span>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-label fw-bolder text-gray-800 fs-6">
                            14:37
                          </div>
                          <div className="timeline-badge">
                            <i className="fa fa-genderless text-danger fs-1"></i>
                          </div>
                          <div className="timeline-content fw-bolder text-gray-800 ps-3">
                            Make deposit
                            <a href="!#" className="text-primary">
                              USD 700
                            </a>
                            . to ESL
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-label fw-bolder text-gray-800 fs-6">
                            16:50
                          </div>
                          <div className="timeline-badge">
                            <i className="fa fa-genderless text-primary fs-1"></i>
                          </div>
                          <div className="timeline-content fw-mormal text-muted ps-3">
                            Indulging in poorly driving and keep structure keep great
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-label fw-bolder text-gray-800 fs-6">
                            21:03
                          </div>
                          <div className="timeline-badge">
                            <i className="fa fa-genderless text-danger fs-1"></i>
                          </div>
                          <div className="timeline-content fw-bold text-gray-800 ps-3">
                            New order placed
                            <a href="!#" className="text-primary">
                              #XF-2356
                            </a>
                            .
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-label fw-bolder text-gray-800 fs-6">
                            16:50
                          </div>
                          <div className="timeline-badge">
                            <i className="fa fa-genderless text-primary fs-1"></i>
                          </div>
                          <div className="timeline-content fw-mormal text-muted ps-3">
                            Indulging in poorly driving and keep structure keep great
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-label fw-bolder text-gray-800 fs-6">
                            21:03
                          </div>
                          <div className="timeline-badge">
                            <i className="fa fa-genderless text-danger fs-1"></i>
                          </div>
                          <div className="timeline-content fw-bold text-gray-800 ps-3">
                            New order placed
                            <a href="!#" className="text-primary">
                              #XF-2356
                            </a>
                            .
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-label fw-bolder text-gray-800 fs-6">
                            10:30
                          </div>
                          <div className="timeline-badge">
                            <i className="fa fa-genderless text-success fs-1"></i>
                          </div>
                          <div className="timeline-content fw-mormal text-muted ps-3">
                            Finance KPI Mobile app launch preparion meeting
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ShowUser;
