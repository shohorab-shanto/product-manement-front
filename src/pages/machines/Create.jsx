import React, { useState } from "react";
import MachineService from "../../services/MachineService";
import Modal from "../../components/utils/Modal";

const CreateMachine = ({ open, onCloseModal, getMachines }) => {
  const [data, setData] = useState({
    name: "",
    designation: ""
  });
  const [block, setBlock] = useState(false);

  const createMachine = async (data) => {
    setBlock(true)
    await MachineService.create(data);
    getMachines();
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

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Add Machine</>}
        body={
          <>
            <form>
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
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={() => {
                  createMachine(data);
                }}
              >
                Create
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

export default CreateMachine;
