import React, { useEffect, useState } from "react";
import { Activities } from "components/utils/Activities";
import { useParams } from "react-router-dom";
import CompanyService from "services/CompanyService";
import CompanyInfo from "./sections/Info";
import CompanyUsers from "./users/Index";
import Moment from "react-moment";
import CompanyMachines from "./machines/Index";
import PermissionAbility from "helpers/PermissionAbility";

const ShowCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [active, setActive] = useState("users");
  const getCompany = async () => {
    setCompany(await CompanyService.get(id));
  };

  useEffect(() => {
    getCompany();
  }, [id]);

  return (
    <div className="post d-flex flex-column-fluid" id="kt_post">
      <div id="kt_content_container" className="container-xxl">
        <div className="form d-flex flex-column flex-lg-row gap-7 gap-lg-10 fv-plugins-bootstrap5 fv-plugins-framework">
          <CompanyInfo company={company} />

          <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-n2">
              <li className="nav-item">
                <a
                  className="nav-link text-active-primary pb-4 active"
                  data-bs-toggle="tab"
                  href="#users"
                  onClick={() => {
                    setActive("users");
                  }}
                >
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-active-primary pb-4"
                  data-bs-toggle="tab"
                  href="#contracts"
                  onClick={() => {
                    setActive("contracts");
                  }}
                >
                  Contracts
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-active-primary pb-4"
                  data-bs-toggle="tab"
                  href="#machines"
                  onClick={() => {
                    setActive("machines");
                  }}
                >
                  Machines
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-active-primary pb-4"
                  data-bs-toggle="tab"
                  href="#activities"
                  onClick={() => {
                    setActive("activities");
                  }}
                >
                  Activities
                </a>
              </li>
            </ul>

            <div className="tab-content">
              {/* Tabs start from here */}
              <PermissionAbility permission="companies_users_access">
                <CompanyUsers active={active} companyId={company.id} />
              </PermissionAbility>
              <PermissionAbility permission="companies_contracts_access">
                <div className="tab-pane fade" id="contracts" role="tab-panel">
                  <div className="d-flex flex-column gap-7 gap-lg-10">
                    <div className="card card-flush py-4">
                      <div className="card-header">
                        <div className="card-title">
                          <h2>Contracts</h2>
                        </div>
                      </div>
                      <div className="card-body pt-0">
                        <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                          <thead>
                            <tr className="fw-bolder text-muted">
                              <th className="min-w-150px">Machine</th>
                              <th className="min-w-150px">Machine Models</th>
                              <th className="min-w-150px">Expiration Date</th>
                              <th className="min-w-150px">Type</th>
                              <th className="min-w-120px">Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            
                            {company?.contracts?.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {item?.machine_models?.map((it)=>(
                                    it?.model?.machine?.name
                                  )) }
                                </td>
                                <td>{item?.machine_models?.map((it)=>(
                                  it?.model?.name
                                ))}</td>
                           
                                <td>
                                  <Moment format="YYYY-MM-DD">
                                    {item.end_date}
                                  </Moment>
                                </td>

                                <td>
                                    {item.is_foc==true?"FOC":"AMC"}
                                </td>

                                <td
                                  className={
                                    item.status
                                      ? "badge badge-light-success"
                                      : "badge badge-light-danger"
                                  }
                                >
                                  
                                  <div
                                    className={
                                      item.status
                                        ? "badge badge-light-success"
                                        : "badge badge-light-danger"
                                    }
                                  >
                                    {item.status ? "Active" : "Inactive"}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </PermissionAbility>
              {/* Tabs end from here */}
              <PermissionAbility permission="companies_machines_access">
                <CompanyMachines active={active} companyId={company.id} />
              </PermissionAbility>
              {/* Tabs end from here */}
              <div
                className="tab-pane fade show"
                id="activities"
                role="tabpanel"
              >
                <div className="card card-xl-stretch mb-xl-10">
                    <Activities logName="companies" modelId={id} tab={active}/>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCompany;
