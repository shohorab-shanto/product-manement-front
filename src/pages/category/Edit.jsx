import React, { useState, useEffect } from "react";
import Modal from "../../components/utils/Modal";
import WareHouseService from "../../services/WareHouseService";
const EditWareHouse = ({ open, onCloseModal, getWareHouses, warehousId }) => {
  const [warehouse, setWareHouse] = useState("");
  const [data, setData] = useState({ name: "", description: "" });

  const getWareHouse = async () => {
    setWareHouse(await WareHouseService.get(warehousId));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    let tempdata = { ...data };
    tempdata[name] = value;

    setData(tempdata);
  };

  const updateWarehouse = async () => {
    await WareHouseService.update(warehousId, data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateWarehouse();
    getWareHouses();
    onCloseModal();
  };

  useEffect(() => {
    if (warehousId) {
      getWareHouse();
    }
  }, [open, warehousId]);

  useEffect(() => {
    setData(warehouse);
  }, [warehouse]);

  useEffect(() => {
    getWareHouses();
  }, []);
  useEffect(() => {
    let tempdata = { ...data };
    tempdata.name = warehouse.name;
    tempdata.description = warehouse.description;
    setData(tempdata);
  }, [warehouse]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit Warehouse</>}
        id={warehousId}
        body={
          <>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  id="name"
                  value={data.name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-5">
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  name="description"
                  id="description"
                  value={data.description || ""}
                  onChange={handleChange}
                />
              </div>

              <button
                type="reset"
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={onSubmit}
              >
                Update
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

export default EditWareHouse;
