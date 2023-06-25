import React, { useEffect, useState } from "react";
import AttributeValueService from "../../services/AttributeValueService";
import Modal from "../../components/utils/Modal";
import AttributeService from "services/AttributeService";
import Select from 'react-select';

const CreateAttributeValue = ({ open, onCloseModal, getAttributeValue }) => {
  const [attribute, setAttribute] = useState("");
  const [data, setData] = useState({
    attribute_id:"",
    value: "",
    designation: "",
  });
  const [block, setBlock] = useState(false);

  const createAttributeValue = async (data) => {
    await AttributeValueService.create(data);
    getAttributeValue();
  };

  const getAttribute = async () => {
    setBlock(false);
    let res = await AttributeService.getAll();
    let dt = res?.map((itm) => ({ label: itm.name, value: itm.id }));
    setAttribute(dt);
    setBlock(false);
  };

  useEffect(() => {
    getAttribute();
  }, [open])
  

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
    createAttributeValue(data);
    onCloseModal();
  };
  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Attribute Value</>}
        body={
          <>
            <div className="form-group mt-5">
              <label className="required form-label">Attribute</label>
              <Select
                options={attribute}
                onChange={handleSelect}
                name="attribute_id"
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="attribute_id"
              ></div>
            </div>

            <div className="form-group">
              <label className="required form-label">Value</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter  Value"
                name="value"
                id="value"
                onChange={handleChange}
              />
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

export default CreateAttributeValue;
