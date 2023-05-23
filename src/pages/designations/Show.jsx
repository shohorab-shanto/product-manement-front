import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DesignationService from "../../services/DesignationService";

import Moment from "react-moment";

const ShowDesignation = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [designation, setDesignation] = useState({});
  const getDesignation = async () => {
    setDesignation(await DesignationService.get(id));
  };

  useEffect(() => {
    if (id) {
      getDesignation();
    }
  }, [id]);

  return (
    <div className="d-flex flex-column-fluid">
      <div className="container">
        <div className="row">
          <div className="col-xl-4">
            <div className="card card-custom">
              <div className="card-header h-auto py-4">
                <div className="card-title">
                  <h3 className="card-label">
                    <button
                      className="btn btn-sm btn-dark "
                      style={{ marginRight: "0.75rem" }}
                      onClick={() => navigate(-1)}
                    >
                      <i className="fa fa-arrow-left"></i>Back
                    </button>
                    Details
                  </h3>
                </div>
              </div>

              <div className="card-body py-4">
                <div className="form-group row my-2">
                  <label className="col-4 col-form-label">Id:</label>
                  <div className="col-8">
                    <span className="form-control-plaintext font-weight-bolder">
                      {designation.id}
                    </span>
                  </div>
                </div>
                <div className="form-group row my-2">
                  <label className="col-4 col-form-label">Name:</label>
                  <div className="col-8">
                    <span className="form-control-plaintext font-weight-bolder">
                      {designation.name}
                    </span>
                  </div>
                </div>
                <div className="form-group row my-2">
                  <label className="col-4 col-form-label">Created At:</label>
                  <div className="col-8">
                    <span className="form-control-plaintext">
                      <span className="label label-inline label-danger label-bold">
                        <Moment format="D MMMM YYYY">
                          {designation.created_at}
                        </Moment>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="form-group row my-2">
                  <label className="col-4 col-form-label">Updated At:</label>
                  <div className="col-8">
                    <span className="form-control-plaintext font-weight-bolder">
                      <Moment format="D MMMM YYYY">
                        {designation.updated_at}
                      </Moment>
                    </span>
                  </div>
                </div>
                <div className="form-group row my-2">
                  <label className="col-4 col-form-label">Description:</label>
                  <div className="col-8">
                    <span className="form-control-plaintext font-weight-bolder">
                      {designation.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card card-custom gutter-b">
              <div className="card-header card-header-tabs-line">
                <div className="card-toolbar">
                  {" "}
                  <div className="card-title">
                    <h3 className="card-label">Employee List</h3>
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
                            <th className="w-25px"></th>
                            <th className="min-w-50px">Avatar</th>
                            <th className="min-w-120px">Name</th>
                            <th className="min-w-120px">Email</th>
                           
                          </tr>
                        </thead>

                        <tbody>
                          {designation?.employees?.map((item, index) => (
                            <tr key={index}>
                              <td></td>
                              <td>
                                <span className="symbol-label">
                                  {" "}
                                  <img
                                    src={item?.avatar}
                                    className="align-self-end"
                                    alt="asd"
                                    height="20px"
                                  />
                                </span>
                              </td>
                              <td className=" fw-bolder  d-block mb-1 fs-6">
                                {item?.name}
                              </td>
                              <td className="fw-bolder  ">
                                {item?.email}
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
      </div>
    </div>
  );
};

export default ShowDesignation;
