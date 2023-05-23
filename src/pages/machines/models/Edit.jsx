import React, { useState, useEffect } from "react";
import Modal from "components/utils/Modal";
import MachineModelService from "services/MachineModelService";

const EditMachineModel = ({ open, onCloseModal, onUpdated, machineId, modelId }) => {
  const [data, setData] = useState({ name: "", description: "" });
  const [block, setBlock] = useState(false);

  const getMachineModel = async () => {
    setData(await MachineModelService.get(machineId, modelId));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBlock(false)

    setData({
      ...data, [name]: value
    })
  }

  const updateMachine = async (e) => {
    setBlock(true)
    await MachineModelService.update(machineId, modelId, data);
    onUpdated();
    onCloseModal();
  };


  useEffect(() => {
    if (open)
      getMachineModel();
    setBlock(false)

  }, [open, modelId]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit machine</>}
        id={modelId}
        body={
          <>
            <div className="form-group mt-5">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                id="name"
                onChange={handleChange}
                value={data.name ?? ''}
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
                value={data.space ?? ''}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="space"></div>
            </div>

            <div className="form-group mt-5">
              <label className="form-label">Description</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Enter Description"
                name="description"
                id="description"
                onChange={handleChange}
                value={data.description ?? ''}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="description"></div>
            </div>

            <button
              disabled={block}
              className="btn btn-primary mr-2 mt-5"
              style={{ marginRight: "1rem" }}
              onClick={(e) => {
                updateMachine(e);
              }}
            >
              Update
            </button>
            <button
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

export default EditMachineModel;
