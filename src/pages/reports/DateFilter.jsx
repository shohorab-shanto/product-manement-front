import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import CompanyService from "services/CompanyService";
import Select from "react-select";
const DateFilter = ({ enable, onChange }) => {
  const [companies, setCompanies] = useState([]);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "Augest" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const year = [
    { value: 2020, label: "2020" },
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
    { value: 2027, label: "2027" },
    { value: 2028, label: "2028" },
    { value: 2029, label: "2029" },
    { value: 2030, label: "2030" },
  ];
  const [data, setData] = useState({
    stock: "all",
    start_date: null,
    end_date: null,
    start_date_format: null,
    end_date_format: null,
    company_id: "",
    month: "",
    year: "",
  });
  const getCompanies = async () => {
    let dt = await CompanyService.getAll({
      rows: "all",
    });

    dt = dt.map((itm) => ({ label: itm.name, value: itm.id })); //Parse the data as per the select requires
    setCompanies(dt);
  };
  useEffect(() => {
    getCompanies();
  }, []);

  const [block, setBlock] = useState(false);

  let custom = {
    zIndex: 20,
    position: "fixed",
    inset: "0px 0px auto auto",
    margin: 0,
    transform: "translate(-60%, 30%)",
  };

  const apply = () => {
    typeof onChange === "function" && onChange(data);
  };
  //for company
  const handleSelect = (option, conf) => {
    let value = option.value;
    if (Array.isArray(option))
      value = option.map((dt) => {
        return dt.value;
      });

    const name = conf.name;
    setData({
      ...data,
      [name]: value,
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

  const handleDateSelect = (value, name) => {
    setData({
      ...data,
      ...{
        [name]: new Date(value),
        [name + "_format"]: moment(value).format("YYYY-MM-DD"),
      },
    });
    setBlock(false);
  };

  const reset = () => {
    window.location.reload(false);
    setData({
      stock: "all",
      start_date: null,
      end_date: null,
      start_date_format: null,
      end_date_format: null,
      company_id: null,
      month: null,
      year: null,
    });

    typeof onChange === "function" &&
      onChange({
        stock: "all",
        start_date: null,
        end_date: null,
        start_date_format: null,
        end_date_format: null,
        company_id: null,
        month: null,
        year: null,
      });
  };

  return (
    <>
      {" "}
      <div
        className={
          enable
            ? "menu menu-sub menu-sub-dropdown w-250px w-md-300px show"
            : "menu menu-sub menu-sub-dropdown w-250px w-md-300px"
        }
        style={custom}
      >
        <div className="px-7 py-5">
          <div className="fs-5 text-dark fw-bolder">Filter Options</div>
        </div>
        <div className="separator border-gray-200"></div>
        <div className="px-7 py-5">
          <div className="mb-10">
            <label className="form-label fw-bold">Company:</label>
            <Select
              options={companies}
              onChange={handleSelect}
              name="company_id"
            />
            <div
              className="fv-plugins-message-container invalid-feedback"
              htmlFor="start_date"
            ></div>
          </div>

          <div className="mb-10">
            <label className="form-label fw-bold">Months:</label>
            <Select options={months} onChange={handleSelect} name="month" />
            <div
              className="fv-plugins-message-container invalid-feedback"
              htmlFor="month"
            ></div>
          </div>

          <div className="mb-10">
            <label className="form-label fw-bold">Year:</label>
            <Select
              selected
              options={year}
              onChange={handleSelect}
              name="year"
            />
            <div
              className="fv-plugins-message-container invalid-feedback"
              htmlFor="year"
            ></div>
          </div>

          <div className="mb-10">
            <label className="form-label fw-bold">Start Date:</label>
            <DatePicker
              className="form-control"
              selected={data.start_date}
              onChange={(date) => handleDateSelect(date, "start_date")}
            />
            <input
              type="hidden"
              name="start_date"
              id="start_date"
              value={data?.start_date_format || ""}
            />
            <div
              className="fv-plugins-message-container invalid-feedback"
              htmlFor="start_date"
            ></div>
          </div>
          <div className="mb-10">
            <label className="form-label fw-bold">End Date:</label>
            <DatePicker
              className="form-control"
              selected={data.end_date}
              onChange={(date) => handleDateSelect(date, "end_date")}
            />
            <input
              type="hidden"
              name="end_date"
              id="end_date"
              value={data?.end_date_format || ""}
            />
            <div
              className="fv-plugins-message-container invalid-feedback"
              htmlFor="end_date"
            ></div>
          </div>
          {/* <div className="mb-10">
            <label className="form-label fw-bold">Stock:</label>
            <div className="d-flex">
              <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                <input
                  className="form-check-input"
                  type="radio"
                  value="all"
                  name="stock"
                  checked={data.stock === "all"}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <span className="form-check-label">All</span>
              </label>
              <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                <input
                  className="form-check-input"
                  type="radio"
                  value="available"
                  name="stock"
                  checked={data.stock === "available"}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <span className="form-check-label">Available</span>
              </label>
              <label className="form-check form-check-sm form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="radio"
                  value="unavailable"
                  name="stock"
                  checked={data.stock === "unavailable"}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <span className="form-check-label">Unavailable</span>
              </label>
            </div>
          </div> */}

          <div className="d-flex justify-content-end">
            <button
              onClick={reset}
              type="button"
              className="btn btn-sm btn-light btn-active-light-primary me-2"
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => {
                apply();
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateFilter;
