import Tags from "components/utils/Tags";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import RoleService from "services/RoleService";
import SettingsService from "services/SettingsService";

const Settings = () => {
  const [roles, setRoles] = useState([]);
  const [value, setValue] = useState([]);
  const [block, setBlock] = useState(false);
  const [data, setData] = useState({});

  const [logo, setLogo] = useState([]);
  const [icon, setIcon] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSelect = (option, conf) => {
    let value = option.value;

    if (Array.isArray(option))

    value = option.map((dt) => {
      return dt.value;
    });
    const name = conf.name;
    setBlock(false);

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogo = (e) => {
    setLogo({ logo: e.target.files[0] });
    let logoShow = document.getElementById("logo");
    let fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", function () {
      logoShow.style.backgroundImage = "url(" + this.result + ")";
    });
  };

  const handleIcon = (e) => {
    setIcon({ icon: e.target.files[0] });
    let IconShow = document.getElementById("icon");
    let fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", function () {
      IconShow.style.backgroundImage = "url(" + this.result + ")";
    });
  };

  //get notifiable users
  const getNotifiableUsers = async () => {
    let dt = await SettingsService.getUsers();
    dt = dt.map((itm) => ({ label: itm?.name, value: itm?.id }));
    setRoles(dt);
  };

  //Store data
  const createSettings = (e) => {
    e.preventDefault();
    setBlock(true);
    const formData = new FormData(document.getElementById("settings")); 
    formData.append('notifiable_users', data.notifiable_users);
    SettingsService.create(formData);
    setBlock(false);
  };

   //Store data
  //  const createSettings = async() => {
  //   setBlock(true);
  //  await SettingsService.create(data);
  //   setBlock(false);
  // };
  // get setting
  const getSettings = async () => {
    const res = await SettingsService.getAll();
    setData(res.data);
  };

  useEffect(() => {
    getNotifiableUsers();
    getSettings();
  }, []);

  return (
    <div
      className="content d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="card">
            <div className="card-header">
              <div className="card-title fs-3 fw-bolder">Project Settings</div>
            </div>

            <form
              onSubmit={createSettings}
              id="settings"
              encType="multipart/form-data"
            >

          {/* <form
              action=""
              id="settings"
              encType="multipart/form-data"
            > */}
              <div className="card-body p-9">
                {/* for project logo */}
                <div className="row mb-5">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">Logo</div>
                  </div>

                  <div className="col-lg-8">
                    <div
                      className="image-input image-input-outline"
                      data-kt-image-input="true"
                      style={{
                        backgroundImage:
                          "url('assets/media/svg/avatars/blank.svg')",
                      }}
                    >
                      <div
                        id="logo"
                        className="image-input-wrapper w-125px h-125px bgi-position-center"
                        style={{
                          backgroundSize: "75%",
                          backgroundImage: `url('${data?.logo}')`,
                        }}
                      >
                      </div>

                      <label
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                        data-kt-image-input-action="change"
                        data-bs-toggle="tooltip"
                        title="Change avatar"
                      >
                        <i className="bi bi-pencil-fill fs-7"></i>

                        <input
                          type="file"
                          name="logo"
                          accept=".png, .jpg, .jpeg"
                          // onChange={(e) => { setLogo(e); handleChange(e) }}
                          onChange={handleLogo}
                        />
                        <input type="hidden" name="logo" />
                      </label>

                      <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                        data-kt-image-input-action="cancel"
                        data-bs-toggle="tooltip"
                        title="Cancel avatar"
                      >
                        <i className="bi bi-x fs-2"></i>
                      </span>

                      <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                        data-kt-image-input-action="remove"
                        data-bs-toggle="tooltip"
                        title="Remove avatar"
                      >
                        <i className="bi bi-x fs-2"></i>
                      </span>
                    </div>

                    <div className="form-text">
                      Allowed file types: png, jpg, jpeg.
                    </div>
                  </div>
                </div>

                {/* for project tab icon */}
                <div className="row mb-5">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">Icon</div>
                  </div>

                  <div className="col-lg-8">
                    <div
                      id="icon"
                      className="image-input image-input-outline"
                      data-kt-image-input="true"
                      style={{
                        backgroundImage:
                          "url('assets/media/svg/avatars/blank.svg')",
                      }}
                    >
                      <div
                        className="image-input-wrapper w-125px h-125px bgi-position-center"
                        style={{
                          backgroundSize: "75%",
                          backgroundImage: `url('${data?.icon}')`,
                        }}
                      ></div>

                      <label
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                        data-kt-image-input-action="change"
                        data-bs-toggle="tooltip"
                        title="Change avatar"
                      >
                        <i className="bi bi-pencil-fill fs-7"></i>

                        <input
                          type="file"
                          name="icon"
                          accept=".png, .jpg, .jpeg"
                          // onChange={(e) => { setIcon(e); handleChange(e) }}
                          onChange={handleIcon}
                        />
                        <input type="hidden" name="icon" />
                      </label>

                      <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                        data-kt-image-input-action="cancel"
                        data-bs-toggle="tooltip"
                        title="Cancel avatar"
                      >
                        <i className="bi bi-x fs-2"></i>
                      </span>

                      <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                        data-kt-image-input-action="remove"
                        data-bs-toggle="tooltip"
                        title="Remove avatar"
                      >
                        <i className="bi bi-x fs-2"></i>
                      </span>
                    </div>

                    <div className="form-text">
                       Allowed file types: png, jpg, jpeg.
                    </div>
                  </div>
                </div>

                <div className="row mb-8">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">Site Name</div>
                  </div>

                  <div className="col-xl-9 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      name="site_name"
                      value={data?.site_name ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-8">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">
                      Notifiable Users
                    </div>
                  </div>

                  <div className="col-xl-9 fv-row">
                    <Select
                      value={roles.filter(
                        (option) =>  data?.notifiable_users?.includes(option.value)
                      )}
                      isMulti
                      options={roles}
                      onChange={handleSelect}
                      name="notifiable_users"
                    />
                  </div>
                </div>

                <div className="row mb-8">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">
                      Notifiable Emails
                    </div>
                  </div>

                  <div className="col-xl-9 fv-row">
                    <Tags
                    placeholder="Enter notifiable emails"
                    name="notifiable_emails"
                    id="notifiable_emails"
                    value={data.notifiable_emails ?? ''}
                    onChange={handleChange}
                  />
                  </div>
                </div>

                

                {/* <div className="row mb-8">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">Project Type</div>
                  </div>

                  <div className="col-xl-9 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      name="type"
                      value="Client Relationship"
                    />
                  </div>
                </div>

                <div className="row mb-8">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">
                      Project Description
                    </div>
                  </div>

                  <div className="col-xl-9 fv-row">
                    <textarea
                      name="description"
                      className="form-control form-control-solid h-100px"
                    >
                      Organize your thoughts with an outline. Here’s the
                      outlining strategy I use. I promise it works like a charm.
                      Not only will it make writing your blog post easier, it’ll
                      help you make your message
                    </textarea>
                  </div>
                </div>

                <div className="row mb-8">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">Due Date</div>
                  </div>

                  <div className="col-xl-9 fv-row">
                    <div className="position-relative d-flex align-items-center">
                      <span className="svg-icon position-absolute ms-4 mb-1 svg-icon-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            opacity="0.3"
                            d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z"
                            fill="black"
                          />
                          <path
                            d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z"
                            fill="black"
                          />
                          <path
                            d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z"
                            fill="black"
                          />
                        </svg>
                      </span>

                      <input
                        className="form-control form-control-solid ps-12"
                        name="date"
                        placeholder="Pick a date"
                        id="kt_datepicker_1"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-8">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">Notifications</div>
                  </div>

                  <div className="col-xl-9">
                    <div className="d-flex fw-bold h-100">
                      <div className="form-check form-check-custom form-check-solid me-9">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="email"
                        />
                        <label className="form-check-label ms-3" for="email">
                          Email
                        </label>
                      </div>
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="phone"
                          checked="checked"
                        />
                        <label className="form-check-label ms-3" for="phone">
                          Phone
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3">
                    <div className="fs-6 fw-bold mt-2 mb-3">Status</div>
                  </div>

                  <div className="col-xl-9">
                    <div className="form-check form-switch form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="status"
                        name="status"
                        checked="checked"
                      />
                      <label
                        className="form-check-label fw-bold text-gray-400 ms-3"
                        for="status"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div> */}
                
              </div>
              {/* </form> */}
              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button
                  type="reset"
                  className="btn btn-light btn-active-light-primary me-2"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="kt_project_settings_submit"
                  // onClick={createSettings}
                  // onClick={() => {
                  //   createSettings();
                  // }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
