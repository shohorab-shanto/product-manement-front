import React, { useEffect, useState } from "react";
import Modal from "components/utils/Modal";
import CompanyService from "services/CompanyService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UpdateDueAmount = ({ open, companyId, onCloseModal, onUpdated }) => {
  const [company, setCompany] = useState({});

  const [data, setData] = useState({
    due_amount: "",
    trade_limit: "",
    remarks: "",
  });

  const [type, setType] = useState("Addition");
  const [amount, setAmount] = useState();
  const getCompany = async () => {
    const res = await CompanyService.get(companyId);
    setCompany(res);
    setData({
      ...data,
      trade_limit: res.trade_limit,
      due_amount: res.due_amount,
    });
  };
  useEffect(() => {
    if (companyId) getCompany();
  }, [companyId, open]);

  const updateCompany = async () => {
    await CompanyService.updateDueLimit(companyId, data);
    setAmount("");
    onUpdated();
    onCloseModal();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleAmount = () => {
    var x;
    if (amount?.length) {
      if (type == "Addition") {
        x = parseInt(company.due_amount) + parseInt(amount);
      } else {
        x = parseInt(company.due_amount) - parseInt(amount);
      }
    } else {
      x = parseInt(company.due_amount);
    }
    setData({
      ...data,
      due_amount: x,
    });
  };

  useEffect(() => {
    handleAmount();
  }, [amount, type]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit Company</>}
        body={
          <>
            <form id="update-company">
              <div className="mb-5 fv-row fv-plugins-icon-container">
                <label className="form-label">Trade limit</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Trade Limit"
                  name="trade_limit"
                  value={data.trade_limit ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="description"
                ></div>
              </div>

              <div className="row">
                <div className="col-8">
                  <div className="form-group">
                    <label className="form-label">Due Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      placeholder="Amount"
                      name="amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="description"
                    ></div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label className="form-label">Type:</label>
                    <select
                      className="form-control"
                      id="type"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option disabled>Select</option>
                      <option>Addition</option>
                      <option>Deduction</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-5 fv-row fv-plugins-icon-container">
                <label className="form-label">Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  name="remarks"
                  id="description"
                  value={data.remarks ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="description"
                ></div>
              </div>

              <button
                type="reset"
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={updateCompany}
              >
                Update
              </button>
              <button
                type="reset"
                className="btn btn-secondary  mt-5 "
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </form>
          </>
        }
      />
    </div>
  );
};

export default UpdateDueAmount;
