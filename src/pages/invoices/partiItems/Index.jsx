import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const InvoicePartItems = ({ tab, active, invoice }) => {
  const { id } = useParams();
  return (
    <div
      className={`tab-pane fade ${tab == "part_items" ? "active show" : ""}`} 
      id="part_items"
      role="tabpanel"
    >
      <div className="d-flex flex-column gacompanyIdgap-lg-10">
        <div className="card card-custom gutter-b">
          <div className="card-header card-header-tabs-line">
            <div className="card-toolbar">
              <div className="card-title">
                <h3 className="card-label">Part Items</h3>
              </div>
            </div>
          </div>

          <div className="card-body px-0">
            <div className="card mb-5 mb-xl-8">
              <div className="card-body py-3">
                <div className="table-responsive">
                  <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                    <thead>
                      <tr className="fw-bolder text-muted">
                        <th className="min-w-50px">Part Name</th>
                        <th className="min-w-120px">Part Number</th>
                        <th className="min-w-120px">Quantity</th>
                        <th className="min-w-120px">Unit </th>
                        <th className="min-w-120px">Total </th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoice?.part_items?.map((item, index) => (
                        <tr key={index}>
                          <td className="">
                            <Link
                              to={"/panel/parts/" + item?.part?.id}
                              className="text-dark fw-bolder text-hover-primary"
                            >
                              {item?.part?.aliases[0].name}
                            </Link>
                          </td>
                          <td className=" fw-bolder mb-1 fs-6">
                            <span>{item?.part?.aliases[0].part_number}</span>
                          </td>

                          <td>
                            <span>{item.quantity}</span>
                          </td>
                          <td className=" fw-bolder mb-1 fs-6">
                            <span>{item?.unit_value}</span>
                          </td>

                          <td className=" fw-bolder mb-1 fs-6">
                            <span>
                              {invoice?.requisition?.type != "claim_report"
                                ? parseInt(item.total_value)
                                : 0}{" "}
                              TK.
                            </span>
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
      </div>
    </div>
  );
};

export default InvoicePartItems;
