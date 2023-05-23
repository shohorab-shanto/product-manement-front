import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { DebounceInput } from "react-debounce-input";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompanyService from "services/CompanyService";
import PartService from "services/PartService";
import RequisitionService from "services/RequisitionService";

const RequisitionCreate = () => {
  const navigate = useNavigate();

  const [req, setReq] = useState(false);
  const [inputField, setInputField] = useState([{}]);
  const handleReqSelect = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputField];

    list[index][name] = value;
    setInputField(list);
  };
  const handlePartAdd = () => {
    setInputField([...inputField, {}]);
  };
  const handlePartRemove = (index) => {
    const list = [...inputField];
    list.splice(index, 1);
    setInputField(list);
  };

  const [companies, setCompanies] = useState([]);
  const [machineModels, setMachineModels] = useState([]);
  // console.log(machineModels);
  const [filter, setFilter] = useState({
    part_heading_id: null,
  });
  // console.log(partHeadings);
  const [uniquePart, setUniquePart] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [list, setList] = useState([]); /* for adding part in requisition */
  const [selectedPart, setSelectedPart] =
    useState(false); /* Check Part selected or not selected*/
  const [totalAmount, setTotal] = useState(0); //total amount
  const [engineers, setEngineers] = useState([]);

  const [data, setData] = useState({
    company_id: "",
    engineer_id: "",
    machine_id: "",
    priority: "",
    type: "",
    payment_mode: "",
    expected_delivery: "",
    payment_term: "",
    payment_partial_mode: "",
    partial_time: "",
    next_payment: "",
    ref_number: "",
    machine_problems: "",
    solutions: "",
    reason_of_trouble: "",
    remarks: "",
    part_items: list,
    total: totalAmount,
    files: [],
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const testData = queryParams.get("data");
    setData(JSON.parse(testData));
  }, []);
  const [partHeading, setPartHeading] = useState(null);
  const [block, setBlock] = useState(false);
  const [parts, setParts] = useState([]);

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const types = [
    { value: "claim_report", label: "Claim Report" },
    { value: "purchase_request", label: "Purchase Request" },
  ];

  const payments = [
    { value: "cash", label: "Cash" },
    { value: "bank", label: "Bank" },
    { value: "check", label: "Check" },
    { value: "card", label: "Card" },
  ];

  const payment_terms = [
    { value: "full", label: "Full" },
    { value: "half", label: "Half" },
    { value: "partial", label: "Partial" },
  ];

  const payment_partial_mode = [
    { value: "days", label: "Days" },
    { value: "weeks", label: "Weeks" },
    { value: "months", label: "Months" },
    { value: "years", label: "Years" },
  ];

  const storeRequisition = async () => {
    setBlock(true);
    req
      ? await RequisitionService.createrequiredrequisitions({
          ...data,
          part_items: inputField,
        })
      : await RequisitionService.create(data);
    setBlock(false);
    if (req) {
      navigate("/panel/require_req");
    } else {
      navigate("/panel/requisitions");
    }
  };

  const addPart = (item) => {
    item["quantity"] = 0;
    let hasItem = list.find((itm) => itm.id == item.id);
    if (hasItem) return false;

    const newList = list.concat(item);
    setList(
      Array.from(new Set(newList))
    ); /* add part in the List and remove duplicates from array */
    setSelectedPart(true);
    setFilter({ ...filter, q: "" });
    setSearchData("");
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const getCompanies = async () => {
    let dt = await CompanyService.getAll({
      rows: "all",
    });

    dt = dt.map((itm) => ({ label: itm.name, value: itm.id })); //Parse the data as per the select requires
    setCompanies(dt);
  };

  const getEngineers = async () => {
    let dt = await RequisitionService.engineers();
    dt = dt.map((itm) => ({ label: itm?.name, value: itm?.id }));
    setEngineers(dt);
  };

  const getMachineModels = async (companyId) => {
    setBlock(false);
    let dt = await CompanyService.getMachines(companyId);
    dt = dt.map((itm) => ({
      label: itm.machine_model?.name,
      value: itm.id,
    })); //Parse the data as per the select requires

    setMachineModels(dt);
    setData({
      ...data,
      ...{ machine_model_id: null },
    });
    setBlock(false);
  };

  const handleSelect = (option, conf) => {
    // console.log("shanto",conf)
    // console.log("shantoargha",option)
    // if(conf.name = "part_heading_id"){
    // setPartHeading(option);
    // }
    let value = option.value;
    if (Array.isArray(option))
      value = option.map((dt) => {
        return dt.value;
      });

    const name = conf.name;
    setBlock(false);

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.value });
  };

  const handleDateSelect = (value, name) => {
    setData({
      ...data,
      ...{
        [name]: new Date(value),
        [name + "_format"]: moment(value).format("YYYY/MM/DD"),
      },
    });
    setBlock(false);
  };

  const getParts = async () => {
    let res = await PartService.getAll({
      ...filter,
      company_id: data?.company_id,
      machine_id: data?.machine_id,
    });    
    setSearchData(res.data);
    let items = res.data?.map((dt) => {
      return { label: dt.name, value: dt.id };
    });

    setParts(items);
  };

  const filterData = (e) => {
    let query = e.target.value;
    setFilter({
      ...filter,
      q: query,
      part_heading_id: data?.part_heading_id,
    });
  };

  const search = async (e) => {
    if (!data?.machine_id) {
      return toast.warning("Please select machine first located at the top!");
    } else {
      await getParts();
    }
    if (filter?.q === "") setSearchData([]);
  };
  useEffect(() => {
    if (filter?.q) {
      search();
    }
  }, [filter]);

  useEffect(() => {
    setData({ ...data, part_items: list, total: totalAmount }); //add part_items and total amount in data
  }, [list, totalAmount]);

  useEffect(() => {
    if (data.company_id) getMachineModels(data?.company_id);
  }, [data.company_id]);

  useEffect(() => {
    getCompanies();
    getEngineers();
  }, []);

  useEffect(() => {
    const sum = list.reduce(
      (partialSum, a) => partialSum + a.selling_price * a.quantity,
      0
    );
    setTotal(sum);
  }, [list]);

  const increment = (item) => {
    const tempList = [...list];
    const tempItem = tempList.filter((val) => val.id === item.id);
    tempItem[0].quantity++;

    setList(tempList);
  };

  const decrement = (item) => {
    const tempList = [...list];
    const tempItem = tempList.filter((val) => val.id === item.id);
    tempItem[0].quantity--;

    setList(tempList);
  };

  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          <div className="d-flex flex-column flex-lg-row">
            <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
              <div className="card mb-5">
                <div className="card-body p-12">
                  <form action="" id="kt_invoice_form">
                    <div className="d-flex flex-column align-items-start flex-xxl-row">
                      <div className="d-flex align-items-center flex-equal fw-row me-4 order-2">
                        <input
                          type="text"
                          className="form-control w-50"
                          name="ref_number"
                          placeholder="Ref Number"
                          onChange={handleChange}
                        />
                        <div
                          className="fv-plugins-message-container invalid-feedback"
                          htmlFor="ref_number"
                        ></div>
                      </div>

                      <div className="d-flex flex-center flex-equal fw-row text-nowrap order-1 order-xxl-2 me-4">
                        <span className="fs-2x fw-bolder text-gray-800">
                          Requisition
                        </span>
                      </div>

                      <div className="d-flex align-items-center justify-content-end flex-equal order-3 fw-row">
                        <span className="fs-5">
                          Date: {moment().format("DD-MM-YYYY")}
                        </span>
                      </div>
                    </div>

                    <div className="separator separator-dashed my-10"></div>

                    <div className="row gx-10 mb-5">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="required form-label">Company</label>
                          <Select
                            options={companies}
                            onChange={handleSelect}
                            name="company_id"
                          />

                          <div
                            className="fv-plugins-message-container invalid-feedback"
                            htmlFor="company_id"
                          ></div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="required form-label">Machine</label>
                          <Select
                            isMulti
                            options={machineModels}
                            onChange={handleSelect}
                            name="machine_id"
                          />
                          <div
                            className="fv-plugins-message-container invalid-feedback"
                            htmlFor="machine_id"
                          ></div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label className="form-label">Engineer</label>

                        <div className="mb-5">
                          <Select
                            options={engineers}
                            onChange={handleSelect}
                            name="engineer_id"
                          />
                          <div
                            className="fv-plugins-message-container invalid-feedback"
                            htmlFor="engineer_id"
                          ></div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label className="required form-label">Priority</label>
                        <div className="mb-5">
                          <Select
                            options={priorities}
                            name="priority"
                            onChange={handleSelect}
                          />
                          <div
                            className="fv-plugins-message-container invalid-feedback"
                            htmlFor="priority"
                          ></div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label className="form-label">Expected Delivery</label>
                        <div className="mb-5">
                          <div className="form-group ">
                            <DatePicker
                              className="form-control"
                              name="expected_delivery"
                              selected={data.expected_delivery}
                              onChange={(date) =>
                                handleDateSelect(date, "expected_delivery")
                              }
                            />
                            <input
                              type="hidden"
                              name="expected_delivery"
                              id="expected_delivery"
                              value={data.expected_delivery}
                            />
                            <div
                              className="fv-plugins-message-container invalid-feedback"
                              htmlFor="expected_delivery"
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label htmlFor="type" className="required form-label">
                          Type
                        </label>
                        <div className="mb-5">
                          <div className="form-group">
                            <Select
                              options={types}
                              name="type"
                              onChange={handleSelect}
                            />
                          </div>
                          <div
                            className="fv-plugins-message-container invalid-feedback"
                            htmlFor="type"
                          ></div>
                        </div>
                      </div>

                      {data?.type !== "claim_report" && data?.type !== "" && (
                        <>
                          <div className="col-lg-6">
                            <div className="mb-5">
                              <label className="required form-label">
                                Payment Mode
                              </label>
                              <Select
                                options={payments}
                                name="payment_mode"
                                onChange={handleSelect}
                              />
                              <div
                                className="fv-plugins-message-container invalid-feedback"
                                htmlFor="payment_mode"
                              ></div>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="mb-5">
                              <label className="required form-label">
                                Payment Term
                              </label>
                              <Select
                                options={payment_terms}
                                name="payment_term"
                                onChange={handleSelect}
                              />
                              <div
                                className="fv-plugins-message-container invalid-feedback"
                                htmlFor="payment_term"
                              ></div>
                            </div>
                          </div>
                          {data?.payment_term === "partial" && (
                            <>
                              <div className="col-lg-4">
                                <label htmlFor="payment_partial_mode">
                                  Payment Partial Mode
                                </label>
                                <div className="mb-5 mt-2">
                                  <Select
                                    options={payment_partial_mode}
                                    name="payment_partial_mode"
                                  />
                                </div>
                                <div
                                  className="fv-plugins-message-container invalid-feedback"
                                  htmlFor="payment_partial_mode"
                                ></div>
                              </div>

                              <div className="col-lg-4">
                                <label className="required form-label">
                                  Partial Time
                                </label>
                                <div className="mb-5">
                                  <input
                                    type="text"
                                    className="form-control form-control-solid "
                                    name="partial_time"
                                    placeholder="Partial Time"
                                    onChange={handleChange}
                                  />
                                  <div
                                    className="fv-plugins-message-container invalid-feedback"
                                    htmlFor="partial_time"
                                  ></div>
                                </div>
                              </div>

                              <div className="col-lg-4">
                                <label htmlFor="types">Next Payment</label>
                                <div className="mb-5">
                                  <DatePicker
                                    className="form-control"
                                    name="next_payment"
                                    selected={data.next_payment}
                                    onChange={(date) =>
                                      handleDateSelect(date, "next_payment")
                                    }
                                  />
                                  <input
                                    type="hidden"
                                    name="next_payment"
                                    id="next_payment"
                                    value={data.next_payment}
                                  />
                                  <div
                                    className="fv-plugins-message-container invalid-feedback"
                                    htmlFor="next_payment"
                                  ></div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      <div className="col-lg-6">
                        <label
                          className="form-label fs-6 fw-bolder text-gray-700"
                          htmlFor="types"
                        >
                          Machine Problems
                        </label>
                        <textarea
                          className="form-control form-control-solid mb-3"
                          rows="5"
                          name="machine_problems"
                          data-kt-element="input"
                          placeholder="Type a message"
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="col-lg-6">
                        <label
                          className="form-label fs-6 fw-bolder text-gray-700"
                          htmlFor="types"
                        >
                          Solutions
                        </label>
                        <textarea
                          className="form-control form-control-solid mb-3"
                          rows="5"
                          name="solutions"
                          data-kt-element="input"
                          placeholder="Type a message"
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="col-lg-6">
                        <label
                          className="form-label fs-6 fw-bolder text-gray-700"
                          htmlFor="types"
                        >
                          Reason of Trouble
                        </label>
                        <textarea
                          className="form-control form-control-solid mb-3"
                          rows="5"
                          name="reason_of_trouble"
                          data-kt-element="input"
                          placeholder="Type a message"
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="col-lg-6">
                        <label className="form-label fs-6 fw-bolder text-gray-700">
                          Remarks
                        </label>
                        <textarea
                          name="remarks"
                          className="form-control form-control-solid"
                          rows="5"
                          placeholder="Thanks for your business"
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row">
            <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
              <div className="card mb-5">
                <div className="card-body">
                  <span>
                    <input
                      type="checkbox"
                      defaultChecked={req}
                      onChange={() => setReq(!req)}
                    />
                  </span>

                  <span className="p-5">Not in List?</span>
                </div>
              </div>
            </div>
          </div>

          {req ? (
            <span>
              {inputField?.map((item, index) => (
                <Fragment key={index}>
                  <div className="form-group mt-5">
                    <div className="row">
                      <div className="col-sm-3 col-md-3">
                        <label className="required form-label">Part Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Part Name"
                          name="part_name"
                          id="part_name"
                          onChange={(e) => handleReqSelect(e, index)}
                        />
                        <div
                          className="fv-plugins-message-container invalid-feedback"
                          htmlFor="part_number[]"
                        ></div>
                      </div>
                      <div className="col-sm-2 col-md-2">
                        <label className="form-label">Part Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Part Number"
                          name="part_number"
                          id="part_number"
                          onChange={(e) => handleReqSelect(e, index)}
                        />
                        <div
                          className="fv-plugins-message-container invalid-feedback"
                          htmlFor="part_number[]"
                        ></div>
                      </div>
                      <div className="col-sm-1 col-md-1">
                        <label className="required form-label">Quantity</label>
                        <input
                          className="form-control"
                          name="qty"
                          id="qty"
                          onChange={(e) => handleReqSelect(e, index)}
                          type="number"
                        />
                        <div
                          className="fv-plugins-message-container invalid-feedback"
                          htmlFor="part_number[]"
                        ></div>
                      </div>
                      <div className="col-sm-1 mt-8">
                        <button
                          type="button"
                          className="btn btn-danger float-right"
                          onClick={() => handlePartRemove(index)}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {inputField.length - 1 === index && (
                    <button
                      type="button"
                      className="btn btn-primary mt-5"
                      onClick={handlePartAdd}
                    >
                      <i className="fa fa-plus"></i> Add More
                    </button>
                  )}
                </Fragment>
              ))}
              <div className="mt-5">
                <button
                  onClick={() => {
                    storeRequisition();
                  }}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </span>
          ) : (
            <span>
              <div className="d-flex flex-column flex-lg-row">
                <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
                  <div className="card mb-5">
                    <div className="card-body p-12">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group">
                            <div
                              className="fv-plugins-message-container invalid-feedback"
                              htmlFor="part_heading_id"
                            ></div>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mt-2">
                            <label htmlFor=""></label>
                            <DebounceInput
                              className="form-control"
                              placeholder="search"
                              debounceTimeout={300}
                              onChange={filterData}
                            />

                            <div>
                              {searchData.length > 0 ? (
                                <div className="card border border-secondary ">
                                  <div className="card-body ">
                                    {searchData?.map((item, index) => (
                                      <div key={index}>
                                        <Link
                                          to={item?.id}
                                          style={{ color: "black" }}
                                          onClick={() => addPart(item)}
                                        >
                                          <p>
                                            {item?.name}
                                            <span>({item.part_number})</span>
                                          </p>
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {!selectedPart && (
                <div className="d-flex flex-column flex-lg-row">
                  <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
                    <div className="p-20 bg-white mb-2 text-center">
                      No items selected
                    </div>
                  </div>
                </div>
              )}
              {selectedPart && list.length > 0 ? (
                <div className="d-flex flex-column flex-lg-row">
                  <div className="flex-lg-row-fluid mb-lg-0 me-lg-7 me-xl-10">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="table-responsive">
                              <table
                                className="table g-5 gs-0 mb-0 fw-bolder text-gray-700"
                                data-kt-element="items"
                              >
                                <thead>
                                  <tr className="border-bottom fs-7 fw-bolder text-gray-700 text-uppercase">
                                    <th className="min-w-300px w-475px">
                                      Item
                                    </th>
                                    <th className="min-w-300px w-475px">
                                      Part Number
                                    </th>
                                    <th className="min-w-100px w-250px">QTY</th>
                                    <th className="min-w-75px w-75px text-end">
                                      Action
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {list?.map((item, index) => (
                                    <tr key={index}>
                                      <td className="pe-7" name="part_name">
                                        {item?.name}
                                      </td>
                                      <td name="part_number">
                                        {item?.part_number}
                                      </td>

                                      <td className="product-quantity">
                                        <div className="input-group input-group-sm ">
                                          <div className="input-group-prepend">
                                            <span
                                              className="input-group-text"
                                              id="inputGroup-sizing-sm"
                                              onClick={() => {
                                                if (item?.quantity > 0) {
                                                  decrement(item);
                                                }
                                              }}
                                            >
                                              <i className="fas fa-minus"></i>
                                            </span>
                                          </div>
                                          <input
                                            type="text"
                                            className="form-control"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            min="1"
                                            value={item.quantity ?? ""}
                                            defaultValue={item.quantity}
                                            name="quantity"
                                          />

                                          <div className="input-group-prepend">
                                            <span
                                              className="input-group-text"
                                              onClick={() => increment(item)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              <i className="fas fa-plus"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end">
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-icon btn-danger"
                                          data-kt-element="remove-item"
                                          onClick={() => removeItem(item?.id)}
                                        >
                                          <i className="fa fa-trash"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className="separator separator-dashed"></div>
                        <div className="mt-5">
                          <button
                            onClick={() => {
                              storeRequisition();
                            }}
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default RequisitionCreate;
