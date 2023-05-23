import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "features/Auth";
import { useDispatch } from "react-redux";
import Pusher from "pusher-js";
import NotificationService from "services/NotificationService";
import Moment from "react-moment";

const InfoBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [expandNotification, setExpandNotification] = useState(false);
  const [push, setPush] = useState([]);
  const [notification, setNotification] = useState([]);
  // const [notification, setnotification] = useState();
  const ref = useRef();

  let data = JSON.parse(localStorage.getItem("user"));
  let user = data?.user;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/logout");
  };

  const getNotification = async () => {
    const res = await NotificationService.getAll({
      rows: 7
    });
    setNotification(res);
  };

  useEffect(() => {
    const clickIfClickedOutside = (e) => {
      if (profileOpen && ref.current && !ref.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", clickIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", clickIfClickedOutside);
    };
  }, [profileOpen]);

  // for pusher
  useEffect(() => {
    getNotification();
    // Pusher.logToConsole = true;
    var pusher = new Pusher("31b9b8a1eb615e3700b9", {
      // authEndpoint: config.baseUrl + "pusher",
      cluster: "ap2",
    });

    pusher
      .subscribe("naf-inventory")
      .bind(`notification-${user.id}`, async function (data) {
        getNotification();
      });
  }, []);

  useEffect(() => {
    if (notification) {
      let count = 0;
      notification.forEach((item) => {
        if (!item.read_at) {
          count++;
        }
        setUnreadCount(count);
      });
    }
  }, [notification]);

  const notificationRead = async (item) => {
    let path =
      user.details == null
        ? `/panel/${item?.data?.url}`
        : `/panel/client/${item?.data?.url}`;
    await NotificationService.readAt(item.id);
    getNotification();
    navigate(path);
  };

  // const notificationFilter = () => {
  //   if (user.details) {
  //     let carry = notification.filter((item) => {
  //       if (user.details.company_id == item.data.data.company_id) return item;
  //     });
  //     setnotification(carry);
  //   } else {
  //     setnotification(notification);
  //   }
  // };

  // useEffect(() => {
  //   notificationFilter();
  // }, [notification]);

  return (
    <div className="d-flex align-items-stretch flex-shrink-0">
      <div className="d-flex align-items-stretch flex-shrink-0">
        <div className="d-flex align-items-center ms-1 ms-lg-3">
          <div
          onClick={() => setExpandNotification(!expandNotification)}
          // className="btn btn-icon btn-active-light-primary position-relative w-30px h-30px w-md-40px h-md-40px"
            className={ expandNotification ? "btn btn-icon btn-active-light-primary position-relative w-30px h-30px w-md-40px h-md-40px show menu-dropdown" : "btn btn-icon btn-active-light-primary position-relative w-30px h-30px w-md-40px h-md-40px"}
            data-kt-menu-trigger="click"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
          >
            <span className="svg-icon svg-icon-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17,12 L18.5,12 C19.3284271,12 20,12.6715729 20,13.5 C20,14.3284271 19.3284271,15 18.5,15 L5.5,15 C4.67157288,15 4,14.3284271 4,13.5 C4,12.6715729 4.67157288,12 5.5,12 L7,12 L7.5582739,6.97553494 C7.80974924,4.71225688 9.72279394,3 12,3 C14.2772061,3 16.1902508,4.71225688 16.4417261,6.97553494 L17,12 Z"
                  fill="#000000"
                />
                <rect
                  fill="#000000"
                  opacity="0.3"
                  x="10"
                  y="16"
                  width="4"
                  height="4"
                  rx="2"
                />
              </svg>
            </span>
            <span className=" position-absolute translate-middle top-0 start-100">
              {unreadCount > 0 ? unreadCount : ""}
            </span>
            <span
              className={
                unreadCount > 0
                  ? "bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"
                  : ""
              }
            ></span>
          </div>

          <div
            className={expandNotification ? "menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px show" : "menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px" }
            data-kt-menu="true"
            style={expandNotification ? {
              zIndex: 105,
              position: 'fixed',
              inset: '0px 0px auto auto',
              margin: '0px',
              transform: 'translate(-128px, 65px)'
              }: {}}
          >
            <div
              className="d-flex flex-column bgi-no-repeat rounded-top"
              style={{
                backgroundImage: "url('/assets/media/misc/pattern-1.jpg')",
              }}
            >
              <h3 className="text-white fw-bold px-9 mt-10 mb-6">
                Notifications
              </h3>
            </div>

            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="kt_topbar_notifications_1"
                role="tabpanel"
              >
                <div className="scroll-y mh-325px my-5 px-8">
                  {notification?.map((item,index) => {
                    return (
                      <div key={index} className="d-flex flex-stack py-4">
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-35px me-4">
                            <span className="symbol-label bg-light-primary">
                              <span 
                                className={
                                  item?.read_at
                                    ? "svg-icon svg-icon-2 svg-icon-primary"
                                    : "svg-icon svg-icon-2 svg-icon-danger"
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    opacity="0.3"
                                    d="M6 22H4V3C4 2.4 4.4 2 5 2C5.6 2 6 2.4 6 3V22Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    d="M18 14H4V4H18C18.8 4 19.2 4.9 18.7 5.5L16 9L18.8 12.5C19.3 13.1 18.8 14 18 14Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                          </div>

                          <div className="mb-0 me-2">
                            <a
                              onClick={() => {
                                notificationRead(item);
                              }}
                              className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                            >
                              {item?.data?.message}
                            </a>
                            <div className="text-gray-400 fs-7">
                              {item?.data?.message} by {item?.data?.user?.name}
                            </div>
                          </div>
                        </div>

                        <span className="badge badge-light fs-8">
                          <Moment format="HH:mm">{item?.created_at}</Moment>
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="py-3 text-center border-top">
                  <div className=" color-gray-600 btn-active-color-primary">
                    Total ({notification?.length})
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="kt_topbar_notifications_3"
                role="tabpanel"
              >
                <div className="scroll-y mh-325px my-5 px-8">
                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-success me-4">
                        200 OK
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        New order
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">Just now</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-danger me-4">
                        500 ERR
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        New customer
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">2 hrs</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-success me-4">
                        200 OK
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        Payment process
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">5 hrs</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-warning me-4">
                        300 WRN
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        Search query
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">2 days</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-success me-4">
                        200 OK
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        API connection
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">1 week</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-success me-4">
                        200 OK
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        Database restore
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">Mar 5</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-warning me-4">
                        300 WRN
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        System update
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">May 15</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-warning me-4">
                        300 WRN
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        Server OS update
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">Apr 3</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-warning me-4">
                        300 WRN
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        API rollback
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">Jun 30</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-danger me-4">
                        500 ERR
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        Refund process
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">Jul 10</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-danger me-4">
                        500 ERR
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        Withdrawal process
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">Sep 10</span>
                  </div>

                  <div className="d-flex flex-stack py-4">
                    <div className="d-flex align-items-center me-2">
                      <span className="w-70px badge badge-light-danger me-4">
                        500 ERR
                      </span>

                      <a
                        href="!#"
                        className="text-gray-800 text-hover-primary fw-bold"
                      >
                        Mail tasks
                      </a>
                    </div>

                    <span className="badge badge-light fs-8">Dec 10</span>
                  </div>
                </div>

                <div className="py-3 text-center border-top">
                  <a
                    href="../../demo1/dist/pages/profile/activity.html"
                    className="btn btn-color-gray-600 btn-active-color-primary"
                  >
                    View All
                    <span className="svg-icon svg-icon-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          opacity="0.5"
                          x="18"
                          y="13"
                          width="13"
                          height="2"
                          rx="1"
                          transform="rotate(-180 18 13)"
                          fill="black"
                        ></rect>
                        <path
                          d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                          fill="black"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center ms-1 ms-lg-3">
          <div className="btn btn-icon btn-active-light-primary position-relative w-30px h-30px w-md-40px h-md-40px">
            <span className="svg-icon svg-icon-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity="0.3"
                  d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
                  fill="black"
                ></path>
                <rect
                  x="6"
                  y="12"
                  width="7"
                  height="2"
                  rx="1"
                  fill="black"
                ></rect>
                <rect
                  x="6"
                  y="7"
                  width="12"
                  height="2"
                  rx="1"
                  fill="black"
                ></rect>
              </svg>
            </span>
          </div>
        </div>

        <div
          className="d-flex align-items-center ms-1 ms-lg-3"
          id="kt_header_user_menu_toggle"
          ref={ref}
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <div
            className="cursor-pointer symbol symbol-30px symbol-md-40px"
            data-kt-menu-trigger="click"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
          >
            <span
              className="symbol-label"
              style={{ backgroundImage: `url(${user?.avatar})` }}
            ></span>
          </div>

          <div
            className={
              profileOpen
                ? "menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px show"
                : "menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
            }
            style={
              profileOpen
                ? {
                    zIndex: "105",
                    position: "fixed",
                    inset: "0px 0px auto auto",
                    margin: "0px",
                    transform: "translate(-30px, 65px)",
                  }
                : {}
            }
          >
            <div className="menu-item px-3">
              <div className="menu-content d-flex align-items-center px-3">
                <div className="symbol symbol-50px me-5">
                  <span
                    className="symbol-label"
                    style={{ backgroundImage: `url(${user?.avatar})` }}
                  ></span>
                </div>

                <div className="d-flex flex-column">
                  <div className="fw-bolder d-flex align-items-center">
                    {user?.name}
                  </div>
                  <a
                    href="!#"
                    className="fw-bold text-muted text-hover-primary fs-7"
                  >
                    {user?.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="separator my-2"></div>

            <div className="menu-item px-5">
              <Link to="/panel/profile/" className="menu-link px-5">
                My Profile
              </Link>
            </div>

            <div className="menu-item px-5 my-1">
              <Link to="/panel/profile/settings" className="menu-link px-5">
                Account Settings
              </Link>
            </div>

            <div className="menu-item px-5">
              <Link to="/" className="menu-link px-5" onClick={handleLogout}>
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
