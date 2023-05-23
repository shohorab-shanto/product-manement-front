import { Activities } from "components/utils/Activities";
import Confirmation from "components/utils/Confirmation";
import PermissionAbility from "helpers/PermissionAbility";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import RequisitionService from "../../services/RequisitionService";
import NewDropzone from "./Dropzone/MyDropzone";

const ShowRequisition = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [uuid, setuuid] = useState();
  const [model_id, setModelId] = useState();

  const [stock, setStock] = useState(true);

  let { id } = useParams();
  const navigate = useNavigate();
  const [requisition, setRequisition] = useState({});
  const [file, setFile] = useState({});
  const [tab, setTab] = useState("requisitions");

  const getRequisition = async () => {
    let res = await RequisitionService.get(id);
    setRequisition(res);
  };

  useEffect(() => {
    requisition?.part_items?.map((item, index) => {
      item?.part?.stocks[0]?.unit_value
        ? item?.part?.stocks[0]?.unit_value < item?.quantity ?? setStock(false)
        : setStock(false);
    });
  }, [requisition]);

  const approveRequisition = async () => {
    await RequisitionService.approve(id);
    getRequisition();
  };

  const rejectRequisition = async () => {
    await RequisitionService.reject(id);
    getRequisition();
  };

  const uploadFile = async (formData) => {
    console.log("a", formData);

    await RequisitionService.fileUpload(id, formData);
    getFile();
  };

  const deleteItem = async () => {
    await RequisitionService.deleteFile(uuid, model_id);
    getFile();
  };

  const getFile = async () => {
    const res = await RequisitionService.getFile(id);
    setFile(res);
  };

  useEffect(() => {
    if (id) getRequisition();
    getFile();
  }, [id]);

  //get quotation
  // const getQuotation = async () => {
  //   let res = await QuotationService.get(invoiceId);
  //   setInvoice(res);
  // };

  return (
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
                <div className="fw-bolder mt-5">Company</div>
                <div className="text-gray-600">
                  {requisition?.company?.name}
                </div>

                <div className="fw-bolder mt-5">RQ Number</div>

                <div className="text-gray-600">{requisition?.rq_number}</div>

                <div className="fw-bolder mt-5">Machines</div>
                <div className="text-gray-600">
                  {requisition?.machines?.map((item, index) => (
                    <span key={index} className="badge badge-light-info ">
                      {item?.model?.name}{" "}
                    </span>
                  ))}
                </div>

                <div className="fw-bolder mt-5">Engineer</div>
                <div className="text-gray-600">
                  {requisition?.engineer?.name ?? "--"}
                </div>

                <div className="fw-bolder mt-5">Expected Delivery</div>
                <div className="text-gray-600">
                  <Moment format="D MMMM YYYY">
                    {requisition?.expected_delivery}
                  </Moment>
                </div>

                <div className="fw-bolder mt-5">Priority</div>
                <div className="text-gray-600">
                  {requisition?.priority?.capitalize()}
                </div>

                <div className="fw-bolder mt-5">Type</div>
                <div className="text-gray-600">
                  {requisition?.type?.replaceAll("_", " ")?.capitalize()}
                </div>

                <div className="fw-bolder mt-5">Updated At</div>
                <div className="text-gray-600">
                  <Moment format="D MMMM YYYY">
                    {requisition?.updated_at}
                  </Moment>
                </div>

                <div className="fw-bolder mt-5">Ref Number</div>
                <div className="text-gray-600">
                  {requisition?.ref_number ?? "--"}
                </div>

                <div className="fw-bolder mt-5">Reason Of Trouble</div>
                <div className="text-gray-600">
                  {requisition?.reason_of_trouble ?? "--"}
                </div>

                <div className="fw-bolder mt-5">Solutions</div>
                <div className="text-gray-600">
                  {requisition?.solutions ?? "--"}
                </div>

                <div className="fw-bolder mt-5">Remarks</div>
                <div className="text-gray-600">
                  {requisition?.remarks ?? "--"}
                </div>
              </div>
              <div className="card-header">
                <div className="card-title">
                  <h3 className="card-label">
                    <PermissionAbility permission="requisitions_print">
                      <Link
                        className="btn btn-sm btn-dark "
                        to={"/panel/requisitions/" + requisition.id + "/print"}
                        style={{ marginRight: "0.75rem" }}
                        // target="_blank"
                      >
                        Print
                      </Link>
                    </PermissionAbility>
                  </h3>
                  {stock ? (
                    <>
                      {requisition.status == "approved" ? (
                        <h3 className="card-label">
                          <PermissionAbility permission="requisitions_generate_quotation">
                            <button
                              className="btn btn-sm btn-dark "
                              style={{ marginRight: "0.1rem" }}
                              onClick={() =>
                                navigate(
                                  `/panel/quotations/${requisition?.id}/create`
                                )
                              }
                            >
                              Generate Quotation
                            </button>
                          </PermissionAbility>
                        </h3>
                      ) : (
                        <>
                          <PermissionAbility permission="requisitions_approve">
                            {requisition.status == "rejected" ? (
                              <h3 className="card-label">
                                <div className="btn btn-sm bg-danger disabled text-white">
                                  Rejected Requisition
                                </div>
                              </h3>
                            ) : (
                              <>
                                <h3 className="card-label">
                                  <button
                                    onClick={approveRequisition}
                                    className="btn btn-sm btn-primary"
                                  >
                                    Approve
                                  </button>
                                </h3>
                                <h3 className="card-label">
                                  <button
                                    onClick={rejectRequisition}
                                    className="btn btn-sm btn-danger"
                                  >
                                    Reject
                                  </button>
                                </h3>
                              </>
                            )}
                          </PermissionAbility>
                        </>
                      )}
                    </>
                  ) : (
                    <span
                      className="badge badge-danger"
                      style={{ fontSize: "16px" }}
                    >
                      Some Part is Missing fro creating requisition. Please add stock of that part
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9">
            <div className="flex-lg-row-fluid ms-lg-15">
              <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
                <li className="nav-item">
                  <a
                    className={`nav-link text-active-primary pb-4 ${
                      tab == "requisitions" ? "active" : ""
                    }`}
                    data-bs-toggle="tab"
                    href="#requisitions"
                    onClick={() => setTab("requisitions")}
                  >
                    Part Items
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className={`nav-link text-active-primary pb-4 ${
                      tab == "Files" ? "active" : ""
                    }`}
                    data-bs-toggle="tab"
                    href="#files"
                    onClick={() => setTab("files")}
                  >
                    Files
                  </a>
                </li>

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
                <div
                  className={`tab-pane fade ${
                    tab == "requisitions" ? "active show" : ""
                  }`}
                  id="requisitions"
                  role="tabpanel"
                >
                  <div className="card card-custom gutter-b">
                    <div className="card-body px-0">
                      <div className="card mb-5 mb-xl-8">
                        <div className="card-body py-3">
                          <div className="table-responsive">
                            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                              <thead>
                                <tr className="fw-bolder text-muted">
                                  <th className="min-w-50px">Part Name</th>
                                  <th className="min-w-120px">Part Number</th>
                                  <th className="min-w-120px">Quantity</th>
                                  <th className="min-w-120px">Stock</th>
                                  <th className="min-w-120px">Remarks</th>
                                </tr>
                              </thead>

                              <tbody>
                                {requisition?.part_items?.map((item, index) => (
                                  <tr key={index}>
                                    <td className="">
                                      <Link
                                        to={"/panel/parts/" + item?.part?.id}
                                        className="text-dark fw-bolder text-hover-primary"
                                      >
                                        {item?.part?.aliases[0].name}
                                      </Link>
                                    </td>
                                    <td className=" fw-bolder mb-1 fs-6">
                                      <span>
                                        {item?.part?.aliases[0].part_number}
                                      </span>
                                    </td>
                                    <td className=" fw-bolder mb-1 fs-6">
                                      <span>{item?.quantity}</span>
                                    </td>
                                    <td className=" fw-bolder mb-1 fs-6">
                                      {item?.part?.stocks[0]?.unit_value
                                        ? item?.part?.stocks[0]?.unit_value <
                                          item?.quantity
                                          ? () => {
                                              setStock(false);
                                              return "Not Available";
                                            }
                                          : "Available"
                                        : "Not Availabe"}
                                    </td>
                                    <td className=" fw-bolder mb-1 fs-6">
                                      <span>{item?.remarks}</span>
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

                <div
                  className={`tab-pane fade ${
                    tab == "files" ? "active show" : ""
                  }`}
                  id="files"
                  role="tabpanel"
                >
                  <div className="card card-custom gutter-b">
                    <div className="card-body px-0">
                      <div className="card mb-5 mb-xl-8">
                        <div className="card-body py-3">
                          <form
                            id="attachment-form"
                            encType="multipart/form-data"
                          >
                            <NewDropzone onDrop={uploadFile} />
                          </form>
                          <div className="table-responsive">
                            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                              <thead>
                                <tr className="fw-bolder text-muted">
                                  <th className="min-w-50px">SL</th>
                                  <th className="min-w-120px">File Name</th>
                                  <th className="min-w-120px">Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {file?.data?.map((item, index) => (
                                  <tr key={index}>
                                    <td className="">{index + 1}</td>
                                    <td className=" fw-bolder mb-1 fs-6">
                                      <span>{item?.file_name}</span>
                                    </td>
                                    <td className=" fw-bolder mb-1 fs-6">
                                      <button
                                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                        onClick={() => {
                                          setConfirmDelete(true);
                                          setuuid(item.uuid);
                                          setModelId(item.model_id);
                                        }}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                      <a
                                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                        href={item?.original_url}
                                        target="_blank"
                                      >
                                        <i className="fa fa-download"></i>
                                      </a>
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

                <Activities logName="requisitions" modelId={id} tab={tab} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deleteItem();
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
};

export default ShowRequisition;
