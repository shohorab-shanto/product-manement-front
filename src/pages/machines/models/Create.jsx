import React, { useEffect, useState } from "react";
import MachineModelService from "services/MachineModelService";
import Modal from "components/utils/Modal";

const CreateMachineModelModel = ({ open, onCloseModal, machineId, onCreated }) => {
  const [data, setData] = useState({
    name: "",
    mfg_number: "",
    space: "",
    description: "",
  });
  const [block, setBlock] = useState(false);

  const createMachineModel = async (e) => {
    setBlock(true)
    await MachineModelService.create(machineId, data);
    onCreated();
    onCloseModal();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBlock(false)

    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (machineId)
      setBlock(false)
  }, [machineId]);


  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Add Machine Model</>}
        body={
          <>
            <div className="form-group">
              <label className="required form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                id="name"
                onChange={handleChange}
                value={data.name}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="name"></div>
            </div>

            <div className="form-group mt-5">
              <label className="form-label">Space</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Space"
                name="space"
                id="space"
                onChange={handleChange}
                value={data.space}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="space"></div>
            </div>

            <div className="form-group mt-5">
              <label className="form-label">Description</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Enter  Description"
                name="description"
                id="description"
                onChange={handleChange}
                value={data.description}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="description"></div>
            </div>

            <button
              disabled={block}
              type="reset"
              className="btn btn-primary mr-2 mt-5"
              style={{ marginRight: "1rem" }}
              onClick={createMachineModel}
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
          </>
        }
      />
    </div>
  );
};

export default CreateMachineModelModel;
