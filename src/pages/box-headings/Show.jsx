import React, { useState, useEffect } from "react";
import PermissionAbility from "helpers/PermissionAbility";
import { Activities } from "components/utils/Activities";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BoxHeadingService from "services/BoxHeadingService";

const BoxHeadingShow = () => {
  const [loading, setLoading] = useState(true);
  const [parts, setParts] = useState([]);
  const [tab, setTab] = useState("parts");
  let { boxId } = useParams();
  const navigate = useNavigate();
  const [boxHeading, setBoxHeading] = useState(null); 

  const getBoxHeading = async () => {
    setBoxHeading(await BoxHeadingService.get(boxId));
  };

  const getParts = async () => {
    setLoading(true);
    setParts(await BoxHeadingService.parts(boxId));
    setLoading(false);
  };

  useEffect(() => {
    if (boxHeading)
      getParts()
  }, [boxHeading])


  useEffect(() => {
    if (boxId)
      getBoxHeading()
  }, []);

  return (
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
                  Box Details
                </h3>
                <div className="separator"></div>

                <div className="pb-5 fs-6">
                  <div className="fw-bolder mt-5">Name</div>
                  <div className="text-gray-600">{boxHeading?.name}</div>



                  <div className="fw-bolder mt-5">Description</div>
                  <div className="text-gray-600">
                    <span className="text-gray-600">{boxHeading?.description}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-lg-row-fluid ms-lg-15">
            <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
            <PermissionAbility permission="box_heading_parts_access">
            <li className="nav-item">
                <a
                  className={`nav-link text-active-primary pb-4 ${
                    tab == "parts" ? "active" : ""
                  }`}
                  data-bs-toggle="tab"
                  href="#parts"
                  onClick={() => setTab("parts")}
                >
                  Parts
                </a>
              </li>
            </PermissionAbility>
              
              <li className="nav-item">
                  <a
                    className={`nav-link text-active-primary pb-4 ${ 
                      tab == "activities" ? "active" : ""
                    }`}
                    data-bs-toggle="tab"
                    href="#activities"
                    onClick={() => setTab("activities")}
                  >
                    Activities
                  </a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
            <PermissionAbility permission="box_heading_parts_access">
            <div
                className="tab-pane fade show active"
                id="parts"
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
                            <th className="min-w-100px">Machines</th>

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

                          {parts?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="symbol symbol-50px me-5">
                                    <span className="symbol-label bg-light">
                                      <img
                                        src={item.image}
                                        className="h-75 overflow-hidden"
                                        alt={item.name}
                                      />
                                    </span>
                                  </div>
                                  <div className="d-flex justify-content-start flex-column">
                                    <Link
                                      to={'/panel/parts/' + item.id}
                                      className="text-dark fw-bolder text-hover-primary"
                                    >
                                      {item.name}
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td>{item.part_number}</td> 
                              <td>{item.machines}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </PermissionAbility>
              
              {/* end parts */}
              <div
                className="tab-pane fade show"
                id="activities"
                role="tabpanel"
              >
                <div className="card card-xl-stretch mb-xl-10">
                    <Activities logName="boxheading" modelId={boxId} tab={tab}/>
                  </div>
              </div>
              {/* end activities */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxHeadingShow;
