import React, { useState } from "react";
import Modal from "components/utils/Modal";
import Tags from "components/utils/Tags";
import CompanyService from "services/CompanyService";

const CreateCompany = ({ open, onCloseModal, onCreated }) => {
  const [data, setData] = useState({
    name: "",
    company_group: "",
    machine_types: "",
    description: "",
    tel: "",
    web: "",
    email: "",
    trade_limit: "",
    due_amount: "",
    logo: "",
  });

  // Set the selected image to preview
  const setImage = async (e) => {
    let logoShow = document.getElementById("logo");
    let fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", function () {
      logoShow.style.backgroundImage = "url(" + this.result + ")";
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

  //Store data
  const createCompany = async () => {
    let formData = new FormData(document.getElementById("create-company"));
    await CompanyService.create(formData);

    setData({
      name: "",
      company_group: "",
      machine_types: "",
      description: "",
      tel: "",
      web: "",
      email: "",
      trade_limit: "",
      due_amount: "",
      logo: "",
    });

    onCreated();
    onCloseModal();
  };

  return (
    <div>
      <Modal
        size="xl"
        open={open}
        onCloseModal={onCloseModal}
        title={<>Add Company</>}
        body={
          <>
            <form id="create-company">
              <div className="mb-5 fv-row fv-plugins-icon-container text-center">
                <div
                  className="mx-auto image-input image-input-outline image-input-changed"
                  data-kt-image-input="true"
                >
                  <div
                    id="logo"
                    className="image-input-wrapper w-125px h-125px"
                    style={{
                      backgroundImage:
                        "url(/assets/media/svg/files/blank-image.svg)",
                    }}
                  ></div>
                  <label
                    className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                    data-kt-image-input-action="change"
                    data-bs-toggle="tooltip"
                    data-bs-original-title="Change avatar"
                  >
                    <i className="bi bi-pencil-fill fs-7"></i>
                    <input
                      type="file"
                      name="logo"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        setImage(e);
                        handleChange(e);
                      }}
                    />
                  </label>
                </div>
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="logo"
                ></div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5 fv-row fv-plugins-icon-container">
                    <label className="required form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Company Name"
                      name="name"
                      id="name"
                      value={data.name ?? ""}
                      onChange={handleChange}
                    />
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="name"
                    ></div>
                  </div>

                  <div className="mb-5 fv-row fv-plugins-icon-container">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Company Address"
                      name="address"
                      id="address"
                      value={data.address ?? ""}
                      onChange={handleChange}
                    />
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="address"
                    ></div>
                  </div>

                  <div className="mb-5 fv-row fv-plugins-icon-container">
                    <label className="form-label">Tel</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter phone number"
                      name="tel"
                      id="tel"
                      value={data.tel ?? ""}
                      onChange={handleChange}
                    />
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="tel"
                    ></div>
                  </div>

                  <div className="mb-5 fv-row fv-plugins-icon-container">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Company Email"
                      name="email"
                      id="email"
                      value={data.email ?? ""}
                      onChange={handleChange}
                    />
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="email"
                    ></div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-5 fv-row fv-plugins-icon-container">
                    <label className="form-label">Group of Company</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Group of Company"
                      name="company_group"
                      id="company_group"
                      value={data.company_group ?? ""}
                      onChange={handleChange}
                    />
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="company_group"
                    ></div>
                  </div>

                  <div className="mb-5 fv-row fv-plugins-icon-container">
                    <label className="form-label">Factory Types</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Ex.: Data1,Data2"
                      name="machine_types"
                      id="machine_types"
                      value={data.machine_types ?? ""}
                      onChange={handleChange}
                    />
                    {/* <Tags
                      placeholder="Enter Machine Types"
                      name="machine_types"
                      id="machine_types"
                      value={data.machine_types ?? ""}
                      onChange={handleChange}
                    /> */}
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="machine_types"
                    ></div>
                  </div>

                  <div className="mb-5 fv-row fv-plugins-icon-container">
                    <label className="form-label">Trade limit</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Trade Limit"
                      name="trade_limit"
                      id="trade_limit"
                      value={data.trade_limit ?? ""}
                      onChange={handleChange}
                    />
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="description"
                    ></div>
                  </div>

                  {/* <div className="mb-5 fv-row fv-plugins-icon-container">
                    <label className="form-label">Due Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Due Amount"
                      name="due_amount"
                      id="due_amount"
                      onChange={handleChange}
                    />
                    <div
                      className="fv-plugins-message-container invalid-feedback"
                      htmlFor="description"
                    ></div>
                  </div> */}
                </div>
              </div>

              <div className="mb-5 fv-row fv-plugins-icon-container">
                <label className="form-label">Web</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Company Web"
                  name="web"
                  id="web"
                  value={data.web ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="web"
                ></div>
              </div>

              <div className="mb-5 fv-row fv-plugins-icon-container">
                <label className="form-label">Description</label>
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  name="description"
                  id="description"
                  value={data.description ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="description"
                ></div>
              </div>

              <button
                type="reset"
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={createCompany}
              >
                Submit
              </button>
              <button
                type="reset"
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

export default CreateCompany;
