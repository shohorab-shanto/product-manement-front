import React from "react";
import { NavLink } from "react-router-dom";

const TopCard = ({ user }) => {

  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-body pt-9 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
          <div className="me-7 mb-4">
            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
              <span className="symbol-label" style={{ backgroundImage: `url(${user?.avatar})` }}></span>
              <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between flex-wrap mb-2">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <a
                    href="!#"
                    className="text-gray-900 text-hover-primary fs-2 fw-bolder me-1"
                  >
                    {user?.name}
                  </a>
                </div>
                <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                  <a
                    href="!#"
                    className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <span className="svg-icon svg-icon-4 me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          opacity="0.3"
                          d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z"
                          fill="black"
                        />
                        <path
                          d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    {user?.designation}
                  </a>

                  <a
                    href="!#"
                    className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <span className="svg-icon svg-icon-4 me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <path
                          d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                          fill="#000000"
                          fillRule="nonzero"
                          opacity="0.3"
                        />
                        <path
                          d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                          fill="#000000"
                          fillRule="nonzero"
                        />
                      </svg>
                    </span>
                    {user?.role}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
          <li className="nav-item mt-2">
            <NavLink
              className={(navinfo) =>
                navinfo.isActive
                  ? "nav-link text-active-primary ms-0 me-10 py-5 active"
                  : "nav-link text-active-primary ms-0 me-10 py-5"
              }
              to="/panel/profile/"
            >
              Overview
            </NavLink>
          </li>
          <li className="nav-item mt-2">
            <NavLink
              className={(navinfo) =>
                navinfo.isActive
                  ? "nav-link text-active-primary ms-0 me-10 py-5 active"
                  : "nav-link text-active-primary ms-0 me-10 py-5"
              }
              to="/panel/profile/settings/"
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopCard;
