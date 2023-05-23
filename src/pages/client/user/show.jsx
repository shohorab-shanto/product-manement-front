import React, { useState, useEffect } from "react";
import { Activities } from "components/utils/Activities";
import { useParams, useNavigate } from "react-router-dom";
import ClientUserService from "services/clientServices/ClientUserService";

const ShowUser = () => {
  let {id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
console.log(data);
  const getUser = async () => {
    setData(await ClientUserService.getUser(id));
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
                          data?.status === 1
                            ? "badge badge-light-success"
                            : "badge badge-light-danger"
                        }
                      >
                        {data?.status === 1 ? "active" : "inactive"}
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
                  id="models"
                  role="tabpanel"
                >
                  <div className="card card-xl-stretch mb-xl-10">
                    <Activities logName="users" modelId={id} tab="activities"/>
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
