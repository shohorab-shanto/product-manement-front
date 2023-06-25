import React, { Fragment, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import Modal from "../../components/utils/Modal";
import Select from "react-select";
import AttributeService from "services/AttributeService";
import CategoryService from "services/CategoryService";
import attributesValueService from "services/AttributeValueService";

const CreateCategory = ({ open, onCloseModal, getProduct }) => {
  const [data, setData] = useState({
    category_id: "",
    attribute_id: "",
    attribute_value_id: "",
    value: "",
    name: "",
    qty: "",
    designation: "",
  });
  
  const [block, setBlock] = useState(false);
  const [category, setCategory] = useState("");
  const [attribute, setAttribute] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [inputField, setInputField] = useState([{}]);
  // const createCategory = async (data) => {
  //   await ProductService.create(data);
  //   getProduct();
  // };

  const getAttribute = async () => {
    setBlock(false);
    let res = await AttributeService.getAll();
    let dt = res?.map((itm) => ({ label: itm.name, value: itm.id }));
    setAttribute(dt);
    setBlock(false);
  };

  const getAttributeValue = async (attributeId) => {
    setBlock(false);
    let res = await attributesValueService.getAttributeValue(attributeId);
    let dt = res?.map((itm) => ({ label: itm.value, value: itm.id }));
    setAttributeValue(dt);
    setBlock(false);
  };

  useEffect(() => {
    if (open) {
      inputField.map((item, index) => getAttributeValue(item?.attribute_id));
    }
  }, [data.attribute_id, inputField]);

  const getCategory = async () => {
    setBlock(false);
    let res = await CategoryService.getAll();
    let dt = res?.map((itm) => ({ label: itm.name, value: itm.id }));
    setCategory(dt);
    setBlock(false);
  };

  useEffect(() => {
    getAttribute();
    getAttributeValue();
    getCategory();
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

  const handleAttSelect = (option, action, index) => {
    const value = option.value;
    const name = action.name;
    const list = [...inputField];
    list[index][name] = value;
    setInputField(list);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleAttValChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputField];

    list[index][name] = value;
    setInputField(list);
  };

  const handlePartAdd = () => {
    setInputField([...inputField, {}]);
  };

  const handlePartRemove = (index) => {
    const list = [...inputField];
    list.splice(index, 1);
    setInputField(list);
  };

  // const onSumbit = (e) => {
  //   e.preventDefault();
  //   createCategory(data);
  //   onCloseModal();
  // };

  const onSumbit = async () => {
    setBlock(true);
    let temp1 = [];

    inputField.forEach((value) => {
      temp1.push({
        attribute_id: value.attribute_id,
        value: value.attribute_value,
      });
    });

    let formData = new FormData();
    // formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("qty", data.qty);
    formData.append("category_id", data.category_id);
    formData.append("description", data.descriptions);
    formData.append("attribute", JSON.stringify(temp1));

    await ProductService.create(formData);
    // onCreated();
    getProduct();
    onCloseModal();
    setBlock(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Product</>}
        body={
          <>
            <div className="form-group mt-5">
              <label className="required form-label">Product Category</label>
              <Select
                options={category}
                onChange={handleSelect}
                name="category_id"
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="category_id"
              ></div>
            </div>

            {inputField?.map((item, index) => (
              <Fragment key={index}>
                <div className="form-group mt-5">
                  <div className="row">
                    <div className="col-sm-6 col-md-6">
                      <label className="required form-label">Attribute</label>
                      <Select
                        options={attribute}
                        onChange={(option, action) =>
                          handleAttSelect(option, action, index)
                        }
                        name="attribute_id"
                      />
                      <div
                        className="fv-plugins-message-container invalid-feedback"
                        htmlFor="part_heading_id[]"
                      ></div>
                    </div>

                    <div className="col-sm-6 col-md-6">
                      <label className="required form-label">
                        Attribute Value
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Attribute Value"
                        name="attribute_value"
                        id="attribute_value"
                        onChange={(e) => handleAttValChange(e, index)}
                      />
                      <div
                        className="fv-plugins-message-container invalid-feedback"
                        htmlFor="part_number[]"
                      ></div>
                    </div>

                    <div className="col-sm-1 mt-8">
                      {index ? (
                        <button
                          type="button"
                          className="btn btn-danger float-right"
                          onClick={() => handlePartRemove(index)}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handlePartAdd}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {inputField.length - 1 === index && (
                  <button
                    type="button"
                    className="btn btn-primary mt-5"
                    onClick={handlePartAdd}
                  >
                    <i className="fa fa-plus"></i> Add More
                  </button>
                )}
              </Fragment>
            ))}

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

            <div className="form-group">
              <label className="required form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter  Qty"
                name="qty"
                id="qty"
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
              onClick={() => {
                onSumbit();
              }}
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
