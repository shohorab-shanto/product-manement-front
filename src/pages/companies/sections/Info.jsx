import PermissionAbility from "helpers/PermissionAbility";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useNavigate, useParams } from "react-router-dom";
import CompanyService from "services/CompanyService";
import UpdateDueAmount from "./UpdateDueAmount";

const CompanyInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyId, setcompanyId] = useState(null);
  const [updateDueAMountModal, setUpdateDueAMountModal] = useState(false);
  const [company, setCompanies] = useState([]);

  const onCloseModal = () => {
    setUpdateDueAMountModal(false);
  };

  const getCompanies = async () => {
    setCompanies(await CompanyService.get(id));
  };

  useEffect(() => {
    if (!updateDueAMountModal) getCompanies();
  }, [updateDueAMountModal]);

  // const [form, setForm] = useState({
  //   trade_limit: null,
  //   due_amount: 0,
  // });

  // const handleSettingState = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleUpdate = async (e) => {
  //   await CompanyService.updateDueLimit(id, form);
  // };

  return (
    <>
      <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px">
        <div className="card card-custom">
          <div className="card-header h-auto py-4 mb-2">
            <div className="card-title">
              <h3 className="card-label">
                <button
                  className="btn btn-sm btn-dark "
                  style={{ marginRight: "0.75rem" }}
                  onClick={() => navigate(-1)}
                >
                  <i className="fa fa-arrow-left"></i>Back
                </button>
                Company Details
              </h3>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="text-center">
              <div
                className="image-input image-input-empty image-input-outline mb-3"
                data-kt-image-input="true"
              >
                <div
                  className="image-input-wrapper w-150px h-150px"
                  style={{
                    backgroundImage: "url(" + company.logo + ")",
                  }}
                ></div>
              </div>
              <div className="fs-7">
                <h2>{company.name}</h2>
                <p>{company.company_group ?? "--"}</p>
              </div>
            </div>

            <div className="collapse show text-left">
              <div className="py-5 fs-6">
                <div className="fw-bolder mt-5">Factory Types</div>
                <div className="text-gray-600">{company.machine_types}</div>

                <div className="fw-bolder mt-5">Updated At</div>
                <div className="text-gray-600">
                  <Moment format="DD MMMM YYYY">{company.updated_at}</Moment>
                </div>

                <div className="fw-bolder mt-5">Description</div>
                <div className="text-gray-600">{company.description?? "--"}</div>
                <div className="fw-bolder mt-5">Due Amount</div>
                <div
                  className={
                    parseInt(company.due_amount) < 0
                      ? "text-danger"
                      : "text-gray"
                  }
                >
                  {Math.floor(company.due_amount)}
                </div>
                <div className="fw-bolder mt-5">Trade Limit</div>
                <div
                  className={
                    parseInt(company.trade_limit) < 0
                      ? "text-danger"
                      : "text-gray"
                  }
                >
                  {company.trade_limit}
                </div>

                  <div className="card-title mt-10">
                    <h3 className="card-label">
                      <PermissionAbility permission="companies_edit">
                        <button
                          className="btn btn-sm btn-dark"
                          onClick={() => {
                            setcompanyId(id);
                            setUpdateDueAMountModal(true);
                          }}
                        >
                          <i className="fa fa-pen"></i> Edit
                        </button>
                      </PermissionAbility>
                    </h3>
                  </div>

                {/* <div className="fw-bolder mt-5">Trade Limit</div>
              <input
                className="col-form-label col-sm-7 rounded"
                type="text"
                value={form.trade_limit ?? company.trade_limit}
                onChange={handleSettingState}
                name="trade_limit"
              />
              <input
                className="btn btn-primary mx-2"
                type="button"
                value="Update"
                onClick={handleUpdate}
              />
              <div className="fw-bolder mt-5">Pay Amount</div>
              <input
                className="col-form-label col-sm-7 rounded"
                type="number"
                value={form.due_amount}
                onChange={handleSettingState} 
                name="due_amount"
              />

              <input
                className="btn btn-primary mx-2"
                type="button"
                value="Submit"
                onClick={handleUpdate}
              /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateDueAmount
        open={updateDueAMountModal}
        companyId={companyId}
        onCloseModal={onCloseModal}
        onUpdated={getCompanies}
      />
    </>
  );
};

export default CompanyInfo;
