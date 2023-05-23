import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ClientService from "services/ClientService";
import ClientCompanyMachinesService from "services/clientServices/ClientCompanyMachinesService";

const ClientCompanyMachines = () => {
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const [data, setData] = useState([]);

  const getClientComapnyMachines = async () => {
    setData(await ClientCompanyMachinesService.getAll());
    setLoading(false);
  };


  useEffect(() => {
    getClientComapnyMachines();
  }, []);



  return (
    <div className="post d-flex flex-column-fluid" id="kt_post">
      <div id="kt_content_container" className="container-xxl">
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">Machines</span>
            </h3>
          </div>

          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="min-w-120px">Machine</th>
                    <th className="min-w-50px">Model</th>
                    <th className="min-w-80px">MFG Number</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td>
                        <i className="fas fa-cog fa-spin"></i> Loading...
                      </td>
                    </tr>
                  ) : null}

                  {data?.data?.map((item, index) => (
                    <tr>
                      <Fragment key={index}>
                        <td>
                          {/* <Link
                            to={"/panel/machines/" + item?.model?.machine?.id}
                            className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                          >
                            {item?.model?.machine?.name} 
                          </Link> */}
                          
                            {item?.model?.machine?.name} 
                        </td>
                        <td>{item?.model?.name}</td>
                        <td>{item?.mfg_number}</td>
                      </Fragment>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCompanyMachines;
