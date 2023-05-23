import React, { useEffect, useState } from "react";
import Modal from "../../components/utils/Modal";
import ContractService from "../../services/ContractService";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MachineService from "services/MachineService";
import MachineModelService from "services/MachineModelService";

const EditContract = ({ open, onCloseModal, onUpdated, contractId }) => {
  const [machines, setMachines] = useState([]);
  const [machineModels, setMachineModels] = useState([]);
  const [defaultMachine, setDefaultMachine] = useState(null);
  const [defaultModel, setDefaultModel] = useState(null);
  const [data, setData] = useState({});
  const [block, setBlock] = useState(false);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleDateSelect = (value, name) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const updateContract = async () => {
    const Updatedata = {
      ...data,
      start_date: data?.start_date ? addDays(data?.start_date, 1) : null,
      end_date: data?.end_date ? addDays(data?.end_date, 1) : null,
    };
    await ContractService.update(contractId, Updatedata);
    onUpdated();
    onCloseModal();
  };

  const getMachineModels = async (machineId) => {
    setBlock(false);
    let dt = await MachineModelService.getAll(machineId);
    dt = dt.map((itm) => ({ label: itm.name, value: itm.id })); //Parse the data as per the select requires
    setMachineModels(dt);
    setData({
      ...data,
      ...{ machine_model_id: null },
    });
    setBlock(false);
  };

  const getContract = async () => {
    let dt = await ContractService.get(contractId);
    dt = {
      ...dt,
      ...{
        machine_model_id: dt?.machine_model?.map((d) => {
          return d.value;
        }),
        machine_id: dt?.machine?.id,
      },
    }; //Parse the date as per the date select requires
    setData(dt);

    setDefaultModel(
      dt.machine_model?.map((d) => {
        return { label: d.name, value: d.id };
      })
    );
    setDefaultMachine({ label: dt.machine?.name, value: dt.machine?.id });
  };


  useEffect(() => {
    if (data.machine_id && open) getMachineModels(data.machine_id);
  }, [contractId, data.machine_id]);

  useEffect(() => {
    setData({});
    if (contractId && open) {
      getContract();
    }
    setBlock(false);
  }, [open, contractId]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit Contract</>}
        body={
          <>
            {/* <div className="form-group">
              <label className="required form-label">Machine</label>
              {defaultMachine && <Select options={machines} onChange={handleSelect} name="machine_id" defaultValue={defaultMachine} />}
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="machine_id"></div>
            </div>

<<<<<<< HEAD
<<<<<<< HEAD
            <div className="form-group mt-5">
=======
            {/* <div className="form-group mt-5">
>>>>>>> main
=======
            {/* <div className="form-group mt-5">
>>>>>>> main
              <label className="required form-label">Machine Model</label>
              {defaultModel && <Select isMulti options={machineModels} onChange={handleSelect} name="machine_model_id" defaultValue={defaultModel} />}
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="machine_model_id"></div>
            </div> */}

            <div className="form-group">
              <label className="form-label">Start Date</label>
              <DatePicker
                defaultChecked={false}
                className="form-control"
                selected={
                  data?.start_date
                    ? new Date(Date.parse(data?.start_date))
                    : null
                }
                onChange={(date) => handleDateSelect(date, "start_date")}
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="start_date"
              ></div>
            </div>

            <div className="form-group mt-5">
              <label className="form-label">End Date</label>
              <DatePicker
                defaultChecked={false}
                className="form-control"
                selected={
                  data?.end_date ? new Date(Date.parse(data?.end_date)) : null
                }
                onChange={(date) => handleDateSelect(date, "end_date")}
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="end_date"
              ></div>
            </div>

            {/* <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <DatePicker defaultChecked={false} className="form-control" onChange={(date) => handleDateSelect(date, 'start_date')} />
                            <div className="fv-plugins-message-container invalid-feedback" htmlFor="start_date"></div>
                        </div>

                        <div className="form-group mt-5">
                            <label className="form-label">End Date</label>
                            <DatePicker defaultChecked={false} className="form-control" onChange={(date) => handleDateSelect(date, 'end_date')} />
                            <div className="fv-plugins-message-container invalid-feedback" htmlFor="end_date"></div>
                        </div> */}

            <div className="form-group mt-5">
              <label className="form-label">Notes</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Enter Notes"
                name="notes"
                id="notes"
                onChange={handleChange}
                defaultValue={data.notes}
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="notes"
              ></div>
            </div>

            {data?.start_date && (
              <div className="form-group mt-5 mb-2">
                <div className="form-check form-switch form-check-custom form-check-solid">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={data?.is_foc}
                    defaultValue={data?.is_foc}
                    name="is_foc"
                    id="is_foc"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="is_foc">
                    Under FOC
                  </label>
                </div>
              </div>
            )}

            {data.status !== undefined && (
              <div className="form-group mt-5 mb-2">
                <div className="form-check form-switch form-check-custom form-check-solid">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={data.status}
                    defaultValue={data.status}
                    name="status"
                    id="status"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="status">
                    Status {data.status ? "Active" : "Inactive"}
                  </label>
                </div>
              </div>
            )}

            <button
              disabled={block}
              className="btn btn-primary mr-2 mt-5"
              style={{ marginRight: "1rem" }}
              onClick={updateContract}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary  mt-5 "
              onClick={onCloseModal}
            >
              Cancel
            </button>
          </>
        }
      />
    </div>
  );
};

export default EditContract;
