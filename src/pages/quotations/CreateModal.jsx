import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/utils/Modal";
import RequisitionService from "../../services/RequisitionService";
import Select from "react-select";

const CreateModal = ({ open, onCloseModal, getQuotations }) => {
  const [requisitions, setRequisitions] = useState([]);
  const [requisitionId,setRequisitionId] = useState('');
  const navigate = useNavigate();

  const getRequisitions = async () => {
    let data = await RequisitionService.getAll();
    data = data?.data?.map((itm) => ({ label: itm?.rq_number, value: itm?.id })); //Parse the data as per the select requires
    setRequisitions(data);
  };


  const handleSelect = (option, conf) => {
    const value = option.value;
    setRequisitionId(value);
  };

  const createQuotation = async (e) => {
    e.preventDefault()
    if (requisitionId) {
        navigate(`/panel/quotations/${requisitionId}/create`);
    }
    onCloseModal();
  };


  useEffect(() => {
    if (open) {
        getRequisitions();
    }
  }, [open]);
  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Quotation</>}
        body={
          <>
            <form id="create-employee">
              <div className="form-group mt-5">
                <label className="required form-label">Requisition</label>
                <Select
                    options={requisitions}
                    onChange={handleSelect}
                  name="requisition_id"
                  maxMenuHeight={250}
                  //   defaultValue={defaultRole ?? ""}
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
                  onClick={createQuotation}
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

export default CreateModal;
