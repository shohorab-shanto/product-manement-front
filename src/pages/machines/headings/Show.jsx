import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MachinePartHeadingService from "services/PartHeadingService";
const ShowPartHeadings = () => {
  let { machineId, headingId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [parts, setParts] = useState([]);
  const getHeading = async () => {
    setData(await MachinePartHeadingService.get(machineId, headingId));
    setLoading(false);
  };

  useEffect(() => {
    if (headingId) getHeading();
  }, [headingId]);
  return (
    <>
      {" "}
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="d-flex flex-column flex-lg-row">
            <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
              <div className="card mb-5 mb-xl-8">
                <div className="card-body">
                  <h3 className="card-label">
                    <button
                      className="btn btn-sm btn-dark "
                      style={{ marginRight: "0.75rem" }}
                      onClick={() => navigate(-1)}
                    >
                      <i className="fa fa-arrow-left"></i> Back
                    </button>
                    Part Heading Details
                  </h3>
                  <div className="separator"></div>

                  <div className="pb-5 fs-6">
                    <div className="fw-bolder mt-5">Name</div>
                    <div className="text-gray-600">{data?.name}</div>

                    <div className="fw-bolder mt-5">Description</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">{data.description}</span>
                    </div>

                    <div className="fw-bolder mt-5">Remarks</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600 text-hover-primary">
                        {data.remarks}
                      </span>
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
                    href="#models"
                  >
                    Parts
                  </a>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="models"
                  role="tabpanel"
                >
                  <div className="card mb-5 mb-xl-8">
                    <div className="card-body pt-5">
                      <div className="table-responsive">
                        <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                          <thead>
                            <tr className="fw-bolder text-muted">
                              <th>Name</th>
                              <th className="min-w-50px">Part Number</th>
                            </tr>
                          </thead>

                          <tbody>
                            {loading ? (
                              <tr>
                                <td>
                                  <i className="fas fa-cog fa-spin"></i>{" "}
                                  Loading...
                                </td>
                              </tr>
                            ) : null}

                            {data?.parts?.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <Link
                                    to={"/panel/parts/" + item.id}
                                    className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                                  >
                                    {item?.aliases[0]?.name}
                                  </Link>
                                </td>
                                <td>{item?.aliases[0]?.part_number}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default ShowPartHeadings;
