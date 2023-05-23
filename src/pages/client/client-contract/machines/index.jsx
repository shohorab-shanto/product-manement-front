import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const MachineModels = ({ tab, models }) => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [machineModels, setMachineModels] = useState([]);

  useEffect(() => {
    if (models)
      setLoading(false)

    setMachineModels(models)
  }, [models]);


  return (
    <div
      className={`tab-pane fade ${tab == "machines" ? "active show" : ""
        }`}
      id="machines"
      role="tabpanel"
    >
      <div className="card card-xl-stretch mb-xl-10">
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bolder mb-2 text-dark">Machines</span>
          </h3>
        </div>
        <div className="card-body pt-5">
          <div className="table-responsive">
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-120px">Name</th>
                  <th className="min-w-50px">MFG Number</th>
                  <th className="min-w-50px">Space</th>
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

                {machineModels?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={"/panel/machines/" + item.machine_id + '/models/' + item.id}
                        className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                      >
                        {item?.model.name}
                      </Link>
                    </td>

                    <td className='text-dark fw-bolder d-block mb-1 fs-6'>{item?.mfg_number}</td>
                    <td className='text-dark fw-bolder '>{item?.model?.space ?? '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineModels;
