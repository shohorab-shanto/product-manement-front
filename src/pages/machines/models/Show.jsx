import React, { useState, useEffect } from "react";
import { Activities } from "components/utils/Activities";
import { useParams, useNavigate } from "react-router-dom";
import MachineModelService from 'services/MachineModelService';

const ShowMachineModel = () => {
  let { machineId, modelId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getContract = async () => {
    setData(await MachineModelService.get(machineId, modelId));
  };

  useEffect(() => {
    if (modelId)
      getContract();
  }, [modelId]);
  return (
    <>
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
                    Machine Model Details
                  </h3>
                  <div className="separator"></div>

                  <div className="pb-5 fs-6">
                    <div className="fw-bolder mt-5">Name</div>
                    <div className="text-gray-600">
                      {data.name}
                    </div>

                   
                    <div className="fw-bolder mt-5">Description</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        {data.description}
                      </span>
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
                    Overview
                  </a>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="models"
                  role="tabpanel"
                >
                  <div className="card card-xl-stretch mb-xl-10">
                  <Activities logName="machine_models" modelId={modelId} tab="activities"/>
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

export default ShowMachineModel;
