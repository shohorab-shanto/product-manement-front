import React, { useEffect, useState } from "react";
import Modal from "components/utils/Modal";
import CompanyService from "services/CompanyService";
import MachineService from "services/MachineService";
import Select from "react-select";
import MachineModelService from "services/MachineModelService";

const AddMachine = ({ open, onCloseModal, onCreate, companyId }) => {
  const [machines, setMachines] = useState([]);
  const [models, setModels] = useState([])
  const [block, setBlock] = useState(false);
  // Set the selected image to preview
  const setImage = async (e) => {
    let logoShow = document.getElementById("logo");
    let fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", function () {
      logoShow.style.backgroundImage = "url(" + this.result + ")";
    });
  };

  const handleSelect = (option, conf) => {
    const value = option.value;
    const name = conf.name;
    setBlock(false)

    setData({
      ...data, [name]: value
    })
  }

  const getMachines = async () => {
    setBlock(false)
    let data = await MachineService.allMachines()
    data = data?.map(itm => ({ label: itm.name, value: itm.id })) //Parse the data as per the select requires
    setMachines(data);
    setBlock(false)
  };

  const getModels = async () => {
    setBlock(false)
    let dt = await MachineModelService.getAll(data.machine_id)
    dt = dt.map(itm => ({ label: itm.name, value: itm.id })) //Parse the data as per the select requires
    setModels(dt);
    setBlock(false)
  };

  //Store data
  const attachMachine = async (e) => {
    setBlock(true)
    await CompanyService.attachMachine(companyId, data);
    onCreate();
    onCloseModal();
    setBlock(false);
  };

  const [data, setData] = useState({
    machine_id: "",
    machine_model_id: "",
    mfg_number: "",
    qty:"",
    nodes: "",
  })

  const handleChange = (e) => {
    setBlock(false)
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data, [name]: value
    })
  }

  useEffect(() => {
    if (open)
      getModels();
  }, [data.machine_id]);


  useEffect(() => {
    if (open)
      getMachines()
  }, [open])


  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Add Machine</>}
        body={
          <>
            <div className="mb-10 fv-row fv-plugins-icon-container">
              <div className="form-group">
                <label className="required form-label required">Machine</label>
                <Select options={machines} onChange={handleSelect} name="machine_id" />
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="machine_id"></div>
              </div>

              <div className="form-group mt-5">
                <label className="required form-label">Machine Model</label>
                <Select options={models} onChange={handleSelect} name="machine_model_id" />
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="machine_model_id"></div>
              </div>

              <label className="form-label">MFG Number</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter MFG Number"
                name="mfg_number"
                id="mfg_number"
                value={data.mfg_number}
                onChange={handleChange}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="mfg_number"></div>
            </div>

            <div className="mb-5 fv-row fv-plugins-icon-container">
              <label className="form-label">Quantity</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Enter Quantity"
                name="qty"
                id="qty"
                onChange={handleChange}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="qty"></div>
            </div>

            <div className="mb-5 fv-row fv-plugins-icon-container">
              <label className="form-label">Notes</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Enter Notes"
                name="notes"
                id="notes"
                onChange={handleChange}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="description"></div>
            </div>

            <button
              type="reset"
              className="btn btn-primary mr-2 mt-5"
              style={{ marginRight: "1rem" }}
              onClick={attachMachine}
            >
              Submit
            </button>
            <button
              type="reset"
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

export default AddMachine;
