import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/utils/Modal";
import QuotationService from "../../services/QuotationService";
import InvoiceService from "../../services/InvoiceService";
import Select from "react-select";

const CreateInvoice = ({ open, onCloseModal, getInvoices }) => {
  const [block, setBlock] = useState(false);
  const [quotations, setQuotations] = useState([]);
  const [quotation, setQuotation] = useState({}); //get quotation details
  const [quotationId, setQuotationId] = useState("");

  const navigate = useNavigate();

  const getQuotation = async () => {
    if (quotationId) {
      let res = await QuotationService.get(quotationId);
      setQuotation(res);
    }
  };

  const getQuotations = async () => {
    let data = await QuotationService.getAll();
    data = data?.data?.map((itm) => ({
      label: itm?.pq_number,
      value: itm?.id,
    })); //Parse the data as per the select requires
    setQuotations(data);
  };
  const handleSelect = (option, conf) => {
    const value = option.value;
    setQuotationId(value);
  };

  const createInvoice = async (e) => {
    e.preventDefault();
    if (quotationId) {
      setBlock(true);
      let res = await InvoiceService.create(quotation);
      // console.log(res.data);
      setBlock(false);
      navigate("/panel/invoices");
    }
    getInvoices();
    onCloseModal();
  };

  useEffect(() => {
    if (open) {
      getQuotations();
    }
  }, [open]);

  useEffect(() => {
    getQuotation();
  }, [quotationId]);
  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Invoice</>}
        body={
          <>
            <form id="create-employee">
              <div className="form-group mt-5">
                <label className="required form-label">Quotation</label>
                <Select
                  options={quotations}
                  onChange={handleSelect}
                  name="quotation_id"
                  maxMenuHeight={250}

                />

                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="requisition"
                ></div>
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="requisition"
                ></div>
              </div>

              <button
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={createInvoice}
              >
                Create
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

export default CreateInvoice;
