import React, { useState, useEffect } from "react";
import Modal from "../../components/utils/Modal";
import MachineService from "../../services/MachineService";

const EditMachine = ({ open, onCloseModal, getMachines, machineId }) => {
  const [data, setData] = useState({
    name: "",
    designation: "",
  });
  const [block, setBlock] = useState(false);

  const getMachine = async () => {
    setData(await MachineService.get(machineId));
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

  const updateMachine = async () => {
    setBlock(true)
    await MachineService.update(machineId, data);
    getMachines();
    onCloseModal();
  };

  useEffect(() => {
    if (open) getMachine();
    setBlock(false)
  }, [open, machineId]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit Machine</>}
        id={machineId}
        body={
          <>
            <form>
              <div className="form-group">
                <label className="required form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Machine Name"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={data.name}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="name"
                ></div>
              </div>

              <div className="form-group mt-5">
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  placeholder="Enter Machine Description"
                  name="description"
                  id="description"
                  value={data.description ?? ''}
                  onChange={handleChange}
                />
              </div>

              <button
                disabled={block}
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={() => {
                  updateMachine();
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
            </form>
          </>
        }
      />
    </div>
  );
};

export default EditMachine;
