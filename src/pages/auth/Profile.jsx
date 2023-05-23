import React, { useState, useEffect } from "react";
import TopCard from "components/profile/TopCard";

const Profile = () => {
    const [profile, setProfile] = useState([])

    const getProfile = async () => {
        let data = JSON.parse(localStorage.getItem('user'));
        setProfile(data.user)
    };

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="container-xxl">
            <TopCard user={profile} />

            <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
                <div className="card-header cursor-pointer">
                    <div className="card-title m-0">
                        <h3 className="fw-bolder m-0">Profile Details</h3>
                    </div>
                </div>
                <div className="card-body p-9">
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">Full Name</label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-gray-800"> {profile?.name}</span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">Designation</label>
                        <div className="col-lg-8 fv-row">
                            <span className="fw-bold text-gray-800 fs-6">{profile?.designation}</span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">
                            Contact Phone
                            <i
                                className="fas fa-exclamation-circle ms-1 fs-7"
                                data-bs-toggle="tooltip"
                                title=""
                                data-bs-original-title="Phone number must be active"
                                aria-label="Phone number must be active"
                            ></i>
                        </label>
                        <div className="col-lg-8 d-flex align-items-center">
                            <span className="fw-bolder fs-6 text-gray-800 me-2">
                                044 3276 454 935
                            </span>
                            <span className="badge badge-success">Verified</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row gy-5 gx-xl-10">
                <div className="col-xl-12">
                    <div className="card card-xl-stretch mb-xl-10">
                        <div className="card-header align-items-center border-0 mt-4">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="fw-bolder mb-2 text-dark">Activities</span>
                                <span className="text-muted fw-bold fs-7">890,344 Sales</span>
                            </h3>
                            <div className="card-toolbar">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                                    data-kt-menu-trigger="click"
                                    data-kt-menu-placement="bottom-end"
                                >
                                    <span className="svg-icon svg-icon-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                        >
                                            <g
                                                stroke="none"
                                                strokeWidth="1"
                                                fill="none"
                                                fillRule="evenodd"
                                            >
                                                <rect
                                                    x="5"
                                                    y="5"
                                                    width="5"
                                                    height="5"
                                                    rx="1"
                                                    fill="#000000"
                                                ></rect>
                                                <rect
                                                    x="14"
                                                    y="5"
                                                    width="5"
                                                    height="5"
                                                    rx="1"
                                                    fill="#000000"
                                                    opacity="0.3"
                                                ></rect>
                                                <rect
                                                    x="5"
                                                    y="14"
                                                    width="5"
                                                    height="5"
                                                    rx="1"
                                                    fill="#000000"
                                                    opacity="0.3"
                                                ></rect>
                                                <rect
                                                    x="14"
                                                    y="14"
                                                    width="5"
                                                    height="5"
                                                    rx="1"
                                                    fill="#000000"
                                                    opacity="0.3"
                                                ></rect>
                                            </g>
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
                                    data-kt-menu="true"
                                    id="kt_menu_61bc33e60572a"
                                >
                                    <div className="px-7 py-5">
                                        <div className="fs-5 text-dark fw-bolder">
                                            Filter Options
                                        </div>
                                    </div>
                                    <div className="separator border-gray-200"></div>
                                    <div className="px-7 py-5">
                                        <div className="mb-10">
                                            <label className="form-label fw-bold">Status:</label>
                                            <div>
                                                <select
                                                    className="form-select form-select-solid select2-hidden-accessible"
                                                    data-kt-select2="true"
                                                    data-placeholder="Select option"
                                                    data-dropdown-parent="#kt_menu_61bc33e60572a"
                                                    data-allow-clear="true"
                                                    data-select2-id="select2-data-16-lx7h"
                                                    tabIndex="-1"
                                                    aria-hidden="true"
                                                >
                                                    <option data-select2-id="select2-data-18-s23n"></option>
                                                    <option value="1">Approved</option>
                                                    <option value="2">Pending</option>
                                                    <option value="2">In Process</option>
                                                    <option value="2">Rejected</option>
                                                </select>
                                                <span
                                                    className="select2 select2-container select2-container--bootstrap5"
                                                    dir="ltr"
                                                    data-select2-id="select2-data-17-hzxo"
                                                    style={{ width: "100%" }}
                                                >
                                                    <span className="selection">
                                                        <span
                                                            className="select2-selection select2-selection--single form-select form-select-solid"
                                                            role="combobox"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                            tabIndex="0"
                                                            aria-disabled="false"
                                                            aria-labelledby="select2-5mpy-container"
                                                            aria-controls="select2-5mpy-container"
                                                        >
                                                            <span
                                                                className="select2-selection__rendered"
                                                                id="select2-5mpy-container"
                                                                role="textbox"
                                                                aria-readonly="true"
                                                                title="Select option"
                                                            >
                                                                <span className="select2-selection__placeholder">
                                                                    Select option
                                                                </span>
                                                            </span>
                                                            <span
                                                                className="select2-selection__arrow"
                                                                role="presentation"
                                                            >
                                                                <b role="presentation"></b>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <span
                                                        className="dropdown-wrapper"
                                                        aria-hidden="true"
                                                    ></span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-10">
                                            <label className="form-label fw-bold">Member Type:</label>
                                            <div className="d-flex">
                                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value="1"
                                                    />
                                                    <span className="form-check-label">Author</span>
                                                </label>
                                                <label className="form-check form-check-sm form-check-custom form-check-solid">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value="2"
                                                    />
                                                    <span className="form-check-label">Customer</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-10">
                                            <label className="form-label fw-bold">
                                                Notifications:
                                            </label>
                                            <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    name="notifications"
                                                />
                                                <label className="form-check-label">Enabled</label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button
                                                type="reset"
                                                className="btn btn-sm btn-light btn-active-light-primary me-2"
                                                data-kt-menu-dismiss="true"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-sm btn-primary"
                                                data-kt-menu-dismiss="true"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-5">
                            <div className="timeline-label">
                                <div className="timeline-item">
                                    <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                        08:42
                                    </div>
                                    <div className="timeline-badge">
                                        <i className="fa fa-genderless text-warning fs-1"></i>
                                    </div>
                                    <div className="fw-mormal timeline-content text-muted ps-3">
                                        Outlines keep you honest. And keep structure
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                        10:00
                                    </div>
                                    <div className="timeline-badge">
                                        <i className="fa fa-genderless text-success fs-1"></i>
                                    </div>
                                    <div className="timeline-content d-flex">
                                        <span className="fw-bolder text-gray-800 ps-3">
                                            AEOL meeting
                                        </span>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                        14:37
                                    </div>
                                    <div className="timeline-badge">
                                        <i className="fa fa-genderless text-danger fs-1"></i>
                                    </div>
                                    <div className="timeline-content fw-bolder text-gray-800 ps-3">
                                        Make deposit
                                        <a href="!#" className="text-primary">
                                            USD 700
                                        </a>
                                        . to ESL
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                        16:50
                                    </div>
                                    <div className="timeline-badge">
                                        <i className="fa fa-genderless text-primary fs-1"></i>
                                    </div>
                                    <div className="timeline-content fw-mormal text-muted ps-3">
                                        Indulging in poorly driving and keep structure keep
                                        great
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                        21:03
                                    </div>
                                    <div className="timeline-badge">
                                        <i className="fa fa-genderless text-danger fs-1"></i>
                                    </div>
                                    <div className="timeline-content fw-bold text-gray-800 ps-3">
                                        New order placed
                                        <a href="!#" className="text-primary">
                                            #XF-2356
                                        </a>
                                        .
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                        16:50
                                    </div>
                                    <div className="timeline-badge">
                                        <i className="fa fa-genderless text-primary fs-1"></i>
                                    </div>
                                    <div className="timeline-content fw-mormal text-muted ps-3">
                                        Indulging in poorly driving and keep structure keep
                                        great
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                        21:03
                                    </div>
                                    <div className="timeline-badge">
                                        <i className="fa fa-genderless text-danger fs-1"></i>
                                    </div>
                                    <div className="timeline-content fw-bold text-gray-800 ps-3">
                                        New order placed
                                        <a href="!#" className="text-primary">
                                            #XF-2356
                                        </a>
                                        .
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                        10:30
                                    </div>
                                    <div className="timeline-badge">
                                        <i className="fa fa-genderless text-success fs-1"></i>
                                    </div>
                                    <div className="timeline-content fw-mormal text-muted ps-3">
                                        Finance KPI Mobile app launch preparion meeting
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
