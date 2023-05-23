import React, { useEffect, useState } from "react";
import Modal from "components/utils/Modal";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import PartStockService from "services/PartStockService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import WareHouseService from "services/WareHouseService";
import BoxHeadingService from "services/BoxHeadingService";

const EditPartStock = ({ open, onCloseModal, onUpdated, stockId }) => {
  let { id } = useParams();
  const [headings, setHeadings] = useState([]);
  const [defaultHeading, setDefaultHeading] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [defaultWarehouse, setDefaultWarehouse] = useState(null);

  const [data, setData] = useState({})
  const [block, setBlock] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBlock(false);

    if (name == "yen_price") {
      setData({
        ...data,
        yen_price: value,
        formula_price: Math.floor(value * 3.38),
        selling_price: Math.floor(value * 3.38),
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSelect = (option, conf) => {
    const value = option.value;
    const name = conf.name;
    setBlock(false);

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleDateSelect = (value, name) => {
    setData({
      ...data,
      [name]: new Date(value),
    });
  };

  const getStock = async () => {
    setBlock(true);
    let res = await PartStockService.get(id, stockId);
    setDefaultWarehouse({
      label: res.warehouse?.name,
      value: res.warehouse?.id,
    });
    setDefaultHeading({ label: res.box?.name, value: res.box?.id });
    res.shipment_date = new Date(res.shipment_date);
    res.warehouse_id = res.warehouse?.id;
    setData({...res,'unit_value': Math.floor(res.unit_value)});
    setBlock(false);
  };

  const updatePartStock = async () => {
    setBlock(true);
    await PartStockService.update(id, stockId, data);
    onUpdated();
    onCloseModal();
    setBlock(false);
  };

  const getWarehouses = async () => {
    setBlock(false);
    let data = await WareHouseService.getAll();
    data = data.map((itm) => ({ label: itm.name, value: itm.id })); //Parse the data as per the select requires
    setWarehouses(data);
    setBlock(false);
  };

  const getBoxes = async () => {
    setBlock(false);
    let dt = await BoxHeadingService.getAll();
    dt = dt.map((itm) => ({ label: itm.name, value: itm.id })); //Parse the data as per the select requires
    setHeadings(dt);
    setBlock(false);
  };

  useEffect(() => {
    if (open) {
      //Prevent preload data while modal is hidden
      setDefaultHeading(null);
      setDefaultWarehouse(null);

      getWarehouses();
      getBoxes();
      getStock();
    }
    setBlock(false);
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Add Part Stock</>}
        body={
          <>
            <div className="form-group">
              <label className="required form-label">Warehouse</label>
              {defaultWarehouse ? (
                <Select
                  options={warehouses}
                  onChange={handleSelect}
                  name="warehouse_id"
                  defaultValue={defaultWarehouse}
                />
              ) : (
                <p>Loading...</p>
              )}
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="warehouse_id"
              ></div>
            </div>

            <div className="form-group">
              <label className="required form-label">Box Heading</label>
              {defaultHeading ? (
                <Select
                  options={headings}
                  onChange={handleSelect}
                  name="box_heading_id"
                  defaultValue={defaultHeading}
                />
              ) : (
                <p>Loading...</p>
              )}
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="box_heading_id"
              ></div>
            </div>

            <div className="form-group">
              <label className="form-label">Unit Value</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Unit Value"
                name="unit_value"
                id="unit_value"
                onChange={handleChange}
                value={data.unit_value ?? ""}
                step="any"
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="unit_value"
              ></div>
            </div>

            <div className="form-group">
              <label className="form-label">Yen Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Yen Price"
                name="yen_price"
                id="yen_price"
                onChange={handleChange}
                value={data.yen_price ?? ""}
                step="any"
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="yen_price"
              ></div>
            </div>

            <div className="form-group">
              <label className="form-label">Formula Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Formula Price"
                name="formula_price"
                id="formula_price"
                value={data.formula_price ?? ""}
                step="any"
                disabled
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="formula_price"
              ></div>
            </div>

            <div className="form-group">
              <label className="form-label">Selling Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Selling Price"
                name="selling_price"
                id="selling_price"
                onChange={handleChange}
                value={data.selling_price ?? ""}
                step="any"
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="selling_price"
              ></div>
            </div>

            <div className="form-group mt-5 row">
              <div className="col-md-6">
                <label className="form-label">Arrival Date</label>
                <DatePicker
                  className="form-control"
                  placeholderText="Shipment Date"
                  selected={data.shipment_date}
                  onChange={(date) => handleDateSelect(date, "shipment_date")}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="shipment_date"
                ></div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Shipment Invoice No.</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Shipment Invoice No."
                  name="shipment_invoice_no"
                  id="shipment_invoice_no"
                  onChange={handleChange}
                  value={data.shipment_invoice_no ?? ""}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="nashipment_invoice_nome"
                ></div>
              </div>
            </div>

            <div className="form-group mt-5">
              <label className="form-label">Note</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Write the notes"
                name="notes"
                id="notes"
                onChange={handleChange}
              />
              <div
                className="fv-plugins-message-container invalid-feedback"
                htmlFor="notes"
              ></div>
            </div>

            <button
              disabled={block}
              className="btn btn-primary mr-2 mt-5"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                updatePartStock();
              }}
            >
              Submit
            </button>
            <button className="btn btn-secondary  mt-5 " onClick={onCloseModal}>
              Cancel
            </button>
          </>
        }
      />
    </div>
  );
};

export default EditPartStock;
