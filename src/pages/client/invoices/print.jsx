import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Moment from "react-moment";
import ClientInvoiceService from "services/clientServices/ClientInvoiceService";
const PrintInvoice = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({});
  const [total, setTotal] = useState(0);

  const getInvoice = async () => {
    let res = await ClientInvoiceService.get(id);
    setInvoice(res);
    setTotal(
      res?.part_items?.reduce(
        (sum, partItem) => sum + parseFloat(partItem.total_value),
        0
      )
    );
    let content = document.getElementById("content").innerHTML;
    document.body.innerHTML = content;
    setTimeout(() => {
      window.print();
    }, 500);
  };

  useEffect(() => {
    if (id) getInvoice();
  }, [id]);
  return (
    <div className="post" id="content">
      <div className="container-xxl">
        <div className="card">
          <div className="card-body py-20">
            <div className="mw-lg-950px mx-auto w-100">
              <div className="mb-4">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="border border-1 border-dark text-center p-5">
                          <Link to="#">
                            <img
                              alt="Logo"
                              src="/assets/media/logos/naf3.jpeg"
                              style={{ width: "6rem" }}
                            />
                          </Link>
                          <h3 className="mt-2">Naf Limited</h3>
                          <p>
                            Naya paltan,
                            <br /> Dhaka-1230 <br />
                            Bangladesh
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="px-10">
                          <div style={{ fontSize: 36 }}>INVOICE</div>
                          <div className="d-flex justify-content-between">
                            <div className="px-5">
                              <div className="py-2">
                                <h5>Date:</h5>
                                <p>
                                  <Moment format="D MMMM YYYY">
                                    {invoice?.invoice_date}
                                  </Moment>
                                </p>
                              </div>
                              <div>
                                <h5>Invoice to:</h5>
                                <h2>{invoice?.company?.name}</h2>
                              </div>
                            </div>
                            <div className="px-5">
                              <div>
                                <h5>Invoice No:</h5>
                                <p>{invoice?.invoice_number}</p>
                              </div>
                              <div>
                                <p>
                                  {invoice?.company?.address}
                                  <br /> Mobile : {invoice?.company?.tel} <br />
                                  Website : {invoice?.company?.web}
                                  <br />
                                  {invoice?.company?.address}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between flex-column flex-md-row">
                <div className="flex-grow-1 pt-8">
                  <div className="table-responsive ">
                    <table className="table">
                      <thead className="m-20">
                        <tr className="fs-6 fw-bolder text-dark text-uppercase">
                          <th className="text-center">
                            <div
                              className="p-1"
                              style={{
                                backgroundColor: "#FD7E14",
                                color: "#fff",
                              }}
                            >
                              SL.No
                            </div>
                          </th>
                          <th className="text-start w-50 ">
                            <div
                              className="p-1"
                              style={{
                                backgroundColor: "#009EF7",
                                color: "#fff",
                              }}
                            >
                              Part Name
                            </div>
                          </th>
                          <th className="text-center">
                            <div
                              className="p-1"
                              style={{
                                backgroundColor: "#FD7E14",
                                color: "#fff",
                              }}
                            >
                              Qty
                            </div>
                          </th>
                          <th className="text-center">
                            <div
                              className="p-1"
                              style={{
                                backgroundColor: "#FD7E14",
                                color: "#fff",
                              }}
                            >
                              Price
                            </div>
                          </th>
                          <th className="text-center">
                            <div
                              className="p-1"
                              style={{
                                backgroundColor: "#009EF7",
                                color: "#fff",
                              }}
                            >
                              Total
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {invoice?.part_items?.map((item, idx) => {
                          return (
                            <tr
                              className="text-dark border-bottom border-1 border-dark"
                              key={idx}
                            >
                              <td className=" text-center">{idx + 1}</td>
                              <td className="text-start">
                                <h6>{item?.part?.aliases[0].name}</h6>
                                <div>{item?.part?.aliases[0].part_number}</div>
                              </td>
                              <td className="text-center">{item?.quantity}</td>
                              <td className=" text-center">
                                {item?.unit_value}
                              </td>
                              <td className="text-center">
                                {item?.total_value}
                              </td>
                            </tr>
                          );
                        })}

                        <tr>
                          <td className=" text-center"></td>
                          <td className="text-start"></td>
                          <td className="text-center"></td>
                          <td className="text-center">
                            <h4>Sub-Total</h4>
                          </td>
                          <td className="text-center border-bottom border-1 border-dark">
                            <h4>{total} TK.</h4>
                          </td>
                        </tr>
                        <tr>
                          <td className=" text-center"></td>
                          <td className="text-start"></td>
                          <td className="text-center"></td>
                          <td className=" text-center">
                            <h4>Discount</h4>
                          </td>
                          <td className="text-center ">
                            <h4>{invoice.discount ?? "0"} TK.</h4>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td className="text-center" colSpan={2}>
                            <div
                              className="p-1"
                              style={{
                                backgroundColor: "#FD7E14",
                                color: "#fff",
                                fontSize: 16,
                              }}
                            >
                              Total
                            </div>
                          </td>
                          <td className="text-center">
                            <div
                              className="p-1"
                              style={{
                                backgroundColor: "#FD7E14",
                                color: "#fff",
                                fontSize: 16,
                              }}
                            >
                              {invoice.discount
                                ? total - invoice.discount
                                : total}{" "}
                              TK.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="fixed-bottom mb-10 text-center border-top border-1 border-dark">
                <div className="d-flex flex-row justify-content-evenly">
                  <div className="d-flex flex-row">
                    <div className="m-2 p-2 border border-1 rounded-circle border-dark">
                      <span>
                        <img
                          src="https://img.icons8.com/ios/344/city-buildings.png"
                          style={{ height: 35, weight: 35 }}
                        />
                      </span>
                    </div>
                    <div className="pt-2 text-start">
                      <h4>Central Office</h4>
                      <p>67 Nayapaltan, Dhaka-1000</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="m-2 p-2 border border-1 rounded-circle border-dark">
                      <span>
                        <img
                          src="https://img.icons8.com/ios/344/phone-disconnected.png"
                          style={{ height: 35, weight: 35 }}
                        />
                      </span>
                    </div>
                    <div className="pt-2 text-start">
                      <h4>Call Center</h4>
                      <p>+8802-9349934</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="m-2 p-2 border border-1 rounded-circle border-dark">
                      <span>
                        <img
                          src="https://img.icons8.com//344/question-mark--v1.png"
                          style={{ height: 35, weight: 35 }}
                        />
                      </span>
                    </div>
                    <div className="pt-2 text-start">
                      <h4>Help Support</h4>
                      <p>info@nafgroup.org</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="post" id="content">
    //   <div className="container-xxl">
    //     <div className="card">
    //       <div className="card-body py-20">
    //         <div className="mw-lg-950px mx-auto w-100">
    //           <div className="mb-4">
    //             <table>
    //               <tbody>
    //               <tr>
    //                 <td>
    //                   <div className="">
    //                     <Link to="#">
    //                       <img
    //                         alt="Logo"
    //                         src="/assets/media/logos/naf3.jpeg"
    //                         style={{ width: "5rem" }}
    //                       />
    //                     </Link>
    //                   </div>
    //                 </td>
    //                 <td>
    //                 <div
    //                     className="text-sm-center fw-bold fs-4 text-muted "
    //                     style={{ textAlign: "center", marginLeft: "6rem" }}
    //                   >
    //                     <h1>Naf Overseas(PVT.) Ltd.</h1>
    //                     <p className="text-sm">
    //                       <small>
    //                         Head Office:Naya paltan,Dhaka,Bangladesh
    //                       </small>
    //                       <br />
    //                       <small>
    //                         Tel:44564,Fax:sddsf,Email:asd@gmail.com,Web:example.com
    //                       </small>
    //                     </p>
    //                   </div>
    //                 </td>
    //                 <td>
    //                   <div className="text-sm-end fw-bold fs-4 text-muted "
    //                   style={{ textAlign: "center", marginLeft: "3rem" }}>
    //                     <div></div>
    //                     <Link to="#">
    //                       <img
    //                         alt="Logo"
    //                         src={invoice?.company?.logo_url}
    //                         style={{ width: "5rem", marginLeft: "2rem" }}
    //                       />
    //                     </Link>
    //                   </div>
    //                 </td>
    //               </tr>
    //               </tbody>
    //             </table>
    //           </div>

    //           <div className="mb-10">
    //             <table width="100%">
    //               <tbody>
    //                 <tr>
    //                   <td className="text-left" ></td>
    //                   <td className="text-center" ><h3>INVOICE</h3><p className="text-muted">#{invoice?.invoice_number}</p></td>
    //                   <td className="text-end" ></td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>

    //           <div className="">
    //             <table width="100%">
    //               <tbody>
    //               <tr>
    //                 <td>
    //                   <h6>
    //                     <strong>Company Name:</strong>
    //                     <span className="text-muted">
    //                       {invoice?.company?.name}
    //                     </span>
    //                   </h6>

    //                   <h6>
    //                     <strong>Group of Company: </strong>
    //                     <span className="text-muted">
    //                       {invoice?.company?.company_group}
    //                     </span>
    //                   </h6>
    //                 </td>
    //                 <td style={{ marginLeft: "120px" }} width="30%"></td>

    //                 <td style={{ marginLeft: "120px" }}>
    //                   <h6>
    //                     <strong>Invoice Date: </strong>
    //                     <span className="text-muted">
    //                       <Moment format="D MMMM YYYY">
    //                         {invoice?.invoice_date}
    //                       </Moment>
    //                     </span>
    //                   </h6>
    //                 </td>
    //               </tr>
    //               </tbody>
    //             </table>

    //             <div className="mt-5">
    //               <h6>
    //                 <strong>Machine Model: </strong>
    //                 <span className="text-muted">
    //                   {invoice?.requisition?.machines?.map((item, index) => (
    //                     <span key={index}>{item?.machine_model?.name} </span>
    //                   ))}
    //                 </span>
    //               </h6>
    //             </div>

    //             <div className="d-flex justify-content-between flex-column flex-md-row">
    //               <div className="flex-grow-1 pt-8">
    //                 <div className="table-responsive ">
    //                   <div className="border-bottom pb-12">
    //                     <table className="table">
    //                       <thead>
    //                         <tr className="fs-6 fw-bolder text-dark text-uppercase">
    //                           <th className="min-w-15px pb-9">SL.No</th>
    //                           <th className="min-w-70px pb-9 text-end">
    //                             Parts Name
    //                           </th>
    //                           <th className="min-w-80px pb-9 text-end">
    //                             Parts Number
    //                           </th>
    //                           <th className="min-w-100px pe-lg-6 pb-9 text-end">
    //                             Quantity
    //                           </th>
    //                           <th className="min-w-100px pe-lg-6 pb-9 text-end">
    //                             Unit Price
    //                           </th>
    //                           <th className="min-w-100px pe-lg-6 pb-9 text-end">
    //                             Total Price
    //                           </th>
    //                         </tr>
    //                       </thead>

    //                       <tbody>
    //                         {invoice?.part_items?.map((item, index) => (
    //                           <tr
    //                             className="fw-bolder text-gray-700 fs-5 text-end"
    //                             key={index}
    //                           >
    //                             <td className="d-flex align-items-center pb-10">
    //                               {index + 1}
    //                             </td>
    //                             <td>{item?.part?.aliases[0].name}</td>
    //                             <td>{item?.part?.aliases[0].part_number}</td>
    //                             <td className="fs-5 text-dark fw-boldest pe-lg-6">
    //                               {item?.quantity}
    //                             </td>
    //                             <td className="fs-5 text-dark fw-boldest pe-lg-6">
    //                               {item?.unit_value}
    //                             </td>
    //                             <td className="fs-5 text-dark fw-boldest pe-lg-6">
    //                               {item?.total_value}
    //                             </td>
    //                           </tr>
    //                         ))}
    //                       </tbody>
    //                     </table>
    //                   </div>
    //                   <div className="fs-5 text-dark fw-boldest pe-lg-6 text-end">

    //                     TOTAL:
    //                     <span className="text-muted">   {
    //                       invoice?.part_items?.reduce((sum,partItem) => sum + parseFloat(partItem.total_value),0)
    //                     } TK.</span>

    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PrintInvoice;
