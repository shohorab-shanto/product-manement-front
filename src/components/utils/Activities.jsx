import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import ActivityService from "services/ActivityService";

export const Activities = ({ logName, modelId, self, tab }) => {
  const [data, setData] = useState([]);
  const icons = {
    created: "plus",
    updated: "pen",
    deleted: "trash",
    restored: "restore",
  };

  const expandProperties = (e) => {
    let prop = e.target;
    let propId = prop.getAttribute("data-id");

    document.getElementById(propId).classList.toggle("d-none");
  };

  const getActivities = async () => {
    let res = await ActivityService.getAll({
      log_name: logName,
      model_id: modelId,
      self: self,
    });

    setData(
      res?.data?.map((dt) => {
        dt["properties"]["attributes"] = parseAttributes(
          dt.properties?.attributes
        );
        dt["properties"]["old"] = parseAttributes(dt.properties?.old);
        return dt;
      })
    );
  };

  const parseAttributes = (att) => {
    if (!att) return [];

    let keys = Object.keys(att);

    return keys.map((key) => {
      return {
        [key]: att[key],
      };
    });
  };

  useEffect(() => {
    if (tab === "activities") getActivities();
  }, [tab]);

  return (
    <div
      className={`tab-pane fade ${tab === "activities" ? "active show" : ""}`}
      id="models"
      role="tabpanel"
    >
      <div className="card card-xl-stretch mb-xl-10">
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bolder mb-2 text-dark">Activities</span>
          </h3>
        </div>
        <Scrollbars style={{ width: 850, height: 400 }}>
          <div className="card-body pt-5">
            <div className="timeline">
              {data.map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-line w-40px"></div>
                  <div className="timeline-icon symbol symbol-circle symbol-40px">
                    <div className="symbol-label bg-light">
                      <i className={"fa fa-" + icons[item.event]}></i>
                    </div>
                  </div>
                  <div className="timeline-content mb-12 mt-n2">
                    <div className="overflow-auto pe-3">
                      <div
                        className="fs-5 fw-bold mb-2"
                        role="button"
                        data-id={"properties-" + i}
                        onClick={(e) => expandProperties(e)}
                      >
                        {item.message}
                      </div>

                      <div
                        className="overflow-auto pb-5 d-none"
                        id={"properties-" + i}
                      >
                        <div className="border border-dashed border-gray-300 rounded p-7">
                          <div className="row">
                            {item.event !== "created" && (
                              <>
                                {Object.values(item.properties)?.map(
                                  (dt, key) => {
                                    let pkeys = Object.keys(item.properties);
                                    let keys = Object.keys(dt[0]);
                                    let values = Object.values(dt[0]);

                                    return (
                                      <div className="col-md-6">
                                        <h6>
                                          {pkeys[key] == "old"
                                            ? "Old Data"
                                            : "New Data"}
                                        </h6>
                                        {keys?.map((key, i) => {
                                          return (
                                            <p>
                                              {key.capitalize()}: {values[i]?.toString()}
                                            </p>
                                          );
                                        })}
                                      </div>
                                    );
                                  }
                                )}
                              </>
                            )}
                            {item.event === "created" && (
                              <div className="col-md-12 font-weight-bold">
                                Nothing changed
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center mt-1 fs-6">
                        <div className="symbol symbol-circle symbol-30px">
                          <img
                            src={item.causer.avatar_url}
                            alt={item.causer.name}
                          />
                        </div>

                        <div className="text-muted me-2 fs-7 m-2">
                          <span className="text-black">
                            <Link
                              to={
                                "/panel/" +
                                (item.causer.employee
                                  ? `employees/${item.causer.id}`
                                  : `companies/${item.causer?.details?.company_id}/users/${item.causer.id}`)
                              }
                            >
                              {item.causer.name.capitalize()}
                            </Link>
                          </span>{" "}
                          {item.event} at{" "}
                          <span className="text-black">
                            <Moment format="D MMM  YYYY hh:mm a">
                              {item.created_at}
                            </Moment>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {data.length === 0 && (
                <div className="timeline-item">
                  <div className="timeline-line w-40px"></div>
                  <div className="timeline-icon symbol symbol-circle symbol-40px">
                    <div className="symbol-label bg-light">
                      <i className="fa fa-genderless"></i>
                    </div>
                  </div>
                  <div className="timeline-content mb-12 mt-n2">
                    <div className="overflow-auto pe-3">
                      <div className="fs-5 fw-bold mb-2">No activities!</div>
                      <div className="d-flex align-items-center mt-1 fs-6">
                        <div className="symbol symbol-circle symbol-30px">
                          <i className="fa fa-log"></i>
                        </div>

                        <div className="text-muted me-2 fs-7 m-2">
                          Action at <span className="text-black">--:--</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};
