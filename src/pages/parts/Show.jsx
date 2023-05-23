// import { Chart, registerables } from 'chart.js'

import { Activities } from "components/utils/Activities";
import PermissionAbility from "helpers/PermissionAbility";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { useParams, useNavigate, Link } from "react-router-dom";
import PartService from "services/PartService";
import PartAliases from "./aliases/Index";
import EditPart from "./Edit";
import PartStocks from "./stocks/Index";

const ShowPart = () => {
  // Chart.register(...registerables)
  const [openEditModal, setOpenEditModal] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("stocks");
  const [data, setData] = useState({
    aliases: [],
  });

  const getPart = async () => {
    setData(await PartService.get(id));
  };

  function printBarcode() {
    let content = document.getElementById("barcode").innerHTML;
    let a = window.open("", "", "height=500, width=500");
    a.document.write("<html>");
    a.document.write("<body>");
    a.document.write(content);
    a.document.write("</body></html>");
    a.document.close();
    a.print();
  }

  useEffect(() => {
    if (id) getPart();
  }, [id]);
  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
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
                    Part Details
                  </h3>

                  <div className="separator"></div>

                  <div className="text-center mt-5">
                    <div className="image-input image-input-empty image-input-outline mb-3">
                      <div
                        className="image-input-wrapper w-150px h-150px"
                        style={{
                          backgroundImage: "url(" + data.image + ")",
                        }}
                      ></div>
                    </div>
                    <div className="fs-7">
                      <h2>{data.aliases[0]?.name}</h2>
                    </div>
                  </div>

                  <div className="pb-5 fs-6">
                    <div className="fw-bolder mt-5">Barcode</div>
                    <div className="text-gray-600">
                      <span
                        className="text-gray-600 text-hover-primary"
                        id="barcode"
                      >
                        {data.barcode && (
                          <img
                            src={`data:image/jpeg;base64,${data?.barcode}`}
                            alt="barcode"
                          />
                        )}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Description</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600 text-hover-primary">
                        {data.description}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Remarks</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600 text-hover-primary">
                        {data.remarks}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Last Update</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600 text-hover-primary">
                        <Moment format="YYYY-MM-DD">{data.updated_at}</Moment>
                      </span>
                    </div>

                    <div className="separator mt-5"></div>
                    <PermissionAbility permission="parts_barcode">
                    <button
                      onClick={printBarcode}
                      type="button"
                      className="btn btn-dark btn-sm m-2"
                    >
                      Print Barcode
                    </button>
                    </PermissionAbility>
                    
                    <PermissionAbility permission="parts_edit">
                    <button
                      onClick={() => setOpenEditModal(true)}
                      type="button"
                      className="btn btn-primary btn-sm m-2" 
                    >
                      Edit
                    </button>
                    </PermissionAbility>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-lg-row-fluid ms-lg-15">
              <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
                <PermissionAbility permission="parts_stocks_access">
                  <li className="nav-item">
                    <a
                      className={`nav-link text-active-primary pb-4 ${
                        tab == "stocks" ? "active" : ""
                      }`}
                      data-bs-toggle="tab"
                      href="#stocks"
                      onClick={() => setTab("stocks")}
                    >
                      Stocks
                    </a>
                  </li>
                </PermissionAbility>
                <PermissionAbility permission="parts_aliases_access">
                  <li className="nav-item">
                    <a
                      className={`nav-link text-active-primary pb-4 ${
                        tab == "aliases" ? "active" : ""
                      }`}
                      data-bs-toggle="tab"
                      href="#aliases"
                      onClick={() => setTab("aliases")}
                    >
                      Aliases
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
                <PermissionAbility permission="parts_aliases_access">
                  <PartAliases
                    tab={tab}
                    models={data.models}
                    onChange={() => getPart}
                  />
                </PermissionAbility>
                <PermissionAbility permission="parts_stocks_access">
                  <PartStocks
                    tab={tab}
                    models={data.models}
                    onChange={() => getPart}
                    part={data}
                  />
                </PermissionAbility>
                <Activities logName="parts" modelId={id} tab={tab} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditPart
        open={openEditModal}
        partId={id}
        onCloseModal={() => setOpenEditModal(false)}
        onUpdated={getPart}
      />
    </>
  );
};

export default ShowPart;
