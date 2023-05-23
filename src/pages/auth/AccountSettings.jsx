import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopCard from "components/profile/TopCard";
import { useDispatch, useSelector } from "react-redux";
import { savingData } from "../../features/Auth";

import ProfileService from "services/ProfileService";
const AccountSettings = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [profileData, setProfileData] = useState({});

  const getUserProfile = async () => {
    setProfileData(await ProfileService.getProfile());
  };

  const getProfile = async () => {
    let data = JSON.parse(localStorage.getItem("user"));
    setProfileData(data.user);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const setImage = async (e) => {
    let logoShow = document.getElementById("avatar");
    let fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", function () {
      logoShow.style.backgroundImage = "url(" + this.result + ")";
    });
  };

  const handleProfileChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;

    let tempdata = { ...profileData };
    tempdata[name] = value;

    setProfileData(tempdata);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const changePassword = async (data) => {
    await ProfileService.changePassword(data);
  };

  const updateProfile = async () => {
    let formData = new FormData(document.getElementById("update-profile"));
    console.log(formData);

    await ProfileService.updateProfile(formData);
    getUserProfile();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changePassword(data);
    getProfile();
  };

  const onProfileSumbit = (e) => {
    e.preventDefault();
    updateProfile();
    getUserProfile();
    dispatch(savingData(profileData));
  };

  return (
    <div id="kt_content_container" className="container-xxl">
      <TopCard user={profileData} />

      <div className="card mb-5 mb-xl-10">
        <div className="card-header border-0 cursor-pointer" role="button">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Profile Details</h3>
          </div>
        </div>

        <div id="kt_account_settings_profile_details" className="collapse show">
          <form
            id="update-profile"
            className="form fv-plugins-bootstrap5 fv-plugins-framework"
          >
            <div className="card-body border-top p-9">
              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  Avatar
                </label>
                <div className="col-lg-8">
                  <div
                    className="image-input image-input-outline"
                    data-kt-image-input="true"
                  >
                    <div
                      id="avatar"
                      className="image-input-wrapper w-125px h-125px"
                      style={{ backgroundImage: `url(${profileData?.avatar})` }}
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
                        onChange={setImage}
                      />
                      <input type="hidden" name="avatar_remove" />
                    </label>

                    <span
                      className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="cancel"
                      data-bs-toggle="tooltip"
                      title=""
                      data-bs-original-title="Cancel avatar"
                    >
                      <i className="bi bi-x fs-2"></i>
                    </span>

                    <span
                      className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="remove"
                      data-bs-toggle="tooltip"
                      title=""
                      data-bs-original-title="Remove avatar"
                    >
                      <i className="bi bi-x fs-2"></i>
                    </span>
                  </div>
                  <div className="form-text">
                    Allowed file types: png, jpg, jpeg.
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Full Name
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Name"
                        value={profileData.name || ""}
                        onChange={handleProfileChange}
                      />
                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Email
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg form-control-solid"
                        placeholder="email"
                        value={profileData.email || ""}
                        onChange={handleProfileChange}
                      />
                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <Link
                to="/panel/profile"
                type="reset"
                className="btn btn-light btn-active-light-primary me-2"
              >
                Discard
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                id="kt_account_profile_details_submit"
                onClick={onProfileSumbit}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card mb-5 mb-xl-10">
        <div className="card-header border-0 cursor-pointer" role="button">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Password Change</h3>
          </div>
        </div>

        <div id="kt_account_settings_profile_details" className="collapse show">
          <form className="form fv-plugins-bootstrap5 fv-plugins-framework">
            <div className="card-body border-top p-9">
              <div className="row mb-6">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Current Password
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                      <input
                        type="password"
                        name="current_password"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Current Password"
                        onChange={handleChange}
                        value={data.current_password || ""}
                      />
                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  New Password
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Password"
                        onChange={handleChange}
                        value={data.password || ""}
                      />
                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Confirm Password
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row fv-plugins-icon-container">
                      <input
                        type="password"
                        name="password_confirmation"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={data.password_confirmation || ""}
                      />
                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <Link
                to="/panel/profile"
                type="reset"
                className="btn btn-light btn-active-light-primary me-2"
              >
                Discard
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
