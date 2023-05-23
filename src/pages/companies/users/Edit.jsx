import React, { useEffect, useState } from "react";
import Modal from "components/utils/Modal";
import CompanyService from "services/CompanyService";

const EditUser = ({ open, onCloseModal, onUpdate, companyId, userId }) => {
  const [block, setBlock] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
    status: false,
  });

  // Set the selected image to preview
  const setImage = async (e) => {
    let logoShow = document.getElementById("avatar");
    let fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", function () {
      logoShow.style.backgroundImage = "url(" + this.result + ")";
    });
  };

  //Get user data
  const getUser = async () => {
    setData(await CompanyService.getUser(companyId, userId));
  };

  //Store data
  const updateUser = async (e) => {
    setBlock(true);
    let formData = new FormData(document.getElementById("update-user"));
    await CompanyService.updateUser(companyId, userId, formData);
    onUpdate();
    onCloseModal();
    setBlock(false);
  };

  const handleChange = (e) => {
    setBlock(false);
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;

    let tempdata = { ...data };
    tempdata[name] = value;

    setData(tempdata);
  };

  useEffect(() => {
    if (userId) getUser();

    //Load the plugins after rendering the page
    setTimeout(() => {
      window.$('[data-bs-toggle="popover"]').popover();
      window.$('[data-bs-toggle="tooltip"]').tooltip();
    }, 100);
  }, [userId]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit User</>}
        body={
          <>
            <form id="update-user">
              <div className="mb-10 fv-row fv-plugins-icon-container text-center">
                <div
                  className="mx-auto image-input image-input-outline image-input-changed"
                  data-kt-image-input="true"
                >
                  <div
                    id="avatar"
                    className="image-input-wrapper w-125px h-125px"
                    style={{
                      backgroundImage:
                        "url(" + data.avatar ??
                        +"/assets/media/svg/files/blank-image.svg)",
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
                      name="avatar"
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
                  htmlFor="avatar"
                ></div>
              </div>

              <div className="mb-10 fv-row fv-plugins-icon-container">
                <label className="required form-label">Name</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Name"
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

              <div className="mb-10 fv-row fv-plugins-icon-container">
                <label className="form-label required">Email</label>
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Enter Email"
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

              <div className="mb-10 fv-row fv-plugins-icon-container">
                <label className="form-label">
                  Password
                  <i
                    className="fas fa-exclamation-circle ms-2 fs-7"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                    data-bs-html="true"
                    data-bs-content="Keep the input box empty to unchanged the password."
                  />
                </label>
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  value={data.password ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="password"
                ></div>
              </div>

              <div className="mb-10 fv-row fv-plugins-icon-container">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Phone"
                  name="phone"
                  id="phone"
                  value={data.phone ?? ""}
                  onChange={handleChange}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="phone"
                ></div>
              </div>

              <div className="form-group mt-5">
                <div className="form-check form-switch form-check-custom form-check-solid">
                  {data.name && (<input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={data.status}
                    defaultValue={data.status === true}
                    name="status"
                    id="status"
                    onChange={handleChange}
                  />) }
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchDefault"
                  >
                    Status
                  </label>
                </div>
              </div>

              <button
                type="reset"
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={updateUser}
                disabled={block}
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

export default EditUser;
