import React, { useState, useEffect } from "react";
import RoleService from "services/RoleService";
import Modal from "../../components/utils/Modal";

const CreateRole = ({ open, onCloseModal, onCreated }) => {
  const createRole = async (data) => {
    await RoleService.create(data);
    onCreated();
    onCloseModal();
  };

  const [data, setData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onSumbit = (e) => {
    e.preventDefault();
    createRole(data);
    onCloseModal();
  };

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create role</>}
        body={
          <>
           
              <div className="form-group">
                <label className="required form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Role Name"
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
              </div>

              <button
                type="reset"
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={onSumbit}
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

export default CreateRole;
