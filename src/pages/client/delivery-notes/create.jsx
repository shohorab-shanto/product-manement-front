import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Moment from "react-moment";
import InvoiceService from "services/InvoiceService";
import PartService from "services/PartService";
import ClientDeliverNoteService from "services/clientServices/ClientDeliveryNoteService";
import ClientInvoiceService from "services/clientServices/ClientInvoiceService";
const CreateDelivery = () => {
  let { invoiceId } = useParams();

  const navigate = useNavigate();
  const [block, setBlock] = useState(false);
  const [filter, setFilter] = useState({});

  const [list, setList] = useState([]);
  const [selectedPart, setSelectedPart] =
    useState(false); /* Check Part selected or not selected*/
  const [searchData, setSearchData] = useState({});

  const [invoice, setInvoice] = useState({});
  const [parts, setParts] = useState([]);

  const [data, setData] = useState({
    invoice: invoice,
    part_items: list,
  });
  // console.log(data);

  const getParts = async () => {
    let res = await PartService.getClientPart(filter);
    setSearchData(res.data);
    let items = res.data?.map((dt) => {
      return { label: dt.name, value: dt.id }; 
    });

    setParts(items);
  };

  const getInvoice = async () => {
    let res = await ClientInvoiceService.get(invoiceId);
    setInvoice(res);
  };

  const filterData = (e) => {
    let query = e.target.value;

    setFilter({
      ...filter,
      q: query,
    });
  };

  // * Add Part

  const addPart = (item) => {
    //* quantity Set
    const res = invoice?.part_items?.find((it) => it.part_id === item.id);

    if (res?.part_id == item.id) {
      item["quantity"] = res.quantity;
      item["invoice_exists"] = true;
      item["quantity_match"] = true;
    } else {
      item["quantity"] = 0;
      item["invoice_exists"] = false;
      item["quantity_match"] = true;
    }
    // console.log(res);

    //* Remove Duplicates
    let found = list.filter((val) => val.id == item.id);
    if (!found?.length > 0) {
      const newList = list.concat(item);
      setList([...new Set(newList)]);
      /* add part in the List and remove duplicates from array */
      setSelectedPart(true);
      setFilter({ ...filter, q: "" });
      setSearchData("");
    }
  };

  // * Remove Item

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  // * Increment
  const increment = (item) => {
    const tempList = [...list];
    const tempItem = tempList.filter((val) => val.id === item.id);

    tempItem[0].quantity++;
    invoice?.part_items?.forEach((it) => {
      if (it?.part_id == item?.id) {
        if (it.quantity == item.quantity) {
          item["quantity_match"] = true;
        } else {
          item["quantity_match"] = false;
        }
      }
    });

    setList(tempList);
  };
  // *Decrement
  const decrement = (item) => {
    const tempList = [...list];
    const tempItem = tempList.filter((val) => val.id === item.id);
    tempItem[0].quantity--;
    invoice?.part_items?.forEach((it) => {
      if (it?.part_id == item?.id) {
        if (it.quantity == item.quantity) {
          item["quantity_match"] = true;
        } else {
          item["quantity_match"] = false;
        }
      }
    });

    setList(tempList);
  };

  const storeDeliveryNote = async () => {
    if (invoiceId) {
      setBlock(true);
      let res = await ClientDeliverNoteService.create(data);
      setBlock(false);
    //   navigate(`/panel/delivery-notes/${res.data?.id}/show`);
    }
  };

  const search = async (e) => {
    e.keyCode === 13 && (await getParts());
    if (filter?.q === "") setSearchData([]);
  };

  useEffect(() => {
    getInvoice();
  }, [invoiceId]);

  useEffect(() => {
    setData({
      invoice: invoice,
      part_items: list,
    });
  }, [invoiceId, list]);

  return (
    <div className="post d-flex flex-column-fluid" id="content">
      <div className="container-xxl">
        <div className="card">
          <div className="card-body py-20">
            <div className="mw-lg-950px mx-auto w-100">
              <div className="mb-19">
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
                        <small>Head Office:Naya paltan,Dhaka,Bangladesh</small>
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
                <div className="col-sm-12 mt-5">
                  <div className="text-sm-center">
                    <h1 className="text-uppercase">DELIVERY NOTE</h1>
                  </div>
                </div>
              </div>

              <div className="">
                <table width="100%">
                  <tr>
                    <td>
                      <h6>
                        <strong>Company Name:</strong>
                        <span className="text-muted">
                          {" "}
                          {invoice?.company?.name}
                        </span>
                      </h6>

                      <h6>
                        <strong>Group of Company: </strong>
                        <span className="text-muted">
                          {invoice?.company?.company_group}
                        </span>
                      </h6>
                    </td>
                    <td style={{ marginLeft: "120px" }} width="30%"></td>

                    <td style={{ marginLeft: "120px" }}>
                      <h6>
                        <strong>Date: </strong>
                        <span className="text-muted">
                          <Moment format="D MMMM YYYY">
                            {invoice?.invoice_date}
                          </Moment>
                        </span>
                      </h6>
                    </td>
                  </tr>
                </table>

                <div className="mt-5">
                  <h6>
                    <strong>Machine Model: </strong>
                    <span className="text-muted">
                      {invoice?.requisition?.machines?.map((item, index) => (
                        <span key={index} className="badge badge-secondary">
                          {item?.model?.name}
                        </span>
                      ))}{" "}
                    </span>
                  </h6>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mt-2">
                    <label htmlFor=""></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="search"
                      value={filter.q || ""}
                      onChange={filterData}
                      onKeyUp={search}
                    />
                    <div>
                      {searchData.length > 0 ? (
                        <div className="card border border-secondary ">
                          <div className="card-body ">
                            {searchData?.map((item, index) => (
                              <>
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
                                <hr />
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

                <div className="d-flex justify-content-between flex-column flex-md-row">
                  <div className="flex-grow-1 pt-8 mb-13">
                    <div className="table-responsive ">
                      <table className="table">
                        <thead>
                          <tr className="fs-6 fw-bolder text-dark text-uppercase">
                            <th className="min-w-25px pb-9">SL.No</th>
                            <th className="min-w-70px pb-9 text-end">
                              Parts Name
                            </th>
                            <th className="min-w-80px pb-9 text-end">
                              Parts Number
                            </th>

                            <th className="min-w-100px pe-lg-6 pb-9 text-end">
                              Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {list?.map((item, index) => (
                            <tr
                              className="fw-bolder text-gray-700 fs-5 text-end"
                              key={index}
                            >
                              <td className="d-flex align-items-center pb-10">
                                {index + 1}
                              </td>
                              <td>{item?.name}</td>
                              <td>{item?.part_number}</td>
                              <td className="product-quantity">
                                <div className="input-group input-group-sm">
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
                                    value={item?.quantity ?? ""}
                                    defaultValue={item?.quantity ?? ""}
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
                                {item?.invoice_exists ? (
                                  <span className="badge badge-success"></span>
                                ) : (
                                  <span className="badge badge-danger mt-2">
                                    <i className="fa fa-times-circle text-white"></i>{" "}
                                    Doesn't exist in the invoice
                                  </span>
                                )}
                                {item?.invoice_exists ? (
                                  item?.quantity_match ? (
                                    ""
                                  ) : (
                                    <span className="badge badge-warning mt-2">
                                      <i className="fa fa-exclamation-triangle text-white"></i>{" "}
                                      Quantity mismatched with the invoice
                                    </span>
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-icon btn-danger"
                                  data-kt-element="remove-item"
                                  onClick={() => removeItem(item?.id)}
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="separator separator-dashed"></div>

                      <button
                        className="btn btn-dark mt-5"
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        className="btn btn-primary mt-5"
                        onClick={() => {
                          storeDeliveryNote();
                        }}
                        style={{ marginLeft: "0.9rem" }}
                      >
                        Submit
                      </button>
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

export default CreateDelivery;
