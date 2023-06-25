import React, { useState, useEffect } from "react";
import { Activities } from "components/utils/Activities";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import WareHouseService from "services/WareHouseService";
import PartService from "services/PartService";
import Table from "components/utils/Table";
import PermissionAbility from "helpers/PermissionAbility";

const WareHouseShow = () => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("parts");
  const [parts, setParts] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWareHouse] = useState({});

  //Set the columns
  const columns = [
    {
      name: 'Common Name',
      selector: row => row.name,
      sortable: true,
      field: 'name',
      format: row => (
        <Link
          to={"/panel/parts/" + row.id}
          className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
        >
          {row.name}
        </Link>
      )
    },
    {
      name: 'Machine',
      selector: row => row.machines?.map((itm) => itm.name)?.join(', '),
      sortable: true,
      field: 'machine',
    },
    {
      name: 'Heading',
      selector: row => row.heading,
      sortable: true,
      field: 'heading',
    },
    {
      name: 'Part Number',
      selector: row => row.part_number,
      sortable: true,
      field: 'part_number',
    }
  ];


  const getWareHouse = async () => {
    setWareHouse(await WareHouseService.get(id));
  };

  const getParts = async (filters) => {
    filters.warehouse_id = id;
    setLoading(true);
    setParts(await PartService.getAll(filters));
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getWareHouse();
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
                  <label className="col-4 col-form-label">Name:</label>
                  <div className="col-8">
                    <span className="form-control-plaintext font-weight-bolder">
                      {warehouse.name}
                    </span>
                  </div>
                </div>


                <div className="form-group row my-2">
                  <label className="col-4 col-form-label">Description:</label>
                  <div className="col-8">
                    <span className="form-control-plaintext font-weight-bolder">
                      {warehouse.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="flex-lg-row-fluid ms-lg-15">
              {/* <div className="card-header card-header-tabs-line">
                <div className="card-toolbar">
                  {" "}
                  <div className="card-title">
                    <h3 className="card-label">Parts List</h3>
                  </div>
                </div>
              </div> */}
              <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
              <PermissionAbility permission="warehouses_parts_access">
              <li className="nav-item">
                <a
                  className={`nav-link text-active-primary pb-4 ${
                    tab == "parts" ? "active" : ""
                  }`}
                  data-bs-toggle="tab"
                  href="#parts"
                  onClick={() => setTab("parts")}
                >
                  Parts List
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

            


            <div className="tab-content"> 
            <PermissionAbility permission="warehouses_parts_access">
            <div
                   className={`tab-pane fade ${tab == "parts" ? "active show" : ""
                  }`}
                  id="parts"
                  role="tabpanel"
                >
                  <div className="card mb-5 mb-xl-8">
                  <div className="card-body py-3">
                    <Table
                      name="Parts"
                      isLoading={loading}
                      data={parts} 
                      columns={columns}
                      onFilter={getParts}
                    />
                    {/* <div className="table-responsive">
                      <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                        <thead>
                          <tr className="fw-bolder text-muted">
                            <th className="min-w-120px">Name</th>
                            <th className="min-w-180px">Machine</th>
                          </tr>
                        </thead>

                        <tbody>
                          {warehouse?.parts?.map((item, index) => (
                            <tr key={index}>
                              <td className=" fw-bolder  d-block mb-1 fs-6">
                                {item?.aliases[0]?.name}
                              </td>

                              <td>
                                {item?.aliases?.map((it, index) => (
                                  <Link
                                    to={`/panel/machines/${it?.machine?.id}`}
                                    className="text-dark fw-bolder text-hover-primary d-block mb-1"
                                    key={index}
                                  >
                                    {it?.machine?.name}
                                  </Link>
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div> */}
                  </div>
                </div>
                </div>
            </PermissionAbility>

                <Activities logName="warehouses" modelId={id} tab={tab}/>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WareHouseShow;
