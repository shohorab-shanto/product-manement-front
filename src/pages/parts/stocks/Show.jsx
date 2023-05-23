import React, { useState, useEffect } from "react";
import { Activities } from "components/utils/Activities";
import Moment from "react-moment";
import { useParams, useNavigate } from "react-router-dom";
import PartStockService from "services/PartStockService";

const ShowStock = () => {
  let { partId, stockId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getStock = async () => {
    setData(await PartStockService.get(partId, stockId));
  };

  useEffect(() => {
    if (stockId)
      getStock();
  }, [stockId]);
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
                    Stock Details
                  </h3>

                  <div className="separator"></div>

                  <div className="pb-5 fs-6">
                    <div className="fw-bolder mt-5">Warehouse</div>
                    <div className="text-gray-600">
                      {data.warehouse?.name}
                    </div>

                    <div className="fw-bolder mt-5">Box Heading</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        {data.part_heading?.name}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Unit</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        {data.part?.unit?.pluralize().capitalize()}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Unit Value</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        {data.part?.unit === 'piece' ? parseFloat(data.unit_value).toFixed() : data.unit_value}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Yen Price</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        {data.yen_price}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Selling Price (BDT)</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        {data.selling_price}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Shipment Invoice No.</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        {data.shipment_invoice_no}
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Arrival Date</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        <Moment format="DD MMM YYYY">{data.shipment_date}</Moment>
                      </span>
                    </div>

                    <div className="fw-bolder mt-5">Note</div>
                    <div className="text-gray-600">
                      <span className="text-gray-600">
                        {data.notes}
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
                    <Activities logName="stocks" modelId={stockId} tab="activities"/>
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

export default ShowStock;
