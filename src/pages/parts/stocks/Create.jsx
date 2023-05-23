import Modal from "components/utils/Modal";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import Select from 'react-select';
import BoxHeadingService from "services/BoxHeadingService";
import PartStockService from "services/PartStockService";
import WareHouseService from "services/WareHouseService";

const AddPartStock = ({ open, onCloseModal, onCreated }) => {
  let { id } = useParams();
  const [warehouses, setWarehouses] = useState([])
  const [headings, setHeadings] = useState([])
  const [data, setData] = useState({})
  const [block, setBlock] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBlock(false)

    if(name == 'yen_price'){
      setData({
        ...data, 'yen_price': value, 'formula_price': Math.floor(value*3.38), 'selling_price': Math.floor(value*3.38)
      })
    }
    else{
      setData({
        ...data, [name]: value
      })
    }    
  }

  const handleSelect = (option, conf) => {
    const value = option.value;
    const name = conf.name;
    setBlock(false)

    setData({
      ...data, [name]: value
    })
  }

  const handleDateSelect = (value, name) => {
    setData({
      ...data, [name]: new Date(value)
    })
  }

  const addStock = async () => {
    setBlock(true)
    await PartStockService.create(id, data);
    onCreated();
    onCloseModal();
    setBlock(false)
  }

  const getWarehouses = async () => {
    setBlock(false)
    let dt = await WareHouseService.getAll()
    dt = dt.map(itm => ({ label: itm.name, value: itm.id }))
    setWarehouses(dt);
    setBlock(false)
  };

  const getHeadings = async () => {
    setBlock(false)
    let res = await BoxHeadingService.getAllHeadings()
    let dt = res?.map(itm => ({ label: itm.name, value: itm.id })) 
    setHeadings(dt);
    setBlock(false)
  };

  useEffect(() => {
    if (open) {
      getWarehouses();
      getHeadings();
    }
    setBlock(false)
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
              <Select options={warehouses} onChange={handleSelect} name="warehouse_id" />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="warehouse_id"></div>
            </div>

            <div className="form-group">
              <label className="required form-label">Box Heading</label>
              <Select options={headings} onChange={handleSelect} name="box_heading_id" />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="box_heading_id"></div>
            </div>

            <div className="form-group">
              <label className="form-label">Unit</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Unit Value"
                name="unit_value"
                id="unit_value"
                onChange={handleChange}
                value={data.unit_value ?? ''}
                step="any"
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="unit_value"></div>
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
                value={data.yen_price ?? ''}
                step="any"
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="yen_price"></div>
            </div>

            <div className="form-group">
              <label className="form-label">Formula Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Formula Price"
                name="formula_price"
                id="formula_price"
                value={data.formula_price ?? ''}
                step="any"
                disabled
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="formula_price"></div>
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
                value={data.selling_price ?? ''}
                step="any"
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="selling_price"></div>
            </div>

            <div className="form-group mt-5 row">
              <div className="col-md-6">
                <label className="form-label">Arrival Date</label>
                <DatePicker className="form-control" name="shipment_date" placeholderText="Shipment Date" selected={data.shipment_date} onChange={(date) => handleDateSelect(date, 'shipment_date')} />
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="shipment_date"></div>
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
                  value={data.shipment_invoice_no ?? ''}
                />
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="nashipment_invoice_nome"></div>
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
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="notes"></div>
            </div>

            <button
              disabled={block}
              className="btn btn-primary mr-2 mt-5"
              style={{ marginRight: "1rem" }}
              onClick={() => { addStock() }}
            >
              Submit
            </button>
            <button
              className="btn btn-secondary  mt-5 "
              onClick={onCloseModal}
            >
              Cancel
            </button>
          </>
        }
      />
    </div>
  );
};

export default AddPartStock;
