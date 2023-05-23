import React, { useEffect, useState } from "react";
import Modal from "components/utils/Modal";
import Tags from "components/utils/Tags";
import CompanyService from "services/CompanyService";

const EditCompany = ({ open, companyId, onCloseModal, onUpdated }) => {
  const [block, setBlock] = useState(true);
  const [company, setCompany] = useState({
    logo: "",
    name: "",
    company_group: "",
    machine_types: "",
    description: "",
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

  const getCompany = async () => {
    setCompany(await CompanyService.get(companyId));
    setBlock(false);
  };

  const updateCompany = async () => {
    let formData = new FormData(document.getElementById("update-company"));
    await CompanyService.update(companyId, formData);
    onUpdated();
    onCloseModal();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setCompany({
      ...company,
      [name]: value,
    });
  };

  useEffect(() => {
    setCompany({
      logo: "",
      name: "",
      company_group: "",
      machine_types: "",
      description: "",
      address: "",
      tel: "",
      email: "",
      web: "",
      trade_limit: "",
      due_amount: "",
      logo: "",
    });

    if (companyId) getCompany();
  }, [companyId]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit Company</>}
        body={
          <>
            <form id="update-company">
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
                        "url(" +
                        (company.logo ??
                          "/assets/media/svg/files/blank-image.svg") +
                        ")",
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
                      id="logo"
                      name="logo"
                      onChange={(e) => {
                        setImage(e);
                        handleChange(e);
                      }}
                      accept=".png, .jpg, .jpeg"
                    />
                  </label>
                </div>
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="logo"
                ></div>
              </div>

              <div className="mb-5 fv-row fv-plugins-icon-container">
                <label className="required form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Company Name"
                  name="name"
                  id="name"
                  value={company.name ?? ""}
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
                  value={company.address ?? ""}
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
                  value={company.tel ?? ""}
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
                  value={company.email ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="email"
                ></div>
              </div>

              <div className="mb-5 fv-row fv-plugins-icon-container">
                <label className="form-label">Web</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Company Web"
                  name="web"
                  id="web"
                  value={company.web ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="web"
                ></div>
              </div>

              <div className="mb-5 fv-row fv-plugins-icon-container">
                <label className="form-label">Group of Company</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Group of Company"
                  name="company_group"
                  id="company_group"
                  value={company.company_group}
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
                  value={company.machine_types ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="machine_types"
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
                  value={company.description ?? ""}
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
                onClick={updateCompany}
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

export default EditCompany;
