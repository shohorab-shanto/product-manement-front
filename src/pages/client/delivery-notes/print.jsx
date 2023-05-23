import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Moment from "react-moment";
import ClientDeliverNoteService from "services/clientServices/ClientDeliveryNoteService";
const PrintDeliveryNotes = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [deliveryNote, setDeliveryNote] = useState({});
  const [total, setTotal] = useState(0);

  const getDeliveryNotes = async () => {
    let res = await ClientDeliverNoteService.get(id);
    setDeliveryNote(res);
    
    let content = document.getElementById("content").innerHTML;
    document.body.innerHTML = content;
    setTimeout(() => {
      window.print();
    }, 500);
  };

  useEffect(() => {
    if (id) getDeliveryNotes();
  }, [id]);
  return (
    <div className="post" id="content">
      <div className="container-xxl">
        <div className="card">
          <div className="card-body py-20">
            <div className="mw-lg-950px mx-auto w-100">
              <div className="mb-4">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div className="">
                          <Link to="#">
                            <img
                              alt="Logo"
                              src="/assets/media/logos/naf3.jpeg"
                              style={{ width: "5rem" }}
                            />
                          </Link>
                        </div>
                      </td>
                      <td>
                    <div
                        className="text-sm-center fw-bold fs-4 text-muted "
                        style={{ textAlign: "center", marginLeft: "6rem" }}
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
                    </td>
                    <td>
                      <div className="text-sm-end fw-bold fs-4 text-muted "
                      style={{ textAlign: "center", marginLeft: "3rem" }}>
                        <div></div>
                        <Link to="#">
                          <img
                            alt="Logo"
                            src={deliveryNote?.company?.logo_url}
                            style={{ width: "5rem", marginLeft: "2rem" }}
                          />
                        </Link>
                      </div>
                    </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-10">
                <table width="100%">
                  <tbody>
                    <tr>
                      <td className="text-left"></td>
                      <td className="text-center">
                        <h3>DELIVERY NOTE</h3>
                        <p className="text-muted">#{deliveryNote?.dn_number}</p>
                      </td>
                      <td className="text-end"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="">
                <table width="100%">
                  <tbody>
                    <tr>
                      <td>
                        <h6>
                          <strong>Company Name:</strong>
                          <span className="text-muted">
                            {deliveryNote?.company?.name}
                          </span>
                        </h6>

                        <h6>
                          <strong>Group of Company: </strong>
                          <span className="text-muted">
                            {deliveryNote?.company?.company_group}
                          </span>
                        </h6>
                      </td>
                      <td style={{ marginLeft: "120px" }} width="30%"></td>

                      <td style={{ marginLeft: "120px" }}>
                        <h6>
                          <strong>Delivery Date: </strong>
                          <span className="text-muted">
                            <Moment format="D MMMM YYYY">
                              {deliveryNote?.deliver_date}
                            </Moment>
                          </span>
                        </h6>

                        <h6>
                          <strong>Invoice No: </strong>
                          <span className="text-muted">
                            #{deliveryNote?.invoice?.invoice_number}
                          </span>
                        </h6>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* 
            <div className="mt-5">
              <h6>
                <strong>Machine Model: </strong>
                <span className="text-muted">git
                  {invoice?.requisition?.machines?.map((item, index) => (
                    <span key={index}>{item?.machine_model?.name} </span>
                  ))}
                </span>
              </h6>
            </div> */}

                <div className="d-flex justify-content-between flex-column flex-md-row">
                  <div className="flex-grow-1 pt-8">
                    <div className="table-responsive ">
                      <div className="border-bottom pb-12">
                        <table className="table">
                          <thead>
                            <tr className="fs-6 fw-bolder text-dark text-uppercase">
                              <th className="min-w-15px pb-9">SL.No</th>
                              <th className="min-w-70px pb-9 text-end">
                                Parts Name
                              </th>
                              <th className="min-w-80px pb-9 text-end">
                                Parts Number
                              </th>
                              <th className="min-w-100px pe-lg-6 pb-9 text-end">
                                Quantity
                              </th>
                              <th className="min-w-100px pe-lg-6 pb-9 text-end">
                                Remarks
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {deliveryNote?.part_items?.map((item, index) => (
                              <tr
                                className="fw-bolder text-gray-700 fs-5 text-end"
                                key={index}
                              >
                                <td className="d-flex align-items-center pb-10">
                                  {index + 1}
                                </td>
                                <td>{item?.part?.aliases[0].name}</td>
                                <td>{item?.part?.aliases[0].part_number}</td>
                              
                                <td className="fs-5 text-dark fw-boldest pe-lg-6">
                                  {item?.quantity}
                                </td>
                                <td className="fs-5 pe-lg-6">
                                  {item?.remarks}
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
  );
};

export default PrintDeliveryNotes;
