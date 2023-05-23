import React, { useState, useEffect } from "react";
import MachinePartHeadingService from "services/PartHeadingService";
import Modal from "components/utils/Modal";

const CreateHeadings = ({ open, onCloseModal, machineId, onCreated }) => {
  const [data, setData] = useState({
    name: "",
    common_heading: false,
    remarks: "",
    description: "",
  });
  const [block, setBlock] = useState(false);

  const createHeading = async (e) => {
    setBlock(true);
    await MachinePartHeadingService.create(machineId, data);
    onCreated();
    onCloseModal();
    setBlock(false);
  };
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = e.target.name;
    setBlock(false);

    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    setData({
      name: "",
      common_heading: false,
      remarks: "",
      description: "",
    })
  }, []);
  

  return (
    <>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Add Part Headings</>}
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
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="name"
              ></div>
            </div>



            <div className="form-group mt-5">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Description"
                name="description"
                id="description"
                onChange={handleChange}
                value={data.description}
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="description"
              ></div>
            </div>

            <div className="form-group mt-5">
              <label className="form-label">Remarks</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Enter  Remarks"
                name="remarks"
                id="remarks"
                onChange={handleChange}
                value={data.remarks}
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="remarks"
              ></div>
            </div>

    

            <button
              disabled={block}
              type="reset"
              className="btn btn-primary mr-2 mt-5"
              style={{ marginRight: "1rem" }}
              onClick={createHeading}
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
    </>
  );
};

export default CreateHeadings;
