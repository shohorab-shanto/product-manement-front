import React, { useEffect, useState } from "react";
import CategoryService from "../../services/CategoryService";
import Modal from "../../components/utils/Modal";
import Select from 'react-select';

const CreateCategory = ({ open, onCloseModal, getCategory }) => {
  const [data, setData] = useState({
    name: "",
    designation: "",
  });
  const [block, setBlock] = useState(false);
  const [category, setCategory] = useState("");

  const createCategory = async (data) => {
    await CategoryService.create(data);
    getCategory();
  };

  const getCategories = async () => {
    setBlock(false);
    let res = await CategoryService.getAll();
    let dt = res?.map((itm) => ({ label: itm.name, value: itm.id }));
    setCategory(dt);
    setBlock(false);
  };

  useEffect(() => {
    getCategories();
  }, [open]);

  const handleSelect = (option, conf) => {
    const value = option.value;
    const name = conf.name;
    setBlock(false);

    setData({
      ...data,
      [name]: value,
    });
  };

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
    createCategory(data);
    onCloseModal();
  };
  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Categoy</>}
        body={
          <>
            <div className="form-group">
              <label className="required form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter  Name"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-5">
              <label className="form-label">Category Parent</label>
              <Select
                options={category}
                onChange={handleSelect}
                name="parent_cat_id"
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="parent_cat_id"
              ></div>
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

export default CreateCategory;
