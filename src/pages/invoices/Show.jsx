import { Activities } from "components/utils/Activities";
import PermissionAbility from "helpers/PermissionAbility";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import InvoiceService from "services/InvoiceService";
import InvoicePartItems from "./partiItems/Index";
import InvoiceCreatePayment from "./paymentHistories/Create";
const ShowInvoice = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({});
  const [paymentHistories, setPaymentHistories] = useState([]);
  
  const [block, setBlock] = useState(false);
  const [active, setActive] = useState("part_items"); // * tab active or not
  const [tab, setTab] = useState("part_items");
  const [open, setOpen] = useState(false); //* open modal
  const getInvoice = async () => {
    let res = await InvoiceService.get(id);
    setInvoice(res);
  };


  const getPaymentHistories = async () => {
    let res = await InvoiceService.getPaymentHistories(id);
    setPaymentHistories(res.data);
  };
  const onCloseModal = () => {
    setOpen(false);
    // setOpenEditModal(false);
  };

  useEffect(()=>{
    if(!open){
      getPaymentHistories();
    }
  },[open])

  useEffect(() => {
    if (id) getInvoice();
    getPaymentHistories();
  }, [id]);
  return (
    <>
    
      <div className="d-flex flex-column-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <div className="card card-custom">
                <div className="card-header">
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
                  <div className="fw-bolder mt-5">Invoice Number</div>
                  <div className="text-gray-600">{invoice?.invoice_number}</div>
                  <div className="fw-bolder mt-5">Invoice Status</div>
                  {invoice?.requisition?.type !== "claim_report" ? (
                    <>
                      <div className="text-gray-600">
                        {invoice?.part_items?.reduce(
                          (partialSum, a) =>
                            partialSum + parseInt(a.total_value),
                          0
                        ) ==
                        paymentHistories?.reduce(
                          (partialSum, a) => partialSum + parseInt(a.amount),
                          0
                        ) ? (
                          <span className="badge badge-light-success">
                            Paid
                          </span>
                        ) : invoice?.part_items?.reduce(
                            (partialSum, a) =>
                              partialSum + parseInt(a.total_value),
                            0
                          ) >
                          paymentHistories?.reduce(
                            (partialSum, a) => partialSum + parseInt(a.amount),
                            0
                          ) ? (
                          <span className="badge badge-light-warning">
                            Partial Paid
                          </span>
                        ) : paymentHistories?.reduce(
                            (partialSum, a) => partialSum + parseInt(a.amount),
                            0
                          ) == 0 ? (
                          <span className="badge badge-light-danger">
                            {" "}
                            UnPaid
                          </span>
                        ) : (
                          <span className="badge badge-light-danger"> </span>
                        )}
                      </div>
                    </>
                  ) : (
                    "--"
                  )}

                  <div className="fw-bolder mt-5">Company</div>
                  <div className="text-gray-600">{invoice?.company?.name}</div>

                  <div className="fw-bolder mt-5">Invoice Date</div>
                  <div className="text-gray-600">
                    <Moment format="D MMMM YYYY">
                      {invoice?.invoice_date}
                    </Moment>
                  </div>

                  <div className="fw-bolder mt-5">Payment Mode</div>
                  <div className="text-gray-600">
                    {invoice?.payment_mode ?? "--"}
                  </div>

                  <div className="fw-bolder mt-5">Payment Term</div>
                  <div className="text-gray-600">
                    {invoice?.payment_term ?? "--"}
                  </div>

                  <div className="fw-bolder mt-5">Payment Partial Mode</div>
                  <div className="text-gray-600">
                    {invoice?.payment_partial_mode ?? "--"}
                  </div>
                  <div className="fw-bolder mt-5">Next Payment </div>
                  <div className="text-gray-600">
                    {invoice?.next_payment ?? "--"}
                  </div>

                  <div className="fw-bolder mt-5">Last Payment </div>
                  <div className="text-gray-600">
                    {invoice?.last_payment ?? "--"}
                  </div>

                  <div className="fw-bolder mt-5">Priority</div>
                  <div className="text-gray-600">
                    {invoice?.requisition?.priority?.capitalize()}
                  </div>

                  <div className="fw-bolder mt-5">Requisition Type</div>
                  <div className="text-gray-600">
                    {invoice?.requisition?.type
                      ?.replaceAll("_", " ")
                      ?.capitalize()}
                  </div>

                  <div className="fw-bolder mt-5">Requisition Ref Number</div>
                  <div className="text-gray-600">
                    {invoice?.requisition?.ref_number ?? "--"}
                  </div>
                </div>
                  <div className="card-header">
                  <div className="card-title">
                  <PermissionAbility permission="invoices_print">
                  <h3 className="card-label">
                    <Link
                      className="btn btn-sm btn-dark "
                      to={"/panel/invoices/" + invoice.id + "/print"}
                      style={{ marginRight: "0.75rem" }}
                      target="_blank"
                    >
                      Print
                    </Link>
                  </h3>
                  </PermissionAbility>
                  
                  <PermissionAbility permission="invoices_generate_delivery_note">
                  <h3 className="card-label">
                    <button
                      className="btn btn-sm btn-dark "
                      style={{ marginRight: "0.1rem" }}
                      onClick={() => navigate(`/panel/delivery-notes/${invoice?.id}/create`)}
                    >
                       Generate Delivery Note
                    </button>
                    </h3>
                  </PermissionAbility>
                    
                    
                  
                  </div> 
                </div>
              </div>
            </div>

            <div className="col-xl-9">
              <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-n2">
                  <li className="nav-item">
                    <a
                      className="nav-link text-active-primary pb-4 active"
                      data-bs-toggle="tab"
                      href="#part_items"
                      onClick={() => {
                        setActive("part_items");
                        setTab("part_items");
                      }}
                    >
                      Part Items
                    </a>
                  </li>
                  {invoice?.requisition?.type !== "claim_report" ? (
                    <li className="nav-item">
                      <a
                        className="nav-link text-active-primary pb-4"
                        data-bs-toggle="tab"
                        href="#payment_histories"
                        onClick={() => {
                          setActive("payment_histories");
                        }}
                      >
                        Payment Histories
                      </a>
                    </li>
                  ) : (
                    ""
                  )}

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

                  
                {/* <li className="nav-item">
                  <a
                    className={`nav-link text-active-primary pb-4 ${
                      tab == "delivery_notes" ? "active" : ""
                    }`}
                    data-bs-toggle="tab"
                    href="#delivery_notes"
                    onClick={() => setTab("delivery_notes")}
                  >
                    Delivery Notes
                  </a>
                </li> */}

                
                </ul>


                <div className="tab-content">
                  {/* Tabs start from here */}

                  <InvoicePartItems
                    active={active}
                    invoice={invoice}
                    tab={tab}
                  />
                  <Activities logName="invoices" modelId={id} tab={tab} />
                  <div
                    className={`tab-pane fade ${
                      tab == "payment_histories" ? "active show" : ""
                    }`}
                    id="payment_histories"
                    role="tab-panel"
                  >
                    <div className="d-flex flex-column gap-7 gap-lg-10">
                      <div className="card card-flush py-4">
                        <div className="card-header">
                          <div className="card-title">
                            <h2>Payment Histories</h2>
                          </div>
                          <div className="card-toolbar">
                          <PermissionAbility permission="invoices_payment"> 
                          <button
                              type="button"
                              className="btn btn-light-primary"
                              onClick={() => {
                                setOpen(true);
                              }}
                            >
                              <span className="svg-icon svg-icon-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <rect
                                    opacity="0.3"
                                    x="2"
                                    y="2"
                                    width="20"
                                    height="20"
                                    rx="5"
                                    fill="black"
                                  ></rect>
                                  <rect
                                    x="10.8891"
                                    y="17.8033"
                                    width="12"
                                    height="2"
                                    rx="1"
                                    transform="rotate(-90 10.8891 17.8033)"
                                    fill="black"
                                  ></rect>
                                  <rect
                                    x="6.01041"
                                    y="10.9247"
                                    width="12"
                                    height="2"
                                    rx="1"
                                    fill="black"
                                  ></rect>
                                </svg>
                              </span>
                              Add Payment
                            </button>
                          </PermissionAbility>
                            
                          </div>
                        </div>
                        <div className="card-body pt-0">
                          <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                            <thead>
                              <tr className="fw-bolder text-muted">
                                <th className="min-w-80px">Invoice Id</th>
                                <th className="min-w-120px">payment Mode</th>
                                <th className="min-w-120px">Payment Date</th>
                                <th className="min-w-120px">Amount</th>
                                <th className="min-w-150x">Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {paymentHistories?.map((item, index) => (
                                <tr key={index}>
                                  <td>{item?.invoice?.invoice_number}</td>
                                  <td>{item.payment_mode}</td>

                                  <td>
                                    <Moment format="YYYY-MM-DD">
                                      {item.payment_date}
                                    </Moment>
                                  </td>
                                  <td>{Math.floor(item?.amount)}Tk.</td>

                                  <td>
                                    <span className="text-end">
                                      <Link
                                        to={
                                          `/panel/invoices/` +
                                          item?.invoice?.id +
                                          `/payment-histories/` +
                                          item.id
                                        }
                                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                      >
                                        <i className="fa fa-eye"></i>
                                      </Link>
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
          </div>
        </div>
      </div>

      <InvoiceCreatePayment
        open={open}
        onCloseModal={onCloseModal}
        invoice={invoice}
      />
    </>
  );
};

export default ShowInvoice;
