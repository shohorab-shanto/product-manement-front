import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PartService from "services/PartService";
import GatePassService from "services/GatePassService";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const GatePass = () => {
  const [isModal, setIsModal] = useState(false);
  const [bgcolor, setBgcolor] = useState("bg-danger");
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({});
  const [searchData, setSearchData] = useState({});

  const [partFilter, setPartFilter] = useState({});
  const [partSearchData, setPartSearchData] = useState({});
  const [selectedPart, setSelectedPart] = useState({});
  const classNamevalue = "fw-bolder text-gray-700 fs-5 text-center m-10";
  const [color, setColor] = useState([]);

  // Start DN Search
  const filterData = (e) => {
    let query = e.target.value;
    setFilter({
      ...filter,
      q: query,
    });
  };
  const getDeliveryParts = async () => {
    let res = await GatePassService.getAll(filter);
    setSearchData(res.data);
    setLoading(true);
  };

  const DeliveryNoteSearch = async (e) => {
    e.keyCode === 13 && (await getDeliveryParts());
    if (filter?.q === "") setSearchData([]);
  };
  // End DN Search

  // Start Part Search
  const PartfilterData = (e) => {
    let query = e.target.value;
    setPartFilter({
      ...partFilter,
      q: query,
    });
  };

  const getParts = async () => {
    let res = await PartService.getAll(partFilter);
    // let res = await PartService.getGatePassPart(partFilter);
    let part = res.data.length ? res.data[0] : {}; //taking part in variable
    // let part = res?.[0]; //taking part in variable
    let item = searchData?.part_items?.find(
      (dt) => dt?.part?.unique_id == part?.unique_id
    ); // finding specific part in delivery note part
    let index = searchData?.part_items?.findIndex(
      (dt) => dt?.part?.unique_id == part?.unique_id
    ); // taking index of part

    setColor({ ...color, [index]: "bg-success" });
    // if (item) setSelectedPart(item.part);
    if (item) {
      setSelectedPart(res.data);
    }
    if (!item)
      window.Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Not found in Delivery note",
      });
  };

  const partSearch = async (e) => {
    if (e.key == "Enter") {
      e.keyCode === 13 && (await getParts());
      if (filter?.q === "") setSelectedPart([]);
    }
  };

  return (
    <div className="post d-flex flex-column-fluid" id="content">
      <div className="container-xxl">
        <div className="card">
          <div className="card-body py-20">
            <div className="mw-lg-950px mx-auto w-100">
              <div className="mb-19">
                {loading && (
                  <div className="row">
                    <div className="col-sm-3">
                      <Link to="#">
                        <img
                          alt="Logo"
                          src="/assets/media/logos/naf3.jpeg"
                          style={{ width: "5rem" }}
                        />
                      </Link>
                    </div>
                    <div className="col-sm-6">
                      <div
                        className="text-sm-center fw-bold fs-4 text-muted "
                        style={{ textAlign: "center", marginLeft: "2rem" }}
                      >
                        <h1>Naf Overseas(PVT.) Ltd.</h1>
                        <p className="text-sm">
                          <small>
                            Head Office:Naya paltan,Dhaka,Bangladesh
                          </small>
                          <br />
                          <small>
                            Tel:44564,Fax:sddsf,Email:asd@gmail.com,Web:example.com
                          </small>
                        </p>
                      </div>
                    </div>

                    <div className="col-sm-3 text-sm-end">
                      <Link to="#">
                        <img
                          alt="Logo"
                          src="/assets/media/logos/tajima.png"
                          style={{ width: "5rem", marginLeft: "2rem" }}
                        />
                      </Link>
                    </div>
                  </div>
                )}

                <div className="col-sm-12 mt-5">
                  <div className="text-sm-center">
                    <h1 className="text-uppercase">Gate Pass</h1>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="mt-5">
                  <h6>
                    <strong>
                      Delivery Note: <h2>{searchData?.dn_number}</h2>{" "}
                    </strong>
                    <span className="text-muted"></span>
                  </h6>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mt-2">
                    <label htmlFor=""></label>
                    {loading === false && (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        name="search"
                        value={filter.q || ""}
                        onChange={filterData}
                        onKeyUp={DeliveryNoteSearch}
                      />
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between flex-column flex-md-row">
                  <div className="flex-grow-1 pt-8 mb-13">
                    <div className="table-responsive ">
                      {loading && (
                        <div className="row">
                          <div className="col-md-6">
                            <div>
                              <label htmlFor=""></label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                name="PartSearch"
                                value={partFilter.q || ""}
                                onChange={PartfilterData}
                                onKeyUp={partSearch}
                              />
                              <div>
                                {selectedPart.length > 0 ? (
                                  <div className="card border border-secondary ">
                                    <div className="card-body ">
                                      {selectedPart?.map((item, index) => (
                                        <>
                                          <div key={index}>
                                            <div class="row">
                                              <div class="col-md-6 p-1">
                                                <img
                                                  src={item.image}
                                                  style={{
                                                    height: "150px",
                                                    width: "150px",
                                                  }}
                                                />
                                              </div>
                                              <div class="col-md-6 align-self-center">
                                                <div class="row">
                                                  <div
                                                    class="col"
                                                    style={{ width: 300 }}
                                                  >
                                                    <h5>Unique ID :</h5>
                                                    <br />
                                                    <h5>Name :</h5>
                                                    <br />
                                                    <h5>Part Number :</h5>
                                                    <br />
                                                  </div>
                                                  <div class="col">
                                                    <h3>{item.unique_id}</h3>
                                                    <br />
                                                    <h3>{item.name}</h3>
                                                    <br />
                                                    <h3>{item.part_number}</h3>
                                                    <br />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            {/* <p>
                                        <span>
                                          <img
                                            src={item.image}
                                            style={{
                                              height: "150px",
                                              width: "150px",
                                            }}
                                          />
                                        </span>
                                        <span>({item.part_number})</span>
                                        <span>({item.part_number})</span>
                                      </p> */}
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <table className="table">
                              <thead>
                                <tr className="fs-6 fw-bolder text-dark text-uppercase">
                                  <th className="min-w-70px pb-9 text-center">
                                    Parts Name
                                  </th>
                                  <th className="min-w-80px pb-9 text-center">
                                    Parts Number
                                  </th>

                                  <th className="min-w-100px pe-lg-6 pb-9 text-center">
                                    Quantity
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {searchData?.part_items?.map((item, index) => (
                                  <>
                                    <tr
                                      className={
                                        classNamevalue + " " + color[index]
                                      }
                                      key={index}
                                    >
                                      <td>{item?.part?.aliases[0].name}</td>
                                      <td>
                                        {item?.part?.aliases[0].part_number}
                                      </td>
                                      <td>{item?.quantity}</td>
                                    </tr>
                                    <div className="pt-1"></div>
                                  </>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
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

export default GatePass;
