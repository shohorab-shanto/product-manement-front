import React, { useState } from "react";
import Modal from "../../components/utils/Modal";
import DesignationService from "../../services/DesignationService";
const CreateDesignation = ({ open, onCloseModal, getDesignations }) => {



  const createDesignation = async () => {
    await DesignationService.create(data);
    getDesignations();
    onCloseModal();
  }



  const [data, setData] = useState({
    name: "", designation: ""
  })


  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data, [name]: value
    })
  }

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Designation</>}
        body={
          <>
            
              <div className="form-group">
                <label className="required form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Designation Name"
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-5">
                <label className="form-label">Description</label>
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  placeholder="Enter Designation Description"
                  name="description"
                  id="description"
                  onChange={handleChange}
                />
              </div>

              <button
                type="reset"
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={createDesignation}
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

export default CreateDesignation;
